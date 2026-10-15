import { useState } from 'react';
import { profile, education, skillGroups } from '../data/profile';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../lib/motion';
import PixelIcon from './pixel/PixelIcon';
import SectionHeading from './pixel/SectionHeading';
import Typewriter from './pixel/Typewriter';
import Reveal from './Reveal';

const SLOT_COLORS = ['text-px-cyan', 'text-px-green', 'text-px-yellow', 'text-px-orange'];

const About = () => {
    const [dialogRef, inView] = useInView(0.3);
    // index of the bio paragraph being typed; bio.length = all shown
    const [typing, setTyping] = useState(() => (prefersReducedMotion() ? profile.bio.length : 0));
    const finished = typing >= profile.bio.length;

    return (
        <section id="about" className="scroll-mt-20 border-t-4 border-px-line py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading stage={1} label="About" title="A bit about me" kicker="Character sheet" />

                <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
                    <div>
                        {/* RPG dialog box */}
                        <div ref={dialogRef} className="px-card edge-ink relative p-6 pt-8 sm:p-8 sm:pt-10">
                            <span className="absolute -top-4 left-4 bg-px-yellow px-3 py-2 font-pixel text-[10px] uppercase text-px-on" aria-hidden="true">
                                Fatwah
                            </span>
                            <div className="space-y-4 text-xl">
                                {profile.bio.map((p, i) => (
                                    <p key={p}>
                                        <Typewriter
                                            text={p}
                                            speed={18}
                                            step={2}
                                            start={inView && typing === i}
                                            done={typing > i}
                                            onDone={() => setTyping((t) => Math.max(t, i + 1))}
                                        />
                                    </p>
                                ))}
                            </div>
                            <div className="mt-4 flex min-h-[44px] items-center justify-end">
                                {finished ? (
                                    <PixelIcon name="down" className="h-3 w-5 animate-px-float text-px-yellow" />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setTyping(profile.bio.length)}
                                        className="flex min-h-[44px] items-center gap-2 px-2 font-pixel text-[10px] uppercase text-px-yellow"
                                    >
                                        Skip
                                        <PixelIcon name="cursor" className="h-3 w-2" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Education as class / guild card */}
                        <Reveal className="mt-12">
                            <h3 className="mb-6 font-pixel text-sm uppercase">Education</h3>
                            {education.map((e) => (
                                <div key={e.school} className="px-card p-5 sm:p-6">
                                    <dl className="grid gap-3 sm:grid-cols-[6rem_1fr]">
                                        <dt className="font-pixel text-[10px] uppercase leading-loose text-px-cyan">Guild</dt>
                                        <dd className="font-semibold">{e.school}</dd>
                                        <dt className="font-pixel text-[10px] uppercase leading-loose text-px-cyan">Class</dt>
                                        <dd>{e.degree}</dd>
                                        <dt className="font-pixel text-[10px] uppercase leading-loose text-px-cyan">Status</dt>
                                        <dd className="text-px-muted">
                                            {e.period} · {e.note}
                                        </dd>
                                    </dl>
                                </div>
                            ))}
                        </Reveal>
                    </div>

                    {/* Skills as inventory */}
                    <Reveal>
                        <h3 className="mb-6 flex items-center gap-3 font-pixel text-sm uppercase">
                            Skills
                            <span className="font-pixel text-[10px] text-px-muted" aria-hidden="true">
                                · Inventory
                            </span>
                        </h3>
                        <div className="space-y-6">
                            {skillGroups.map((group, i) => (
                                <div key={group.title} className="px-card p-4">
                                    <h4 className={`mb-3 flex items-center gap-2 font-pixel text-[10px] uppercase ${SLOT_COLORS[i % SLOT_COLORS.length]}`}>
                                        <PixelIcon name="gem" className="h-3 w-4" />
                                        {group.title}
                                    </h4>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {group.items.map((item) => (
                                            <li key={item} className="border-2 border-px-line bg-px-bg px-3 py-2 leading-snug">
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default About;
