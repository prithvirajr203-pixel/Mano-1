export default function SectionTitle({ eyebrow, title, description, align = "center" }) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl mb-10 sm:mb-12 ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="mt-4 text-brand-ink/65">{description}</p>}
    </div>
  );
}
