import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ShopProductCard from "../components/ShopProductCard";
import CTASection from "../components/CTASection";
import { supabase } from "../lib/supabaseClient";
import { Loader2 } from "lucide-react";

const categories = [
  "All",
  "Paintings",
  "Art Materials",
  "Return Gifts",
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase is not configured.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("shop_products")
      .select("*")
      .eq("published", true)
      .order("created_at", {
        ascending: false,
      });

    console.log("SHOP PRODUCTS:", data);
    console.log("SHOP ERROR:", error);

    if (error) {
      setError(error.message);
      setProducts([]);
    } else {
      setProducts(data || []);
    }

    setLoading(false);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  return (
    <>
      <PageHeader
        eyebrow="DD Art Academy Shop"
        title="Explore Our Art Shop"
        description="Discover paintings, art materials, and return gifts curated by DD Art Academy."
      />

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-xl">

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition ${
                  activeCategory === category
                    ? "bg-brand-purple text-white"
                    : "bg-brand-gradient-soft text-brand-ink hover:bg-brand-purple/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-16 flex flex-col items-center justify-center text-brand-ink/60">
              <Loader2
                size={32}
                className="animate-spin mb-3 text-brand-purple"
              />
              <p>Loading products...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="py-16 text-center">
              <p className="text-red-500">
                Unable to load shop products.
              </p>

              <p className="mt-2 text-sm text-brand-ink/50">
                {error}
              </p>
            </div>
          )}

          {/* Products */}
          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product) => (
                  <ShopProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-brand-ink/60">
                  No products available in this category yet.
                </p>
              </div>
            )}
        </div>
      </section>

      <CTASection />
    </>
  );
}