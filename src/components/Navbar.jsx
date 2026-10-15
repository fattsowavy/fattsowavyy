import { useEffect, useRef, useState } from 'react';
import { gallery } from '../data/gallery';
import Options from './Options';
import PixelIcon from './pixel/PixelIcon';

const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    ...(gallery.length > 0 ? [{ name: 'Gallery', href: '#gallery' }] : []),
    { name: 'Contact', href: '#contact' },
];

const NavLink = ({ link, active, mobile, onNavigate }) => {
    const isActive = active === link.href;
    return (
        <a
            href={link.href}
            onClick={(e) => onNavigate(e, link.href)}
            aria-current={isActive ? 'location' : undefined}
            className={`flex min-h-[44px] items-center gap-2 font-pixel uppercase hover:text-px-yellow ${
                mobile ? 'text-xs' : 'text-[10px] xl:text-xs'
            } ${isActive ? 'text-px-yellow' : 'text-px-ink'}`}
        >
            <PixelIcon name="cursor" className={`h-3 w-2 shrink-0 ${isActive ? 'animate-px-blink' : 'invisible'}`} />
            {link.name}
        </a>
    );
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [active, setActive] = useState('');
    const menuButtonRef = useRef(null);
    const drawerRef = useRef(null);
    const optionsRef = useRef(null);

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

    // Mobile drawer: lock scroll, focus first link, close on Escape, restore focus on close
    useEffect(() => {
        if (!isMenuOpen) return;
        const button = menuButtonRef.current;
        document.body.style.overflow = 'hidden';
        drawerRef.current?.querySelector('a, button')?.focus();
        const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKey);
            button?.focus();
        };
    }, [isMenuOpen]);

    // Desktop options popover: close on Escape or outside click
    useEffect(() => {
        if (!isOptionsOpen) return;
        const onKey = (e) => e.key === 'Escape' && setIsOptionsOpen(false);
        const onClick = (e) => !optionsRef.current?.contains(e.target) && setIsOptionsOpen(false);
        document.addEventListener('keydown', onKey);
        document.addEventListener('mousedown', onClick);
        return () => {
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('mousedown', onClick);
        };
    }, [isOptionsOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        setIsMenuOpen(false);
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="fixed inset-x-0 top-1.5 z-50 border-b-4 border-px-line bg-px-bg" aria-label="Main">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, '#home')}
                    className="flex min-h-[44px] shrink-0 items-center gap-2 whitespace-nowrap font-pixel text-[10px] uppercase sm:text-xs"
                >
                    <PixelIcon name="heart" className="h-4 w-5 text-px-red" />
                    Fatwah Fajriansyah
                </a>

                <div className="hidden items-center gap-4 lg:flex xl:gap-5">
                    {navLinks.map((link) => (
                        <NavLink key={link.name} link={link} active={active} onNavigate={scrollToSection} />
                    ))}

                    <div className="relative" ref={optionsRef}>
                        <button
                            type="button"
                            onClick={() => setIsOptionsOpen((o) => !o)}
                            aria-expanded={isOptionsOpen}
                            aria-controls="options-panel"
                            aria-label="Options"
                            className="flex h-11 w-11 items-center justify-center hover:text-px-yellow"
                        >
                            <PixelIcon name="gear" className="h-5 w-5" />
                        </button>
                        {isOptionsOpen && (
                            <div id="options-panel" className="px-card absolute right-0 top-14 w-60 p-4">
                                <p className="mb-3 font-pixel text-[10px] uppercase text-px-muted">Options</p>
                                <Options />
                            </div>
                        )}
                    </div>
                </div>

                <button
                    ref={menuButtonRef}
                    type="button"
                    onClick={() => setIsMenuOpen(true)}
                    className="flex h-11 w-11 items-center justify-center lg:hidden"
                    aria-label="Open menu"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-drawer"
                >
                    <PixelIcon name="menu" className="h-5 w-6" />
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/70" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
                    <div
                        id="mobile-drawer"
                        ref={drawerRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="absolute inset-y-0 right-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto border-l-4 border-px-line bg-px-panel p-5"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <p className="font-pixel text-xs uppercase text-px-muted">Menu</p>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen(false)}
                                className="flex h-11 w-11 items-center justify-center hover:text-px-yellow"
                                aria-label="Close menu"
                            >
                                <PixelIcon name="close" className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <NavLink key={link.name} link={link} active={active} onNavigate={scrollToSection} mobile />
                            ))}
                        </div>
                        <div className="mt-8 border-t-4 border-px-line pt-6">
                            <p className="mb-3 font-pixel text-[10px] uppercase text-px-muted">Options</p>
                            <Options />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
