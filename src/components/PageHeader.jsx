export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="bg-brand-gradient-soft py-14 sm:py-16">
      <div className="container-xl text-center max-w-2xl mx-auto">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="text-3xl sm:text-4xl font-display font-semibold text-brand-ink">{title}</h1>
        {description && <p className="mt-4 text-brand-ink/65">{description}</p>}
      </div>
    </section>
  );
}
