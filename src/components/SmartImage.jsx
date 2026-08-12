import { useState } from "react";
import { ImageIcon } from "lucide-react";

/**
 * Renders an image, and if it fails to load (because the real photo
 * hasn't been added yet), falls back to a soft branded placeholder
 * instead of a broken-image icon. Drop real files into /public/images/...
 * using the same path and they will appear automatically.
 */
export default function SmartImage({ src, alt, className = "", label, icon: Icon = ImageIcon }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-2 bg-brand-gradient-soft text-brand-purple/70 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Icon size={28} strokeWidth={1.5} />
        {label && <span className="text-xs font-medium text-brand-purple/60 px-2 text-center">{label}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
