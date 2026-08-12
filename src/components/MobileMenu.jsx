import { NavLink } from "react-router-dom";
import { X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/art-forms", label: "Art Forms" },
  { to: "/student-works", label: "Student Works" },
  { to: "/videos", label: "Videos" },
  { to: "/feedback", label: "Feedback" },
  { to: "/awards", label: "Awards" },
  { to: "/contact", label: "Contact" },
];

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-brand-ink/50 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-purple/10">
          <span className="font-display font-semibold text-brand-purple">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="p-2 text-brand-ink">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col p-4 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `px-3 py-3 rounded-lg font-medium transition ${
                  isActive ? "bg-brand-gradient-soft text-brand-purple" : "text-brand-ink hover:bg-brand-gradient-soft"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/contact" onClick={onClose} className="btn-primary mt-3 justify-center">
            Enquire Now
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
