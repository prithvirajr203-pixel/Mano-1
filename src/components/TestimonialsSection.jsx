import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard";
import SectionTitle from "./SectionTitle";
import { supabase } from "../lib/supabaseClient";

export default function TestimonialsSection({ limit }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTestimonials() {
      if (!supabase) {
        setTestimonials([]);
        setLoading(false);
        return;
      }

      let query = supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error loading testimonials:", error);
        setTestimonials([]);
      } else {
        setTestimonials(data || []);
      }

      setLoading(false);
    }

    loadTestimonials();
  }, [limit]);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container-xl">
        <SectionTitle
          eyebrow="Testimonials"
          title="What Our Students Say"
        />

        {loading ? (
          <div className="text-center py-10 text-brand-ink/50">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-10 text-brand-ink/50">
            No testimonials available yet.
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
  );
}