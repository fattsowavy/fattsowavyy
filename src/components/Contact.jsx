import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import { useInView } from '../hooks/useInView';
import { prefersReducedMotion } from '../lib/motion';
import SectionHeading from './pixel/SectionHeading';
import PixelIcon from './pixel/PixelIcon';
import PixelCat from './pixel/PixelCat';
import PixelUfo from './pixel/PixelUfo';
import { useSetting } from '../lib/settings';

// Controller buttons, in the order: email, then profile.links
const KEYS = [
    { key: 'A', className: 'h-10 w-10 bg-px-yellow text-px-on' },
    { key: 'B', className: 'h-10 w-10 bg-px-yellow text-px-on' },
    { key: 'Select', className: 'h-10 px-2 bg-px-ink text-px-bg' },
    { key: 'Start', className: 'h-10 px-2 bg-px-ink text-px-bg' },
];

const Contact = () => {
    const [ref, inView] = useInView(0.3);
    const theme = useSetting('theme');
    const [count, setCount] = useState(9);
    const buttons = [{ name: 'Email', url: `mailto:${profile.email}` }, ...profile.links];

    // "CONTINUE? 9..8..7" loop, only while on screen and when motion is allowed
    useEffect(() => {
        if (!inView || prefersReducedMotion()) return;
        const id = setInterval(() => setCount((c) => (c <= 1 ? 9 : c - 1)), 1000);
        return () => clearInterval(id);
    }, [inView]);

    return (
        <section id="contact" className="scroll-mt-20 border-t-4 border-px-line pt-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading stage={6} label="Contact" title="Let's talk" kicker="Continue?" />

                <div ref={ref} className="px-card edge-yellow p-6 text-center sm:p-10">
                    <div aria-hidden="true">
                        <p className="font-pixel text-xl uppercase text-px-yellow sm:text-3xl">Continue?</p>
                        <p className="mt-4 font-pixel text-5xl sm:text-6xl" style={{ textShadow: '4px 4px 0 rgb(var(--px-red))' }}>
                            {count}
                        </p>
                    </div>

                    <p className="mx-auto mt-8 max-w-xl text-xl">
                        I'm open to research collaborations, internships, and conversations about speech technology and software development.
                    </p>
                    <a
                        href={`mailto:${profile.email}`}
                        className="mt-6 inline-flex min-h-[44px] max-w-full items-center gap-3 text-xl text-px-yellow underline decoration-4 underline-offset-8 hover:text-px-ink sm:text-3xl"
                    >
                        <PixelIcon name="mail" className="h-5 w-6 shrink-0" />
                        <span className="break-all">{profile.email}</span>
                    </a>

                    <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
                        {buttons.map((link, i) => (
                            <li key={link.name}>
                                <a
                                    href={link.url}
                                    target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                                    rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                                    className="px-btn px-btn-ghost h-full w-full flex-col gap-3 py-4"
                                >
                                    <span
                                        className={`flex items-center justify-center font-pixel text-[10px] uppercase ${KEYS[i]?.className ?? KEYS[3].className}`}
                                        aria-hidden="true"
                                    >
                                        {KEYS[i]?.key ?? 'Start'}
                                    </span>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <footer className="mt-20 border-t-4 border-px-line">
                <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        {theme === 'sakura' ? <PixelCat trail={false} className="h-auto w-10" /> : <PixelUfo className="h-auto w-10" />}
                        <p className="font-pixel text-[10px] uppercase leading-relaxed text-px-muted">
                            © {new Date().getFullYear()} {profile.name}
                        </p>
                    </div>
                    <a href="#home" className="flex min-h-[44px] items-center gap-2 font-pixel text-[10px] uppercase hover:text-px-yellow">
                        <PixelIcon name="down" className="h-2 w-3 rotate-180" />
                        Back to title
                    </a>
                </div>
            </footer>
        </section>
    );
};

export default Contact;
