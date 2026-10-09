import profilePhoto from '../assets/ftwcp.png';
import { profile } from '../data/profile';

const Hero = () => (
    <section id="home" className="scroll-mt-16 pt-16">
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:px-6 md:pt-20 lg:px-8">
            <div className="grid items-center gap-12 md:grid-cols-[1.4fr_1fr]">
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-olive-dark">
                        {profile.location}
                    </p>
                    <h1 className="font-display text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl">
                        {profile.name}
                    </h1>
                    <p className="mt-5 text-xl font-medium sm:text-2xl">{profile.tagline}</p>
                    <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/80">{profile.summary}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <a
                            href={profile.cv}
                            download
                            className="rounded-md bg-olive-dark px-6 py-3 font-semibold text-cream transition-colors hover:bg-ink"
                        >
                            Download CV
                        </a>
                        <a
                            href="#contact"
                            className="rounded-md border border-ink px-6 py-3 font-semibold transition-colors hover:bg-ink hover:text-cream"
                        >
                            Get in touch
                        </a>
                    </div>
                </div>

                <div className="relative mx-auto w-64 sm:w-72 md:w-full md:max-w-xs">
                    <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-md bg-sage" aria-hidden="true" />
                    <img
                        src={profilePhoto}
                        alt={`Portrait of ${profile.name}`}
                        className="relative aspect-[4/5] w-full rounded-md border border-ink object-cover"
                    />
                </div>
            </div>

            <dl className="mt-16 grid grid-cols-2 gap-y-6 border-t border-ink/20 pt-8 md:grid-cols-4">
                {profile.facts.map((fact) => (
                    <div key={fact.label}>
                        <dt className="sr-only">{fact.label}</dt>
                        <dd className="font-display text-4xl font-medium">{fact.value}</dd>
                        <p className="mt-1 text-sm text-ink/70" aria-hidden="true">{fact.label}</p>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);

export default Hero;
