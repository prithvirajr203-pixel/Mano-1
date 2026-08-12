import { Video, PlayCircle, Users } from "lucide-react";
import learningOptions from "../data/learningOptions";
import SectionTitle from "./SectionTitle";

const iconMap = { Video, PlayCircle, Users };

export default function LearningOptions() {
  return (
    <section className="py-16 sm:py-20 bg-brand-gradient-soft">
      <div className="container-xl">
        <SectionTitle eyebrow="Flexible Learning" title="Learn Your Way" />
        <div className="grid sm:grid-cols-3 gap-6">
          {learningOptions.map((option) => {
            const Icon = iconMap[option.icon] || Video;
            return (
              <div key={option.id} className="rounded-xl2 bg-white/95 p-7 text-center shadow-card">
                <div className="h-14 w-14 mx-auto rounded-full bg-brand-gradient flex items-center justify-center text-white mb-4">
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg text-brand-ink">{option.title}</h3>
                <p className="mt-2 text-sm text-brand-ink/65">{option.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}