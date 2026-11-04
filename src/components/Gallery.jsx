import { useEffect, useRef, useState } from 'react';
import { gallery, shotNo } from '../data/gallery';
import CardViewer from './CardViewer';
import PixelIcon from './pixel/PixelIcon';
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
                    {/* every card the same shape: photos cropped to 4:3, aimed with each photo's `position` */}
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {gallery.map((item, i) => (
                            // gc-card: lifts and lights up on hover / keyboard focus (styles in index.css)
                            <li key={item.file} className="gc-card group px-card relative flex flex-col p-2">
                                <div className="px-photo relative aspect-[4/3] w-full border-4 border-px-line">
                                    <img
                                        src={item.src}
                                        alt={item.title || 'Documentation photo'}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover"
                                        style={{ objectPosition: item.position }}
                                    />
                                    {/* blinking selection brackets, shown on hover / focus */}
                                    {['left-1 top-1 border-l-4 border-t-4', 'right-1 top-1 border-r-4 border-t-4', 'bottom-1 left-1 border-b-4 border-l-4', 'bottom-1 right-1 border-b-4 border-r-4'].map((pos) => (
                                        <span key={pos} className={`gc-corner absolute z-10 h-4 w-4 border-px-yellow ${pos}`} aria-hidden="true" />
                                    ))}
                                    {/* always-visible "you can open this" badge, breathing */}
                                    <span
                                        className="gc-badge px-breathe absolute bottom-2 right-2 z-10 flex items-center gap-1 border-2 border-px-yellow bg-px-bg px-2 py-1 font-pixel text-[10px] uppercase leading-none"
                                        aria-hidden="true"
                                    >
                                        <PixelIcon name="cursor" className="h-2 w-1.5" />
                                        View card
                                    </span>
                                </div>
                                <div className="px-2 pb-2 pt-3">
                                    <p className="font-pixel text-[10px] uppercase leading-relaxed text-px-muted">
                                        Screenshot {shotNo(i)}
                                        {item.date && <span className="text-px-cyan"> · {item.date}</span>}
                                    </p>
                                    {item.title && <h3 className="mt-2 font-semibold leading-snug">{item.title}</h3>}
                                    {item.description && <p className="mt-1 text-px-muted">{item.description}</p>}
                                </div>
                                {/* one button stretched over the whole card: photo, title and text all open it */}
                                <button
                                    type="button"
                                    onClick={(e) => openAt(e, i)}
                                    className="absolute inset-0 z-20"
                                    aria-label={item.title ? `Open card: ${item.title}` : `Open card ${i + 1}`}
                                />
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
