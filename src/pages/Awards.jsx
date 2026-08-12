import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import AwardCard from "../components/AwardCard";
import CTASection from "../components/CTASection";
import { supabase } from "../lib/supabaseClient";

export default function Awards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAwards() {
      if (!supabase) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("awards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading awards:", error);
        setLoading(false);
        return;
      }

      setAwards(data || []);
      setLoading(false);
    }

    loadAwards();
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Recognition"
        title="Awards & Achievements"
        description="Our awards, recognitions, and achievements."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          {loading ? (
            <div className="py-10 text-center text-brand-ink/60">
              Loading awards...
            </div>
          ) : awards.length === 0 ? (
            <div className="py-10 text-center text-brand-ink/60">
              No awards available yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}