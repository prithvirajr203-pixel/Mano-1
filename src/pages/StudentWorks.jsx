import PageHeader from "../components/PageHeader";
import StudentGallery from "../components/StudentGallery";
import staticStudentWorks from "../data/studentWorks";
import CTASection from "../components/CTASection";
import { useContent } from "../hooks/useContent";
import { mapStudentWork } from "../hooks/contentMappers";

export default function StudentWorks() {
  const { items: studentWorks } = useContent({
    table: "student_works",
    fallbackData: staticStudentWorks,
    mapRow: mapStudentWork,
  });

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Student Works"
        description="A showcase of artwork created by our students."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          {studentWorks.length === 0 ? (
            <p className="text-center text-brand-ink/50 text-sm">Student artwork coming soon.</p>
          ) : (
            <StudentGallery works={studentWorks} showFilters />
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}