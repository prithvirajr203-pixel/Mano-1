import { NavLink } from "react-router-dom";
import { Phone, Mail, MapPin, Palette, Heart } from "lucide-react";
import { InstagramIcon, YoutubeIcon, FacebookIcon } from "./SocialIcons";
import siteConfig from "../config/siteConfig";
import SmartImage from "./SmartImage";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/art-forms", label: "Art Forms" },
  { to: "/student-works", label: "Student Works" },
];

const support = [
  { to: "/feedback", label: "Feedback" },
  { to: "/awards", label: "Awards" },
  { to: "/videos", label: "Videos" },
  { to: "/contact", label: "Contact Us" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-ink text-white/80">
      <div className="container-xl py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <SmartImage
              src={siteConfig.logo}
              alt={siteConfig.academyName}
              className="h-10 w-10 rounded-full object-cover"
              icon={Palette}
            />
            <span className="font-display font-semibold text-white">DD ART ACADEMY</span>
          </div>
          <p className="mt-4 text-sm text-white/60">
            Empowering creativity and building confidence through the joy of art.
          </p>
          <div className="flex items-center gap-3 mt-5">
            {siteConfig.instagram && (
              <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hover:text-brand-pink">
                <InstagramIcon size={18} />
              </a>
            )}
            {siteConfig.youtube && (
              <a href={siteConfig.youtube} target="_blank" rel="noreferrer" className="hover:text-brand-pink">
                <YoutubeIcon size={18} />
              </a>
            )}
            {siteConfig.facebook && (
              <a href={siteConfig.facebook} target="_blank" rel="noreferrer" className="hover:text-brand-pink">
                <FacebookIcon size={18} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="hover:text-brand-pink transition">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2.5 text-sm">
            {support.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className="hover:text-brand-pink transition">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              <a href={`tel:+91${siteConfig.phone}`} className="hover:text-brand-pink">
                {siteConfig.displayPhone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-pink break-all">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>{siteConfig.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} DD Art Academy. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Designed with <Heart size={12} className="text-brand-pink" fill="currentColor" /> for DD Art Academy
          </p>
        </div>
      </div>
    </footer>
  );
}
