// Twinkling pixel stars over a perspective "retro grid" floor. Decorative only.
// Original implementation inspired by Background Pixel Stars / Retro Grid on 21st.dev (MIT).

// Fixed seed so the sky is identical on every render
let seed = 11;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const COLORS = ['bg-px-ink', 'bg-px-ink', 'bg-px-yellow', 'bg-px-cyan'];
const STARS = Array.from({ length: 48 }, (_, i) => ({
    left: rand() * 100,
    top: rand() * 70,
    size: rand() > 0.8 ? 4 : 2,
    color: COLORS[i % COLORS.length],
}));

// Stars twinkle in 4 groups, each a quarter-cycle apart: 4 animations instead of 48, which keeps
// an idle page cheap while still reading as random twinkling.
const LAYERS = [0, 1, 2, 3].map((layer) => STARS.filter((_, i) => i % 4 === layer));

const StarField = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {LAYERS.map((stars, layer) => (
            <div key={layer} className="absolute inset-0 animate-px-twinkle" style={{ animationDelay: `${-layer * 0.5}s` }}>
                {stars.map((star, i) => (
                    <span
                        key={i}
                        className={`px-star absolute ${star.color}`}
                        style={{ left: `${star.left}%`, top: `${star.top}%`, width: star.size, height: star.size }}
                    />
                ))}
            </div>
        ))}
        <div
            className="absolute inset-x-[-50%] bottom-0 h-1/3 opacity-30"
            style={{
                backgroundImage:
                    'linear-gradient(rgb(var(--px-line)) 2px, transparent 2px), linear-gradient(90deg, rgb(var(--px-line)) 2px, transparent 2px)',
                backgroundSize: '48px 48px',
                transform: 'perspective(300px) rotateX(60deg)',
                transformOrigin: 'bottom',
            }}
        />
    </div>
);

export default StarField;
