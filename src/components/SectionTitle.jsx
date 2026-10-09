const SectionTitle = ({ label, title }) => (
    <div className="mb-12">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-olive-dark">{label}</p>
        <h2 className="font-display text-4xl font-medium sm:text-5xl">{title}</h2>
    </div>
);

export default SectionTitle;
