import { profile } from '../data/profile';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const Contact = () => (
    <section id="contact" className="scroll-mt-16 border-t border-ink/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle label="Contact" title="Let's talk" />

            <Reveal>
                <p className="max-w-xl text-lg leading-relaxed text-ink/80">
                    I'm open to research collaborations, internships, and conversations about speech technology and software development.
                </p>
                <a
                    href={`mailto:${profile.email}`}
                    className="mt-6 inline-block break-all font-display text-2xl font-medium text-olive-dark underline underline-offset-8 hover:text-ink sm:text-4xl"
                >
                    {profile.email}
                </a>

                <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                    {profile.links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold underline underline-offset-4 hover:text-olive-dark"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </div>

        <footer className="mx-auto mt-20 max-w-6xl border-t border-ink/20 px-4 pt-6 text-sm text-ink/70 sm:px-6 lg:px-8">
            © {new Date().getFullYear()} {profile.name}
        </footer>
    </section>
);

export default Contact;
