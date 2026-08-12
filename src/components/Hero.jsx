import { NavLink } from "react-router-dom";

export default function Hero() {
  return (
    <section className="py-20 sm:py-28 bg-brand-gradient-soft">
      <div className="container-xl max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-ink leading-tight">
              Where Creativity{" "}
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                Comes Alive
              </span>
            </h1>

            <p className="mt-5 text-lg text-brand-ink/70">
              Join DD Art Academy and unlock your artistic potential with
              expert-led courses in painting, drawing, and more.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center rounded-full bg-brand-gradient text-white font-semibold px-8 py-3 hover:opacity-90 transition"
              >
                Enroll Now
              </NavLink>

              <NavLink
                to="/courses"
                className="inline-flex items-center justify-center rounded-full border-2 border-brand-purple text-brand-purple font-semibold px-8 py-3 hover:bg-brand-purple/5 transition"
              >
                View Courses
              </NavLink>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center">
            <img
              src="/images/hero/hero-student.jpg"
              alt="DD Art Academy Student"
              className="w-full max-w-md h-auto object-contain"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
