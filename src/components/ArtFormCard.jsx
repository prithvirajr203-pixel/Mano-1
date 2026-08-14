import { Brush } from "lucide-react";
import SmartImage from "./SmartImage";

export default function ArtFormCard({ artForm }) {
  return (
    <div className="rounded-xl2 border border-brand-purple/10 bg-white shadow-card overflow-hidden hover:-translate-y-1 transition">
      <SmartImage
        src={artForm.image_url}
        alt={artForm.name}
        className="w-full h-36 object-cover"
        icon={Brush}
        label={artForm.name}
      />
      <div className="p-4">
        <h3 className="font-display font-semibold text-brand-ink">{artForm.name}</h3>
        <p className="mt-1 text-xs text-brand-ink/60">{artForm.description}</p>
      </div>
    </div>
  );
}
