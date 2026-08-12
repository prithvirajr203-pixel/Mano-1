import PageHeader from "../components/PageHeader";
import SmartImage from "../components/SmartImage";
import { User } from "lucide-react";
import siteConfig from "../config/siteConfig";
import CTASection from "../components/CTASection";

export default function AboutFounder() {
  return (
    <>
      <PageHeader eyebrow="Meet the Founder" title="About the Founder" />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1">
            <SmartImage
              src="/images/founder/founder.jpg"
              alt={siteConfig.founderName || "Founder of DD Art Academy"}
              className="w-full aspect-square rounded-xl2 object-cover shadow-card"
              icon={User}
              label="Add founder photo at /images/founder/founder.jpg"
            />
          </div>
          <div className="lg:col-span-2">
            <h2 className="section-title mb-2">
              {siteConfig.founderName || "Founder name to be added"}
            </h2>
            <p className="text-sm text-brand-pink font-semibold mb-6">
              Founder, DD ART ACADEMY
            </p>

            <div className="rounded-xl2 border border-dashed border-brand-purple/30 bg-brand-gradient-soft p-5 mb-6">
              <p className="text-sm text-brand-ink/60">
                This section is a placeholder. The founder's name, qualifications, professional
                experience, teaching philosophy and academy journey should be added here once
                supplied by the client — please do not publish this page with invented details.
              </p>
            </div>

            <div className="space-y-5 text-brand-ink/70 leading-relaxed">
              <div>
                <h3 className="font-display font-semibold text-brand-ink mb-1">Introduction</h3>
                <p className="text-sm">Add a short founder introduction here.</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-ink mb-1">
                  Professional Experience
                </h3>
                <p className="text-sm">Add professional background and experience here.</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-ink mb-1">
                  Teaching Philosophy
                </h3>
                <p className="text-sm">Add teaching philosophy and approach here.</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-ink mb-1">
                  Academy Journey
                </h3>
                <p className="text-sm">Add the story of how the academy was founded here.</p>
              </div>
              <div>
                <h3 className="font-display font-semibold text-brand-ink mb-1">Vision</h3>
                <p className="text-sm">Add the founder's vision for the academy here.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
