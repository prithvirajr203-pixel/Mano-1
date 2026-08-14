import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SectionTitle from "../components/SectionTitle";
import CourseGrid from "../components/CourseGrid";
import ArtFormCard from "../components/ArtFormCard";
import WhyChooseUs from "../components/WhyChooseUs";
import LearningOptions from "../components/LearningOptions";
import StudentGallery from "../components/StudentGallery";
import TestimonialsSection from "../components/TestimonialsSection";
import AwardsSection from "../components/AwardsSection";
import CTASection from "../components/CTASection";

import artForms from "../data/artForms";
import studentWorks from "../data/studentWorks";
import siteConfig from "../config/siteConfig";

import { NavLink } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import useContent from "../hooks/useContent";

export default function Home() {
  const [courses, setCourses] = useState([]);

  const { items: liveArtForms } = useContent({
    table: "art_forms",
    fallbackData: artForms.map((form) => ({
      ...form,
      image_url: form.image,
    })),
  });

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

  return (
    <>
      {/* =========================
          HERO
      ========================= */}
      <Hero />

      {/* =========================
          ABOUT
      ========================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-pink/5 via-white to-brand-violet/5">
        <div className="container-xl">
          <SectionTitle
            eyebrow="About Us"
            title="About DD ART ACADEMY"
            description={`${siteConfig.academyName} is a professional art education academy dedicated to helping students discover, develop, and transform their artistic skills into confidence and career opportunities. We offer a wide range of drawing, painting, fine arts, art & craft, and professional teacher-training courses for beginners, children, aspiring artists, and art teachers.`}
          />

          <div className="text-center mt-6">
            <NavLink to="/about" className="btn-secondary">
              Learn More About Us
            </NavLink>
          </div>
        </div>
      </section>

      {/* =========================
          WHY CHOOSE US
      ========================= */}
      <WhyChooseUs />

      {/* =========================
          LEARNING OPTIONS
      ========================= */}
      <LearningOptions />

      {/* =========================
          COURSES
      ========================= */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-violet/5 via-white to-brand-pink/5">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Our Courses"
            title="Explore Our Courses"
            description="Discover structured art courses designed for beginners, children, aspiring artists and professional learners."
          />

          {courses.length > 0 ? (
            <CourseGrid courses={courses.slice(0, 6)} />
          ) : (
            <div className="text-center py-10 text-brand-ink/50">
              Courses will appear here soon.
            </div>
          )}

          <div className="text-center mt-10">
            <NavLink to="/courses" className="btn-primary">
              View All Courses
            </NavLink>
          </div>
        </div>
      </section>

      {/* =========================
          ART FORMS
      ========================= */}
      <section className="py-16 sm:py-20 bg-brand-gradient-soft">
        <div className="container-xl">
          <SectionTitle
            eyebrow="50+ Art Forms"
            title="Explore Our Art Forms"
            description="From pencil drawing to mixed media, discover the wide range of art forms taught at DD ART ACADEMY."
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
           {liveArtForms.slice(0, 8).map((form) => (
  <ArtFormCard
    key={form.id}
    artForm={{
      ...form,
      image: form.image_url || form.image,
    }}
  />
))}
          </div>

          <div className="text-center mt-10">
            <NavLink to="/art-forms" className="btn-primary">
              View All Art Forms
            </NavLink>
          </div>
        </div>
      </section>

      {/* =========================
          STUDENT WORKS
      ========================= */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          <SectionTitle
            eyebrow="Gallery"
            title="Student Works"
            description="Explore artwork created by our students and discover their creativity and progress."
          />

          <StudentGallery
            works={studentWorks}
            limit={6}
          />

          <div className="text-center mt-10">
            <NavLink to="/student-works" className="btn-primary">
              View More Works
            </NavLink>
          </div>
        </div>
      </section>

      {/* =========================
          TESTIMONIALS
      ========================= */}
      <TestimonialsSection limit={6} />

      {/* =========================
          AWARDS
      ========================= */}
      <AwardsSection limit={4} />

      {/* =========================
          CTA
      ========================= */}
      <CTASection />
    </>
  );
}