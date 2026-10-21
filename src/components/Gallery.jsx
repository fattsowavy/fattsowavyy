import { useEffect, useRef, useState } from 'react';
import { gallery, shotNo } from '../data/gallery';
import CardViewer from './CardViewer';
import SectionHeading from './pixel/SectionHeading';
import Reveal from './Reveal';

const Gallery = () => {
    const [current, setCurrent] = useState(null);
    const openerRef = useRef(null);
    const isOpen = current !== null;

    // while the card viewer is open: lock page scroll and pause page animations, then hand focus back to the thumbnail
    useEffect(() => {
        if (!isOpen) return;
        const opener = openerRef.current;
        const root = document.documentElement;
        document.body.style.overflow = 'hidden';
        root.classList.add('px-modal-open');
        return () => {
            document.body.style.overflow = '';
            root.classList.remove('px-modal-open');
            opener?.focus();
        };
    }, [isOpen]);

    if (gallery.length === 0) return null;

    const openAt = (e, i) => {
        openerRef.current = e.currentTarget;
        setCurrent(i);
    };

    return (
        <section id="gallery" className="scroll-mt-20 border-t-4 border-px-line py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading stage={5} label="Gallery" title="Moments & documentation" kicker="Screenshots" />

                <Reveal>
                    <ul className="columns-1 gap-8 sm:columns-2 lg:columns-3">
                        {gallery.map((item, i) => (
                            <li key={item.file} className="px-card mb-8 break-inside-avoid p-2">
                                <button
                                    type="button"
                                    onClick={(e) => openAt(e, i)}
                                    className="px-photo block w-full border-4 border-px-line"
                                    aria-label={item.title ? `Open card: ${item.title}` : `Open card ${i + 1}`}
                                >
                                    <img src={item.src} alt={item.title || 'Documentation photo'} loading="lazy" decoding="async" className="block w-full" />
                                </button>
                                <div className="px-2 pb-2 pt-3">
                                    <p className="font-pixel text-[10px] uppercase leading-relaxed text-px-muted">
                                        Screenshot {shotNo(i)}
                                        {item.date && <span className="text-px-cyan"> · {item.date}</span>}
                                    </p>
                                    {item.title && <h3 className="mt-2 font-semibold leading-snug">{item.title}</h3>}
                                    {item.description && <p className="mt-1 text-px-muted">{item.description}</p>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {isOpen && <CardViewer items={gallery} startIndex={current} onClose={() => setCurrent(null)} />}
        </section>
    );
};

export default Gallery;
