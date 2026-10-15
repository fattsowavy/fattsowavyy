// Pixel-art icons drawn from tiny character grids ('#' = filled). Original artwork, MIT like the rest of the repo.
const SPRITES = {
    heart: [
        '.##.##.',
        '#######',
        '#######',
        '.#####.',
        '..###..',
        '...#...',
    ],
    star: [
        '...#...',
        '...#...',
        '#######',
        '.#####.',
        '..###..',
        '.##.##.',
        '.#...#.',
    ],
    coin: [
        '..###..',
        '.#####.',
        '##.####',
        '##.####',
        '##.####',
        '.#####.',
        '..###..',
    ],
    trophy: [
        '########',
        '########',
        '#.####.#',
        '.######.',
        '..####..',
        '...##...',
        '...##...',
        '.######.',
    ],
    medal: [
        '#.....#',
        '.#...#.',
        '..#.#..',
        '..###..',
        '.#####.',
        '.##.##.',
        '.#####.',
        '..###..',
    ],
    scroll: [
        '.######',
        '#.....#',
        '#.###.#',
        '#.....#',
        '#.###.#',
        '#.....#',
        '######.',
    ],
    gem: [
        '.#####.',
        '##.#.##',
        '#######',
        '.#####.',
        '..###..',
        '...#...',
    ],
    cursor: [
        '#...',
        '##..',
        '###.',
        '####',
        '###.',
        '##..',
        '#...',
    ],
    pin: [
        '.###.',
        '##.##',
        '##.##',
        '.###.',
        '.###.',
        '..#..',
        '..#..',
    ],
    mail: [
        '########',
        '##....##',
        '#.#..#.#',
        '#..##..#',
        '#......#',
        '########',
    ],
    gear: [
        '.#.#.#.',
        '#######',
        '.##.##.',
        '###.###',
        '.##.##.',
        '#######',
        '.#.#.#.',
    ],
    menu: [
        '#######',
        '.......',
        '#######',
        '.......',
        '#######',
    ],
    close: [
        '#.....#',
        '.#...#.',
        '..#.#..',
        '...#...',
        '..#.#..',
        '.#...#.',
        '#.....#',
    ],
    down: [
        '#######',
        '.#####.',
        '..###..',
        '...#...',
    ],
};

// Merge horizontal runs so each row is a few <rect>s instead of one per pixel
const toRects = (rows) =>
    rows.flatMap((row, y) => {
        const rects = [];
        let start = -1;
        [...row, '.'].forEach((cell, x) => {
            if (cell === '#' && start < 0) start = x;
            if (cell !== '#' && start >= 0) {
                rects.push({ x: start, y, w: x - start });
                start = -1;
            }
        });
        return rects;
    });

const CACHE = Object.fromEntries(
    Object.entries(SPRITES).map(([name, rows]) => [name, { w: rows[0].length, h: rows.length, rects: toRects(rows) }])
);

const PixelIcon = ({ name, className = 'h-4 w-4', title }) => {
    const sprite = CACHE[name];
    if (!sprite) return null;
    return (
        <svg
            viewBox={`0 0 ${sprite.w} ${sprite.h}`}
            className={className}
            fill="currentColor"
            shapeRendering="crispEdges"
            role={title ? 'img' : undefined}
            aria-hidden={title ? undefined : true}
            aria-label={title}
        >
            {sprite.rects.map((r) => (
                <rect key={`${r.x}-${r.y}`} x={r.x} y={r.y} width={r.w} height="1" />
            ))}
        </svg>
    );
};

export default PixelIcon;
