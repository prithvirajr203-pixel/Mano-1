import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import awardsData from "../data/awards";
import AwardCard from "./AwardCard";
import SectionTitle from "./SectionTitle";

export default function AwardsSection({ limit, showButton = true }) {
  const [awards, setAwards] = useState(awardsData);
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

      if (data && data.length > 0) {
        setAwards(data);
      }

      setLoading(false);
    }

    loadAwards();
  }, []);

  const list = limit ? awards.slice(0, limit) : awards;

  return (
    <section className="py-16 sm:py-20 bg-brand-gradient-soft">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Recognition"
          title="Awards & Achievements"
        />

        {loading ? (
          <div className="text-center py-10 text-brand-ink/60">
            Loading awards...
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        )}

        {showButton && (
          <div className="text-center mt-10">
            <NavLink to="/awards" className="btn-primary">
              View All Awards
            </NavLink>
          </div>
        )}
      </div>
    </section>
  );
}