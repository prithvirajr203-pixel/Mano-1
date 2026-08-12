import { NavLink } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import SmartImage from "./SmartImage";

export default function CourseCard({ course }) {
  return (
    <div className="group rounded-xl2 border border-brand-purple/10 bg-white shadow-card overflow-hidden hover:-translate-y-1 transition">
      <SmartImage
        src={course.image}
        alt={course.title}
        className="w-full h-44 object-cover"
        icon={GraduationCap}
        label={course.title}
      />
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-brand-ink">{course.title}</h3>
        <p className="mt-2 text-sm text-brand-ink/65">{course.description}</p>
        <NavLink
          to={`/courses/${course.id}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-purple group-hover:text-brand-pink transition"
        >
          Explore <ArrowRight size={15} />
        </NavLink>
      </div>
    </div>
  );
}
