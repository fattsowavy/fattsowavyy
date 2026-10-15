import { useState } from 'react';
import { experience } from '../data/experience';
import PixelIcon from './pixel/PixelIcon';
import SectionHeading from './pixel/SectionHeading';
import Reveal from './Reveal';

// Quest log: each role is a stage on a dotted level path; cards expand like an 8-bit accordion.
const Experience = () => {
    const [open, setOpen] = useState(() => new Set([0]));

    const toggle = (i) =>
        setOpen((prev) => {
            const next = new Set(prev);
            if (next.has(i)) next.delete(i);
            else next.add(i);
            return next;
        });

    return (
        <section id="experience" className="scroll-mt-20 border-t-4 border-px-line py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading stage={2} label="Experience" title="Where I've worked" kicker="Quest log" />

                <ol className="relative">
                    {/* level path */}
                    <span
                        className="absolute bottom-0 left-[14px] top-0 w-1"
                        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, rgb(var(--px-line)) 0 8px, transparent 8px 16px)' }}
                        aria-hidden="true"
                    />
                    {experience.map((item, i) => {
                        const isOpen = open.has(i);
                        const panelId = `quest-${i}`;
                        return (
                            <li key={item.role} className="relative pb-10 pl-12 last:pb-0 sm:pl-14">
                                <span className="absolute left-0 top-4 flex h-8 w-8 items-center justify-center bg-px-bg" aria-hidden="true">
                                    <PixelIcon name="coin" className={`h-7 w-7 text-px-yellow ${i === 0 ? 'animate-px-float' : ''}`} />
                                </span>
                                <Reveal>
                                    <p className="mb-3 font-pixel text-[10px] uppercase text-px-green" aria-hidden="true">
                                        Stage 2-{i + 1}
                                    </p>
                                    <div className="px-card">
                                        <h3>
                                            <button
                                                type="button"
                                                onClick={() => toggle(i)}
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                className="flex w-full items-start justify-between gap-4 p-5 text-left hover:bg-px-bg/40 sm:p-6"
                                            >
                                                <span>
                                                    <span className="block font-pixel text-xs uppercase leading-relaxed sm:text-sm">{item.role}</span>
                                                    <span className="mt-2 block text-px-muted">
                                                        {item.org} · {item.place}
                                                    </span>
                                                    <span className="mt-2 block font-pixel text-[10px] uppercase leading-relaxed text-px-green">
                                                        {item.period}
                                                    </span>
                                                </span>
                                                <PixelIcon
                                                    name="down"
                                                    className={`mt-1 h-3 w-5 shrink-0 text-px-yellow ${isOpen ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                        </h3>
                                        <div id={panelId} hidden={!isOpen} className="border-t-4 border-px-line p-5 sm:p-6">
                                            <ul className="space-y-3">
                                                {item.points.map((point) => (
                                                    <li key={point} className="flex gap-3">
                                                        <span className="mt-2.5 h-2 w-2 shrink-0 bg-px-green" aria-hidden="true" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Reveal>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
};

export default Experience;
