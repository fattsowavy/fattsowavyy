// Original pixel-art comet for the CRT theme: a white head with a tail that thins and cools from
// yellow to cyan. Drawn horizontally (head on the right); HeroFlyby tilts it into a diagonal.

const W = 30;
const H = 5;

const HEAD = ['..ww.', '.wwww', 'wwwwy', '.wwww', '..ww.'];
const COLORS = { w: '#F4F4F4', y: '#FFCD75', c: '#41A6F6', l: '#73EFF7' };

const rects = [];
// tail: x 0..24, thick near the head, one pixel thin at the far end
for (let x = 0; x < 25; x++) {
    const thick = x > 16 ? 3 : x > 8 ? 2 : 1;
    const color = x > 16 ? COLORS.y : x > 8 ? COLORS.l : COLORS.c;
    // the far end of the tail breaks up into sparkles
    if (x < 8 && x % 2) continue;
    rects.push({ x, y: thick === 3 ? 1 : 2, w: 1, h: thick === 2 ? 2 : thick, fill: color });
}
HEAD.forEach((row, y) =>
    [...row].forEach((ch, dx) => {
        if (ch !== '.') rects.push({ x: 25 + dx, y, w: 1, h: 1, fill: COLORS[ch] });
    })
);

const PixelComet = ({ className = '' }) => (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} shapeRendering="crispEdges" aria-hidden="true">
        {rects.map((r) => (
            <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={r.fill} />
        ))}
    </svg>
);

export default PixelComet;
