import { Star, User } from "lucide-react";
import SmartImage from "./SmartImage";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="rounded-xl2 bg-white p-6 shadow-card border border-brand-purple/10 h-full flex flex-col">
      <div className="flex gap-0.5 text-brand-pink mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="text-brand-ink/75 text-sm flex-1">"{testimonial.feedback}"</p>
      <div className="flex items-center gap-3 mt-5">
        <SmartImage
          src={testimonial.photo_url}
          alt={testimonial.name}
          className="h-11 w-11 rounded-full object-cover"
          icon={User}
        />
        <div>
          <p className="font-semibold text-sm text-brand-ink">{testimonial.name}</p>
          <p className="text-xs text-brand-ink/50">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
