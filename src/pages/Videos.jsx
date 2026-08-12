import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import VideoCard from "../components/VideoCard";
import CTASection from "../components/CTASection";
import { supabase } from "../lib/supabaseClient";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVideos() {
      try {
        if (!supabase) {
          setError("Supabase is not configured.");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("videos")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Videos loading error:", error);
          setError(error.message);
          return;
        }

        setVideos(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Unable to load videos.");
      } finally {
        setLoading(false);
      }
    }

    loadVideos();
  }, []);

  return (
    <>
      <PageHeader
        title="Videos"
        subtitle="Explore our recorded art courses and learning videos."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">

          {loading && (
            <div className="text-center py-10 text-brand-ink/50">
              Loading videos...
            </div>
          )}

          {error && (
            <div className="text-center py-10 text-rose-600">
              {error}
            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <div className="text-center py-10 text-brand-ink/50">
              No videos available.
            </div>
          )}

          {!loading && !error && videos.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
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