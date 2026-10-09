import { experience } from '../data/experience';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const Experience = () => (
    <section id="experience" className="scroll-mt-16 border-t border-ink/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle label="Experience" title="Where I've worked" />

            <ol className="ml-2 space-y-12 border-l-2 border-sage">
                {experience.map((item) => (
                    <li key={item.role} className="relative pl-8">
                        <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-olive bg-cream" aria-hidden="true" />
                        <Reveal>
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                <h3 className="font-display text-2xl font-medium">{item.role}</h3>
                                <p className="text-sm font-semibold text-olive-dark">{item.period}</p>
                            </div>
                            <p className="mt-1 text-ink/80">
                                {item.org} · {item.place}
                            </p>
                            <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/80 marker:text-olive">
                                {item.points.map((point) => (
                                    <li key={point}>{point}</li>
                                ))}
                            </ul>
                        </Reveal>
                    </li>
                ))}
            </ol>
        </div>
    </section>
);

export default Experience;
