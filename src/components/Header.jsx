import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Palette, ShoppingCart } from "lucide-react";
import siteConfig from "../config/siteConfig";
import MobileMenu from "./MobileMenu";
import SmartImage from "./SmartImage";

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-brand-purple/10">
      <div className="container-xl flex items-center justify-between py-3">

        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-3 shrink-0"
        >
          <SmartImage
            src={siteConfig.logo}
            alt={siteConfig.academyName}
            className="h-11 w-11 rounded-full object-cover"
            icon={Palette}
          />

          <span className="font-display font-semibold text-lg sm:text-xl leading-tight text-brand-ink whitespace-nowrap">
            DD ART
            <span className="text-brand-pink">
              {" "}ACADEMY
            </span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `px-2 py-2 text-sm font-medium rounded-full transition whitespace-nowrap ${
                  isActive
                    ? "text-brand-pink"
                    : "text-brand-ink/80 hover:text-brand-purple"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Shopping Cart */}
          <NavLink
            to="/shop"
            aria-label="Shop"
            title="Shop"
            className={({ isActive }) =>
              `flex items-center justify-center w-10 h-10 rounded-full transition ${
                isActive
                  ? "bg-brand-gradient-soft text-brand-purple"
                  : "text-brand-ink/70 hover:bg-brand-gradient-soft hover:text-brand-purple"
              }`
            }
          >
            <ShoppingCart size={21} />
          </NavLink>

          {/* Enquire Now */}
          <NavLink
            to="/contact"
            className="hidden md:inline-flex btn-primary !px-5 !py-2.5 text-sm whitespace-nowrap"
          >
            Enquire Now
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-brand-ink"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
}