import { useEffect, useState } from "react";
import CTASection from "../components/CTASection";
import TestimonialCard from "../components/TestimonialCard";
import { supabase } from "../lib/supabaseClient";

export default function Feedback() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      if (!supabase) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading testimonials:", error);
        setTestimonials([]);
      } else {
        setTestimonials(data || []);
      }

      setLoading(false);
    }

    loadTestimonials();
  }, []);

  return (
    <>
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          {loading ? (
            <div className="text-center py-10 text-brand-ink/50">
              Loading feedback...
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-10 text-brand-ink/50">
              No feedback available yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}