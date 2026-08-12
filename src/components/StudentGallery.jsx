import { useMemo, useState } from "react";
import { X } from "lucide-react";
import StudentWorkCard from "./StudentWorkCard";
import SmartImage from "./SmartImage";

export default function StudentGallery({ works, showFilters = false, limit }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(works.map((w) => w.category)))],
    [works]
  );

  const filtered = useMemo(() => {
    const list =
      activeFilter === "All" ? works : works.filter((w) => w.category === activeFilter);
    return limit ? list.slice(0, limit) : list;
  }, [works, activeFilter, limit]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                activeFilter === cat
                  ? "bg-brand-gradient text-white border-transparent"
                  : "border-brand-purple/20 text-brand-ink/70 hover:border-brand-purple"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((work) => (
          <StudentWorkCard key={work.id} work={work} onClick={() => setSelected(work)} />
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-brand-ink/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-5 right-5 text-white p-2"
            onClick={() => setSelected(null)}
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <SmartImage
              src={selected.image}
              alt={selected.title}
              className="w-full max-h-[75vh] object-contain rounded-xl2 bg-white"
              label={selected.title}
            />
            <p className="text-white text-center mt-4 font-medium">{selected.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}
