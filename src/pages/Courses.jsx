import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import CourseGrid from "../components/CourseGrid";
import CTASection from "../components/CTASection";
import { supabase } from "../lib/supabaseClient";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadCourses() {
      if (!supabase) {
        console.warn("Supabase is not configured.");
        return;
      }

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Error loading courses:", error);
        return;
      }

      setCourses(data || []);
    }

    loadCourses();
  }, []);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(courses.map((c) => c.category)))],
    [courses]
  );

  const filtered =
    filter === "All"
      ? courses
      : courses.filter((c) => c.category === filter);

  return (
    <>
      <PageHeader
        eyebrow="Courses"
        title="Our Courses"
        description="Explore our range of professional art courses designed for students of all levels."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  filter === cat
                    ? "bg-brand-gradient text-white border-transparent"
                    : "border-brand-purple/20 text-brand-ink/70 hover:border-brand-purple"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <CourseGrid courses={filtered} />
        </div>
      </section>

      <CTASection />
    </>
  );
}