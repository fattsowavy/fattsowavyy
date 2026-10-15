// Section heading: "STAGE 0n" kicker plus a title that wipes in, in 12 steps, the first time it scrolls into view.
// Original implementation inspired by Pixel Heading Word (cult/ui, MIT).
import { useInView } from '../../hooks/useInView';

const SectionHeading = ({ stage, label, title, kicker }) => {
    const [ref, inView] = useInView(0.1);

    return (
        <div ref={ref} className="mb-12">
            <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-pixel text-[10px] uppercase leading-relaxed sm:text-xs">
                <span className="bg-px-yellow px-2 py-1 text-px-on">Stage {String(stage).padStart(2, '0')}</span>
                <span className="text-px-muted">{label}</span>
                {kicker && (
                    <span className="text-px-muted" aria-hidden="true">
                        · {kicker}
                    </span>
                )}
            </p>
            <h2
                className={`font-pixel text-xl uppercase leading-snug sm:text-2xl lg:text-3xl ${
                    inView ? 'animate-px-wipe' : '[clip-path:inset(0_100%_0_0)]'
                }`}
                style={{ textShadow: '4px 4px 0 rgb(var(--px-red))' }}
            >
                {title}
            </h2>
        </div>
    );
};

export default SectionHeading;
