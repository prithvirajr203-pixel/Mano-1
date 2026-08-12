import { NavLink } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-brand-gradient py-14">
      <div className="container-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <h2 className="text-2xl sm:text-3xl font-display font-semibold text-white">
          Let's Create Something Beautiful Together!
        </h2>
        <NavLink
          to="/contact"
          className="inline-flex items-center justify-center rounded-full bg-white text-brand-purple font-semibold px-7 py-3 hover:bg-brand-cream transition shrink-0"
        >
          Contact Us Today
        </NavLink>
      </div>
    </section>
  );
}
