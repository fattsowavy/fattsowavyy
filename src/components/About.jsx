import { profile, education, skillGroups } from '../data/profile';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const About = () => (
    <section id="about" className="scroll-mt-16 border-t border-ink/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle label="About" title="A bit about me" />

            <div className="grid gap-12 md:grid-cols-2">
                <Reveal>
                    <div className="space-y-4 text-lg leading-relaxed text-ink/80">
                        {profile.bio.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>

                    <h3 className="mb-4 mt-10 font-display text-2xl font-medium">Education</h3>
                    <ul className="space-y-5">
                        {education.map((e) => (
                            <li key={e.school} className="border-l-2 border-sage pl-4">
                                <p className="font-semibold">{e.school}</p>
                                <p className="text-ink/80">{e.degree}</p>
                                <p className="text-sm text-ink/70">
                                    {e.period} · {e.note}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Reveal>

                <Reveal>
                    <h3 className="mb-4 font-display text-2xl font-medium">Skills</h3>
                    <dl className="divide-y divide-ink/15 border-y border-ink/15">
                        {skillGroups.map((group) => (
                            <div key={group.title} className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
                                <dt className="text-sm font-semibold uppercase tracking-wide text-olive-dark">{group.title}</dt>
                                <dd className="text-ink/80">{group.items.join(' · ')}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>
            </div>
        </div>
    </section>
);

export default About;
