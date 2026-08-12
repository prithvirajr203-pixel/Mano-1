import PageHeader from "../components/PageHeader";
import WhyChooseUs from "../components/WhyChooseUs";
import LearningOptions from "../components/LearningOptions";
import artForms from "../data/artForms";
import ArtFormCard from "../components/ArtFormCard";
import SectionTitle from "../components/SectionTitle";
import CTASection from "../components/CTASection";

export default function About() {
  return (
    <>
      {/* PAGE HEADER */}
      <PageHeader
        eyebrow="About Us"
        title="About DD ART ACADEMY"
        description="Learn • Create • Improve • Inspire"
      />

      {/* =====================================================
          ABOUT INTRO
      ===================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>
            <p className="eyebrow mb-3">
              Who We Are
            </p>

            <h2 className="section-title mb-5">
              Creativity Meets{" "}
              <span className="text-brand-pink">
                Passion
              </span>
            </h2>

            <p className="text-brand-ink/70 leading-relaxed">
              DD ART ACADEMY is a professional art education academy dedicated
              to helping students discover, develop, and transform their
              artistic skills into confidence and career opportunities.
            </p>

            <p className="mt-4 text-brand-ink/70 leading-relaxed">
              We offer a wide range of drawing, painting, fine arts, art &
              craft, and professional teacher-training courses for beginners,
              children, aspiring artists, and art teachers.
            </p>

            <p className="mt-4 text-brand-ink/70 leading-relaxed">
              Our courses are designed with step-by-step guidance, practical
              training, and easy-to-understand learning methods.
            </p>

            {/* HIGHLIGHTS */}
            <div className="mt-7 flex flex-wrap gap-3">

              <div className="rounded-full bg-brand-gradient-soft px-5 py-2.5 text-sm font-semibold text-brand-purple">
                🎨 100+ Art Forms
              </div>

              <div className="rounded-full bg-brand-gradient-soft px-5 py-2.5 text-sm font-semibold text-brand-purple">
                🏆 Certificate Courses
              </div>

              <div className="rounded-full bg-brand-gradient-soft px-5 py-2.5 text-sm font-semibold text-brand-purple">
                👩‍🎨 Professional Training
              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================= */}
          <div className="relative flex justify-center lg:justify-end">

            {/* Soft decorative glow */}
            <div
              className="
                absolute
                -inset-6
                rounded-[2rem]
                bg-gradient-to-r
                from-pink-200/30
                via-purple-200/30
                to-transparent
                blur-3xl
              "
            />

            {/* IMAGE CONTAINER */}
            <div
              className="
                relative
                z-10
                w-full
                max-w-[520px]
                rounded-[2rem]
                bg-white
                p-2
                shadow-2xl
                border
                border-brand-pink/10
                rotate-1
                hover:rotate-0
                hover:scale-[1.02]
                transition-all
                duration-700
              "
            >

              <div className="overflow-hidden rounded-[1.5rem]">

                <img
                  src="/images/home.png"
                  alt="DD Art Academy"
                  className="
                    block
                    w-full
                    h-auto
                    min-h-[400px]
                    object-contain
                    transition-transform
                    duration-700
                    hover:scale-105
                  "
                />

              </div>
            </div>

            {/* FLOATING BADGE */}
            <div
              className="
                absolute
                z-20
                -bottom-6
                left-4
                sm:left-8
                rounded-2xl
                bg-white
                px-6
                py-4
                shadow-xl
                border
                border-brand-pink/10
              "
            >
              <p className="text-2xl font-bold text-brand-purple">
                100+
              </p>

              <p className="text-xs font-medium text-brand-ink/60">
                Art Forms
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          MISSION / VISION / WHO CAN JOIN
      ===================================================== */}
      <section className="py-16 sm:py-20 bg-brand-gradient-soft">
        <div className="container-xl">

          <SectionTitle
            eyebrow="Our Purpose"
            title="What Drives DD Art Academy"
          />

          <div className="mt-10 grid md:grid-cols-3 gap-6">

            {/* MISSION */}
            <div className="rounded-xl2 bg-white p-6 shadow-card hover:-translate-y-2 transition-transform duration-300">

              <div className="text-3xl mb-4">
                🎯
              </div>

              <h3 className="font-display font-semibold text-brand-ink mb-2">
                Our Mission
              </h3>

              <p className="text-sm text-brand-ink/65 leading-relaxed">
                To make quality art education accessible, structured and
                practical for every learner — from a child picking up a pencil
                for the first time to an aspiring professional artist.
              </p>

            </div>

            {/* VISION */}
            <div className="rounded-xl2 bg-white p-6 shadow-card hover:-translate-y-2 transition-transform duration-300">

              <div className="text-3xl mb-4">
                ✨
              </div>

              <h3 className="font-display font-semibold text-brand-ink mb-2">
                Our Vision
              </h3>

              <p className="text-sm text-brand-ink/65 leading-relaxed">
                To be recognised as a trusted art academy that turns creativity
                into a genuine, confidently-held skill for students across
                every age group.
              </p>

            </div>

            {/* WHO CAN JOIN */}
            <div className="rounded-xl2 bg-white p-6 shadow-card hover:-translate-y-2 transition-transform duration-300">

              <div className="text-3xl mb-4">
                🎨
              </div>

              <h3 className="font-display font-semibold text-brand-ink mb-2">
                Who Can Join
              </h3>

              <p className="text-sm text-brand-ink/65 leading-relaxed">
                Children, beginners, aspiring artists, art students, and art
                teachers looking for certificate or diploma-level training.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* LEARNING OPTIONS */}
      <LearningOptions />

      {/* ART FORMS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">

          <SectionTitle
            eyebrow="50+ Art Forms"
            title="Art Forms We Teach"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-10">

            {artForms.slice(0, 8).map((form) => (
              <ArtFormCard
                key={form.id}
                artForm={form}
              />
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}