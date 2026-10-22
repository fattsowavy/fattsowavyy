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
    delay: (rand() * 2).toFixed(2),
}));

const StarField = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {STARS.map((star, i) => (
            <span
                key={i}
                className={`px-star absolute animate-px-twinkle ${star.color}`}
                style={{
                    left: `${star.left}%`,
                    top: `${star.top}%`,
                    width: star.size,
                    height: star.size,
                    animationDelay: `${star.delay}s`,
                }}
            />
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
