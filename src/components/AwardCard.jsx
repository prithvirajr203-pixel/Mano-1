import { Award } from "lucide-react";
import SmartImage from "./SmartImage";

export default function AwardCard({ award }) {
  return (
    <div className="rounded-xl2 bg-white p-4 shadow-card border border-brand-purple/10 text-center">
      <SmartImage
        src={award.image_url || award.image}
        alt={award.title}
        className="w-full h-40 object-cover rounded-lg"
        icon={Award}
        label={award.title}
      />

      <h3 className="mt-3 font-display font-semibold text-sm text-brand-ink">
        {award.title}
      </h3>

      <p className="mt-1 text-xs text-brand-ink/55">
        {award.description}
      </p>
    </div>
  );
}