import { publication, certifications } from '../data/achievements';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const Achievements = () => (
    <section id="achievements" className="scroll-mt-16 border-t border-ink/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle label="Achievements" title="Publication & certifications" />

            {/* Publication */}
            <Reveal>
                <article className="rounded-md border border-ink bg-cream p-6 sm:p-8">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-olive-dark">
                        Publication · {publication.year}
                    </p>
                    <h3 className="font-display text-2xl font-medium sm:text-3xl">{publication.title}</h3>
                    <p className="mt-3 text-ink/80">{publication.authors}</p>
                    <p className="text-sm text-ink/70">{publication.venue}</p>
                    <p className="mt-4 max-w-3xl leading-relaxed text-ink/80">{publication.description}</p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                        {publication.tags.map((tag) => (
                            <li key={tag} className="rounded-full bg-sage/30 px-3 py-1 text-xs font-medium">
                                {tag}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                        <a
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-olive-dark underline underline-offset-4 hover:text-ink"
                        >
                            Read on IEEE Xplore
                        </a>
                        <span className="text-sm text-ink/70">DOI {publication.doi}</span>
                    </div>
                </article>
            </Reveal>

            {/* Certifications */}
            <h3 className="mb-6 mt-16 font-display text-2xl font-medium">Certifications</h3>
            <ul className="grid gap-4 md:grid-cols-2">
                {certifications.map((cert) => (
                    <li key={cert.title} className="flex gap-4 rounded-md border border-ink/25 p-4">
                        {cert.image && (
                            <img
                                src={cert.image}
                                alt={`${cert.title} certificate`}
                                className="h-20 w-28 shrink-0 rounded border border-ink/20 object-cover"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{cert.title}</p>
                            <p className="text-sm text-ink/70">
                                {cert.issuer}
                                {cert.year && ` · ${cert.year}`}
                            </p>
                            {cert.url && (
                                <a
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block text-sm font-semibold text-olive-dark underline underline-offset-4 hover:text-ink"
                                >
                                    View credential
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </section>
);

export default Achievements;
