import PageHeader from "../components/PageHeader";
import ArtFormCard from "../components/ArtFormCard";
import CTASection from "../components/CTASection";
import { useContent } from "../hooks/useContent";
import artForms from "../data/artForms";

export default function ArtForms() {
  const { items: liveArtForms, loading } = useContent({
    table: "art_forms",
    orderBy: "sort_order",
    fallbackData: artForms,
    mapRow: (row) => ({
      id: row.id,
      name: row.name,
      description: row.description || "",
      image: row.image_url || "",
    }),
  });

  return (
    <>
      <PageHeader
        eyebrow={`${liveArtForms.length} Art Forms`}
        title="Explore Our Art Forms"
        description="From pencil drawing to mixed media — a wide range of art forms taught step by step."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">
          {loading ? (
            <div className="py-10 text-center text-sm text-brand-ink/50">
              Loading art forms...
            </div>
          ) : liveArtForms.length === 0 ? (
            <div className="py-10 text-center text-sm text-brand-ink/50">
              No art forms available.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {liveArtForms.map((form) => (
                <ArtFormCard
                  key={form.id}
                  artForm={form}
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