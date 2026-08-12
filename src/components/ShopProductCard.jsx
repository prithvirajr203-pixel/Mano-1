import { ShoppingBag } from "lucide-react";
import SmartImage from "./SmartImage";

export default function ShopProductCard({ product }) {
  return (
    <div className="rounded-xl2 overflow-hidden border border-brand-purple/10 bg-white shadow-card hover:-translate-y-1 transition">

      {/* Product Image */}
      <SmartImage
        src={product?.image_url || ""}
        alt={product?.name || "Shop Product"}
        className="w-full h-52 object-cover"
        icon={ShoppingBag}
        label={product?.name || "Product"}
      />

      {/* Product Details */}
      <div className="p-4">

        {/* Category */}
        {product?.category && (
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple">
            {product.category}
          </p>
        )}

        {/* Product Name */}
        <h3 className="mt-1 font-display font-semibold text-brand-ink">
          {product?.name || "Untitled Product"}
        </h3>

        {/* Description */}
        {product?.description && (
          <p className="mt-1 text-sm text-brand-ink/60">
            {product.description}
          </p>
        )}

        {/* Price */}
        {product?.price !== null &&
          product?.price !== undefined &&
          product?.price !== "" && (
            <p className="mt-3 text-lg font-semibold text-brand-purple">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>
          )}

      </div>
    </div>
  );
}