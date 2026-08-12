import { Sprout, Award, Palette, Video, Users, GraduationCap, BadgeCheck, Infinity as InfinityIcon, Heart } from "lucide-react";
import whyChooseUs from "../data/whyChooseUs";
import SectionTitle from "./SectionTitle";

const iconMap = {
  Sprout,
  Award,
  Palette,
  Video,
  Users,
  GraduationCap,
  BadgeCheck,
  Infinity: InfinityIcon,
  Heart,
};

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-white/90">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Why Us"
          title="Why Choose DD ART ACADEMY?"
          description="Professional, practical and beginner-friendly art education built around real student outcomes."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div key={item.id} className="rounded-xl2 p-6 bg-brand-gradient-soft border border-brand-purple/10">
                <div className="h-11 w-11 rounded-full bg-brand-gradient flex items-center justify-center text-white mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-semibold text-brand-ink">{item.title}</h3>
                <p className="mt-2 text-sm text-brand-ink/65">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}