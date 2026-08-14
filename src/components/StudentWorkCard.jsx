import { ImageIcon } from "lucide-react";
import SmartImage from "./SmartImage";

export default function StudentWorkCard({ work, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative rounded-xl2 overflow-hidden shadow-card w-full text-left"
    >
      <SmartImage
        src={work.image_url}
        alt={work.title}
        className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
        icon={ImageIcon}
        label={work.title}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
        <div className="text-white">
          <p className="font-semibold text-sm">{work.title}</p>
          <p className="text-xs opacity-80">{work.category}</p>
        </div>
      </div>
    </button>
  );
}
