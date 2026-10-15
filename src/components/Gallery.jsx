import { useEffect, useRef, useState } from 'react';
import { gallery } from '../data/gallery';
import SectionHeading from './pixel/SectionHeading';
import Reveal from './Reveal';

const shotNo = (i) => String(i + 1).padStart(2, '0');

const Gallery = () => {
    const [current, setCurrent] = useState(null);
    const closeRef = useRef(null);
    const openerRef = useRef(null);
    const isOpen = current !== null;

    useEffect(() => {
        if (!isOpen) return;
        const opener = openerRef.current;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        const onKey = (e) => {
            if (e.key === 'Escape') setCurrent(null);
            if (e.key === 'ArrowRight') setCurrent((i) => (i + 1) % gallery.length);
            if (e.key === 'ArrowLeft') setCurrent((i) => (i - 1 + gallery.length) % gallery.length);
        };
        document.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('keydown', onKey);
            opener?.focus();
        };
    }, [isOpen]);

    if (gallery.length === 0) return null;
    const photo = isOpen ? gallery[current] : null;

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
                            <li key={item.file} className="mb-8 break-inside-avoid">
                                <button
                                    type="button"
                                    onClick={(e) => openAt(e, i)}
                                    className="px-card block w-full p-2 text-left"
                                    aria-label={item.caption ? `Enlarge photo: ${item.caption}` : `Enlarge photo ${i + 1}`}
                                >
                                    <span className="px-photo block border-4 border-px-line">
                                        <img src={item.src} alt={item.caption || 'Documentation photo'} loading="lazy" className="block w-full" />
                                    </span>
                                    <span className="mt-2 flex items-center justify-between gap-2 px-1 pb-1">
                                        <span className="font-pixel text-[10px] uppercase text-px-muted">Screenshot {shotNo(i)}</span>
                                        {item.caption && <span className="text-right">{item.caption}</span>}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {photo && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                    onClick={() => setCurrent(null)}
                >
                    <div className="px-card edge-ink flex max-h-full max-w-5xl flex-col p-3" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <p className="font-pixel text-[10px] uppercase text-px-muted">
                                Screenshot {shotNo(current)} / {shotNo(gallery.length - 1)}
                            </p>
                            <button ref={closeRef} type="button" onClick={() => setCurrent(null)} className="px-btn px-btn-ghost text-[10px]">
                                Close
                            </button>
                        </div>
                        <figure className="min-h-0">
                            <img
                                src={photo.src}
                                alt={photo.caption || 'Documentation photo'}
                                className="max-h-[70vh] w-auto border-4 border-px-line object-contain"
                            />
                            {photo.caption && <figcaption className="mt-3 text-center">{photo.caption}</figcaption>}
                        </figure>
                        {gallery.length > 1 && (
                            <div className="mt-3 flex justify-between gap-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrent((current - 1 + gallery.length) % gallery.length)}
                                    className="px-btn px-btn-ghost text-[10px]"
                                    aria-label="Previous photo"
                                >
                                    Prev
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrent((current + 1) % gallery.length)}
                                    className="px-btn px-btn-primary text-[10px]"
                                    aria-label="Next photo"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
