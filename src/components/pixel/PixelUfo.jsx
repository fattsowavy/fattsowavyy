// Original pixel-art UFO for the CRT theme: glass dome, grey saucer, a row of lights that chase
// between two frames (.sprite-frame-a / .sprite-frame-b), and an optional tractor beam below.

const W = 21;
const BEAM_H = 9;

const COLORS = {
    c: '#41A6F6', // dome
    h: '#73EFF7', // dome highlight
    g: '#94B0C2', // saucer top
    d: '#566C86', // saucer underside
};
const LIGHTS = ['#FFCD75', '#B13E53', '#38B764'];
const LIGHT_X = [3, 7, 10, 13, 17];

const DOME = ['..ccccc..', '.chhcccc.', 'chccccccc', 'ccccccccc'];
const HULL = ['..ggggggggggggggggg..', 'ggggggggggggggggggggg', '.ddddddddddddddddddd.', '...ddddddddddddddd...'];

const toRects = (rows, ox, oy) =>
    rows.flatMap((row, y) => {
        const rects = [];
        let start = 0;
        for (let x = 1; x <= row.length; x++) {
            if (row[x] !== row[start]) {
                if (row[start] !== '.') rects.push({ x: ox + start, y: oy + y, w: x - start, fill: COLORS[row[start]] });
                start = x;
            }
        }
        return rects;
    });

const BODY = [...toRects(DOME, 6, 0), ...toRects(HULL, 0, 4)];
const lights = (shift) => LIGHT_X.map((x, i) => ({ x, y: 6, w: 1, fill: LIGHTS[(i + shift) % LIGHTS.length] }));

// tractor beam: a trapezoid widening downward, drawn as one rect per row
const BEAM = Array.from({ length: BEAM_H }, (_, i) => ({ x: 7 - i, y: 8 + i, w: 7 + i * 2 }));

const Rects = ({ rects }) =>
    rects.map((r) => <rect key={`${r.x}-${r.y}-${r.fill}`} x={r.x} y={r.y} width={r.w} height="1" fill={r.fill} />);

// beam: false = no beam, 'flight' = beam that only shows while the UFO hovers mid-flight (CSS)
const PixelUfo = ({ beam = false, className = '' }) => {
    const h = beam ? 8 + BEAM_H : 8;
    return (
        <svg viewBox={`-1 0 ${W + 2} ${h}`} className={className} shapeRendering="crispEdges" aria-hidden="true">
            {beam && (
                <g className={`ufo-beam ${beam === 'flight' ? 'ufo-beam-flight' : ''}`} fill="#FFCD75">
                    {BEAM.map((r) => (
                        <rect key={r.y} x={r.x} y={r.y} width={r.w} height="1" />
                    ))}
                </g>
            )}
            <Rects rects={BODY} />
            <g className="sprite-frame-a">
                <Rects rects={lights(0)} />
            </g>
            <g className="sprite-frame-b">
                <Rects rects={lights(1)} />
            </g>
        </svg>
    );
};

export default PixelUfo;
