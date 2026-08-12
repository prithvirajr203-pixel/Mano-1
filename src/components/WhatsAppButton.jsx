import { InstagramIcon, YoutubeIcon } from "./SocialIcons";
import siteConfig from "../config/siteConfig";

export default function WhatsAppButton() {
  const whatsappHref = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    siteConfig.whatsappMessage
  )}`;

  // DD Artist Instagram
  const instagramHref = "https://www.instagram.com/dd_artist__/";

  // DD Art Academy YouTube
  const youtubeHref =
    "https://youtube.com/@ddartacademy?si=6rGCCzOVepWMbozJ";

  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      {/* Instagram */}
      <a
        href={instagramHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        title="Follow DD Artist on Instagram"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        <InstagramIcon size={22} />
      </a>

      {/* YouTube */}
      <a
        href={youtubeHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        title="Watch DD Art Academy on YouTube"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:shadow-xl"
      >
        <YoutubeIcon size={22} />
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with DD Art Academy on WhatsApp"
        title="Chat with DD Art Academy on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.14 6.44 2.14 11.9c0 1.75.46 3.46 1.34 4.96L2 22l5.27-1.45a9.86 9.86 0 0 0 4.77 1.22h.01c5.46 0 9.9-4.44 9.9-9.9C21.95 6.44 17.51 2 12.04 2Zm0 18.1h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.13.86.84-3.05-.2-.31a8.17 8.17 0 1 1 6.98 3.83Zm4.49-6.13c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.01-.39.11-.52.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.29Z" />
        </svg>
      </a>
    </div>
  );
}