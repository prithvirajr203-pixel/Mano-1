import PageHeader from "../components/PageHeader";
import ContactForm from "../components/ContactForm";
import siteConfig from "../config/siteConfig";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export default function Contact() {
  const mapQuery = encodeURIComponent(siteConfig.address);

  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact DD ART ACADEMY"
        description="Have a question about our courses? Send us an enquiry and we'll get back to you."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl2 bg-brand-gradient-soft p-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-purple shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-brand-ink text-sm">Address</p>
                  {siteConfig.addressLines.map((line) => (
                    <p key={line} className="text-sm text-brand-ink/65">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-brand-ink/65">
                    {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-brand-purple shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-brand-ink text-sm">Phone</p>
                  <a href={`tel:+91${siteConfig.phone}`} className="text-sm text-brand-ink/65 hover:text-brand-purple">
                    {siteConfig.displayPhone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-brand-purple shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-semibold text-brand-ink text-sm">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-brand-ink/65 hover:text-brand-purple break-all">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl2 overflow-hidden border border-brand-purple/10 shadow-card">
              <iframe
                title="DD Art Academy Location"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-brand-purple hover:text-brand-pink bg-white"
              >
                Get Directions <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
