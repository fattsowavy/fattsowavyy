import { useEffect, useState } from 'react';
import { gallery } from '../data/gallery';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const Gallery = () => {
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (current === null) return;
        const onKey = (e) => {
            if (e.key === 'Escape') setCurrent(null);
            if (e.key === 'ArrowRight') setCurrent((i) => (i + 1) % gallery.length);
            if (e.key === 'ArrowLeft') setCurrent((i) => (i - 1 + gallery.length) % gallery.length);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [current]);

    if (gallery.length === 0) return null;
    const photo = current === null ? null : gallery[current];

    return (
        <section id="gallery" className="scroll-mt-16 border-t border-ink/20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionTitle label="Gallery" title="Moments & documentation" />

                <Reveal>
                    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                        {gallery.map((item, i) => (
                            <li key={item.file} className="mb-4 break-inside-avoid">
                                <button
                                    onClick={() => setCurrent(i)}
                                    className="block w-full overflow-hidden rounded-md border border-ink/25 text-left"
                                    aria-label={item.caption ? `Enlarge photo: ${item.caption}` : 'Enlarge photo'}
                                >
                                    <img
                                        src={item.src}
                                        alt={item.caption || 'Documentation photo'}
                                        loading="lazy"
                                        className="w-full transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                                    />
                                </button>
                                {item.caption && <p className="mt-2 text-sm text-ink/70">{item.caption}</p>}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            </div>

            {photo && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo viewer"
                    onClick={() => setCurrent(null)}
                >
                    <figure className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
                        <img src={photo.src} alt={photo.caption || 'Documentation photo'} className="max-h-[80vh] rounded-md object-contain" />
                        {photo.caption && <figcaption className="mt-3 text-center text-cream">{photo.caption}</figcaption>}
                    </figure>
                    <button
                        onClick={() => setCurrent(null)}
                        className="absolute right-4 top-4 rounded-md bg-cream px-3 py-1 text-sm font-semibold text-ink"
                    >
                        Close
                    </button>
                    {gallery.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrent((current - 1 + gallery.length) % gallery.length); }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-cream px-3 py-2 font-semibold text-ink"
                                aria-label="Previous photo"
                            >
                                ←
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); setCurrent((current + 1) % gallery.length); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-cream px-3 py-2 font-semibold text-ink"
                                aria-label="Next photo"
                            >
                                →
                            </button>
                        </>
                    )}
                </div>
            )}
        </section>
    );
};

export default Gallery;
