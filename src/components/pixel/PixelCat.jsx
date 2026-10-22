// Original pixel-art "sakura mochi cat" for the Sakura theme: a white cat whose body is a pink
// mochi with petal sprinkles, flying on a pastel rainbow. Nyan-style homage, not the Nyan Cat sprite.
// Two frames (legs + tail) swap with a CSS steps() animation (.sprite-frame-a / .sprite-frame-b).

const W = 25; // cat width in sprite pixels
const H = 13;
const TRAIL_SEGMENTS = 6;
const SEG = 8; // trail segment width
const TRAIL = TRAIL_SEGMENTS * SEG;

const COLORS = {
    k: '#3F1F33', // outline / eyes
    b: '#F7B6CF', // mochi body
    s: '#E9799C', // petal sprinkles
    g: '#FFFFFF', // fur
    c: '#F49AB8', // cheeks
};

const RAINBOW = ['#F28AA0', '#F6B48A', '#F2D98A', '#9FD8A8', '#8FBDEA', '#B9A2E3'];

// stamp a small ascii part ('.' = transparent) into the grid at (x, y)
const stamp = (grid, x, y, rows) =>
    rows.forEach((row, dy) =>
        [...row].forEach((ch, dx) => {
            if (ch !== '.') grid[y + dy][x + dx] = ch;
        })
    );

const BODY = [
    '.kkkkkkkkkkkk.',
    'kbbbbbbbbbbbbk',
    'kbsbbbsbbbbbbk',
    'kbbbbbbbbbbbbk',
    'kbbbsbbbbbbbbk',
    'kbbbbbbbsbbbbk',
    'kbbbbbbbbbbbbk',
    'kbsbbbbbbbbbbk',
    'kbbbbbsbbbbbbk',
    'kbbbbbbbbbbbbk',
    '.kkkkkkkkkkkk.',
];

const HEAD = [
    'kk.......kk',
    'kgk.....kgk',
    'kggkkkkkggk',
    'kgggggggggk',
    'kggkgggkggk',
    'kcgggkgggck',
    'kgggkgkgggk',
    '.kkkkkkkkk.',
];

const LEG = ['kgk', 'kk.'];
const TAIL_UP = ['kk...', 'kgk..', '.kgkk'];
const TAIL_DOWN = ['.kgkk', 'kgk..', 'kk...'];

const buildFrame = (tail, legX) => {
    const grid = Array.from({ length: H }, () => Array(W).fill('.'));
    stamp(grid, 4, 0, BODY);
    stamp(grid, 0, tail === 'up' ? 3 : 5, tail === 'up' ? TAIL_UP : TAIL_DOWN);
    legX.forEach((x) => stamp(grid, x, 11, LEG));
    stamp(grid, 13, 2, HEAD);
    // one rect per horizontal run of the same colour
    const rects = [];
    grid.forEach((row, y) => {
        let start = 0;
        for (let x = 1; x <= W; x++) {
            if (row[x] !== row[start]) {
                if (row[start] !== '.') rects.push({ x: start, y, w: x - start, fill: COLORS[row[start]] });
                start = x;
            }
        }
    });
    return rects;
};

const FRAME_A = buildFrame('up', [4, 8, 13, 17]);
const FRAME_B = buildFrame('down', [5, 9, 14, 18]);

// rainbow: 6 stripes of 2px, each 8px segment nudged up/down to look wavy; frames swap the wave
const buildTrail = (phase) =>
    Array.from({ length: TRAIL_SEGMENTS }, (_, i) => {
        const dy = (i + phase) % 2;
        return RAINBOW.map((fill, stripe) => ({ x: i * SEG - TRAIL, y: 1 + stripe * 2 + dy, w: SEG, h: 2, fill }));
    }).flat();

const TRAIL_A = buildTrail(0);
const TRAIL_B = buildTrail(1);

const Rects = ({ rects }) =>
    rects.map((r) => <rect key={`${r.x}-${r.y}-${r.fill}`} x={r.x} y={r.y} width={r.w} height={r.h ?? 1} fill={r.fill} />);

const PixelCat = ({ trail = true, className = '' }) => {
    const minX = trail ? -TRAIL : 0;
    return (
        <svg
            viewBox={`${minX} 0 ${W - minX} ${H + 1}`}
            className={className}
            shapeRendering="crispEdges"
            aria-hidden="true"
        >
            <g className="sprite-frame-a">
                {trail && <Rects rects={TRAIL_A} />}
                <Rects rects={FRAME_A} />
            </g>
            <g className="sprite-frame-b">
                {trail && <Rects rects={TRAIL_B} />}
                <Rects rects={FRAME_B} />
            </g>
        </svg>
    );
};

export default PixelCat;
