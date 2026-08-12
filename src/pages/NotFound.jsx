import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container-xl py-28 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="section-title">Page Not Found</h1>
      <p className="mt-4 text-brand-ink/65">The page you're looking for doesn't exist.</p>
      <NavLink to="/" className="btn-primary mt-8 inline-flex">
        Back to Home
      </NavLink>
    </section>
  );
}
