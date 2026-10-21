import { publications, certifications } from '../data/achievements';
import { useInView } from '../hooks/useInView';
import PixelIcon from './pixel/PixelIcon';
import SectionHeading from './pixel/SectionHeading';
import Reveal from './Reveal';

const MEDAL_COLORS = ['text-px-yellow', 'text-px-cyan', 'text-px-green', 'text-px-orange'];

const PublicationCard = ({ paper }) => {
    const [ref, inView] = useInView(0.4);
    const published = paper.status === 'published';

    return (
        <article ref={ref} className={`px-card relative p-6 pt-10 sm:p-8 sm:pt-12 ${published ? 'edge-yellow' : 'edge-cyan'}`}>
            <span
                className={`absolute -top-5 left-4 flex items-center gap-2 px-3 py-2 font-pixel text-[10px] uppercase text-px-on ${
                    published ? 'bg-px-green' : 'bg-px-cyan'
                } ${inView ? 'animate-px-drop' : 'opacity-0'}`}
                aria-hidden="true"
            >
                <PixelIcon name={published ? 'star' : 'scroll'} className="h-3 w-3" />
                {published ? 'Achievement unlocked' : 'Quest in progress'}
            </span>

            <div className="grid gap-6 md:grid-cols-[auto_1fr]">
                <div className="flex h-24 w-24 items-center justify-center border-4 border-px-line bg-px-bg" aria-hidden="true">
                    <PixelIcon
                        name={published ? 'trophy' : 'scroll'}
                        className={`h-14 w-14 ${published ? 'animate-px-float text-px-yellow' : 'text-px-cyan'}`}
                    />
                </div>
                <div>
                    <p className={`mb-3 font-pixel text-[10px] uppercase leading-relaxed ${published ? 'text-px-yellow' : 'text-px-cyan'}`}>
                        {published ? `Publication · ${paper.year}` : `Accepted · to appear ${paper.year}`}
                    </p>
                    <h3 className="text-2xl font-semibold leading-snug sm:text-3xl">{paper.title}</h3>
                    {paper.authors && <p className="mt-3">{paper.authors}</p>}
                    <p className={paper.authors ? 'text-px-muted' : 'mt-3 text-px-muted'}>{paper.venue}</p>
                    {paper.description && <p className="mt-4 max-w-3xl">{paper.description}</p>}

                    {paper.tags?.length > 0 && (
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {paper.tags.map((tag) => (
                                <li key={tag} className="px-chip">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}

                    {(paper.link || paper.doi) && (
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                            {paper.link && (
                                <a href={paper.link} target="_blank" rel="noopener noreferrer" className="px-btn px-btn-primary">
                                    Read on IEEE Xplore
                                </a>
                            )}
                            {paper.doi && <span className="break-all text-px-muted">DOI {paper.doi}</span>}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};

const Achievements = () => {
    return (
        <section id="achievements" className="scroll-mt-20 border-t-4 border-px-line py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading stage={3} label="Achievements" title="Publications & certifications" kicker="Trophy room" />

                {/* Publications: published papers are the boss reward, accepted ones are quests in progress */}
                <div className="mt-4 space-y-14">
                    {publications.map((paper) => (
                        <PublicationCard key={paper.title} paper={paper} />
                    ))}
                </div>

                {/* Certifications: medal grid */}
                <h3 className="mb-8 mt-20 font-pixel text-sm uppercase">Certifications</h3>
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {certifications.map((cert, i) => (
                        <li key={cert.title} className="h-full">
                            <Reveal className="h-full">
                                <div className="px-card flex h-full flex-col p-4">
                                    {cert.image ? (
                                        <div className="px-photo aspect-[4/3] border-4 border-px-line">
                                            <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" className="h-full w-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="flex aspect-[4/3] items-center justify-center border-4 border-px-line bg-px-bg" aria-hidden="true">
                                            <PixelIcon name="medal" className={`h-12 w-12 ${MEDAL_COLORS[i % MEDAL_COLORS.length]}`} />
                                        </div>
                                    )}
                                    <p className="mt-4 flex items-start gap-2 font-semibold leading-snug">
                                        <PixelIcon name="medal" className={`mt-1 h-4 w-4 shrink-0 ${MEDAL_COLORS[i % MEDAL_COLORS.length]}`} />
                                        {cert.title}
                                    </p>
                                    <p className="text-px-muted">
                                        {cert.issuer}
                                        {cert.year && ` · ${cert.year}`}
                                    </p>
                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-btn px-btn-ghost mt-auto self-start text-[10px]"
                                            aria-label={`View credential: ${cert.title}`}
                                        >
                                            View credential
                                        </a>
                                    )}
                                </div>
                            </Reveal>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Achievements;
