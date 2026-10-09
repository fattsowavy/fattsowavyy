import { useEffect, useState } from 'react';
import { gallery } from '../data/gallery';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    ...(gallery.length > 0 ? [{ name: 'Gallery', href: '#gallery' }] : []),
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [active, setActive] = useState('');

    useEffect(() => {
        const sections = ['home', ...navLinks.map((l) => l.href.slice(1))]
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const linkClass = (href) =>
        `font-medium transition-colors hover:text-olive-dark ${
            active === href ? 'text-olive-dark underline decoration-2 underline-offset-8' : ''
        }`;

    return (
        <nav className="fixed inset-x-0 top-0 z-50 border-b border-ink/15 bg-cream/95 backdrop-blur-sm">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => scrollToSection(e, '#home')}
                        className="font-display text-xl font-semibold"
                    >
                        Fatwah Fajriansyah
                    </a>

                    <div className="hidden space-x-8 text-sm md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={linkClass(link.href)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="border-t border-ink/15 bg-cream md:hidden">
                    <div className="space-y-1 px-4 py-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                className={`block py-2 ${linkClass(link.href)}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
