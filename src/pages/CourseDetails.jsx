import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import SmartImage from "../components/SmartImage";
import { GraduationCap, CheckCircle2 } from "lucide-react";
import CTASection from "../components/CTASection";
import { supabase } from "../lib/supabaseClient";

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      if (!supabase) {
        console.error("Supabase is not configured.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error loading course:", error);
        setCourse(null);
      } else {
        setCourse(data);
      }

      setLoading(false);
    }

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-xl text-center">
          <h1 className="font-display text-3xl font-semibold text-brand-ink">
            Loading course...
          </h1>
        </div>
      </section>
    );
  }

  if (!course) {
    return (
      <>
        <section className="py-20 bg-white">
          <div className="container-xl text-center">
            <h1 className="font-display text-4xl font-semibold text-brand-ink">
              Course not found
            </h1>

            <NavLink to="/courses" className="btn-primary mt-8">
              Back to Courses
            </NavLink>
          </div>
        </section>

        <CTASection />
      </>
    );
  }

  const learningModes = Array.isArray(course.learning_mode)
    ? course.learning_mode
    : [];

  return (
    <>
      <PageHeader
        eyebrow={course.category}
        title={course.title}
        description={course.description}
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl grid lg:grid-cols-2 gap-12 items-start">
          <SmartImage
            src={course.image_url}
            alt={course.title}
            className="w-full aspect-[4/3] rounded-xl2 object-cover shadow-card"
            icon={GraduationCap}
            label={course.title}
          />

          <div>
            <p className="text-brand-ink/70 leading-relaxed">
              {course.description}
            </p>

            <div className="mt-6">
              <h3 className="font-display font-semibold text-brand-ink mb-3">
                Learning Mode
              </h3>

              <div className="flex flex-wrap gap-2">
                {learningModes.map((mode) => (
                  <span
                    key={mode}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-gradient-soft text-brand-purple text-sm font-medium"
                  >
                    <CheckCircle2 size={15} />
                    {mode}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl2 border border-dashed border-brand-purple/30 bg-brand-gradient-soft p-5 text-sm text-brand-ink/60">
              Duration, pricing and certification details will be added here
              once confirmed by the academy.
            </div>

            <NavLink to="/contact" className="btn-primary mt-8">
              Enquire About This Course
            </NavLink>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}