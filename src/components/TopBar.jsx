import { Phone } from "lucide-react";
import siteConfig from "../config/siteConfig";

export default function TopBar() {
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end py-2">
          
          {/* Phone */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">
              Have any questions?
            </span>

            <a
              href={`tel:+91${siteConfig.phone}`}
              className="flex items-center gap-1 font-semibold hover:text-brand-pink transition"
            >
              <Phone size={14} />
              {siteConfig.displayPhone}
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}