// Photo that "resolves" from big pixel blocks to sharp, and replays on hover/focus.
// Original implementation inspired by the Pixel Image components on 21st.dev (MIT).
import { useEffect, useRef, useState } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../../lib/motion';

const BLOCKS = [32, 20, 12, 7, 4];
const W = 200; // internal canvas resolution, 4:5
const H = 250;

const PixelImage = ({ src, alt, className = '' }) => {
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    // index into BLOCKS while resolving; -1 = sharp
    const [phase, setPhase] = useState(() => (prefersReducedMotion() ? -1 : 0));
    const pixelating = loaded && phase >= 0;

    useEffect(() => {
        if (!pixelating) return;
        const img = imgRef.current;
        const canvas = canvasRef.current;
        const block = BLOCKS[phase];
        const small = document.createElement('canvas');
        small.width = Math.ceil(W / block);
        small.height = Math.ceil(H / block);

        // cover-crop the source to 4:5, shrink, then blow back up without smoothing
        const scale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
        const cw = W / scale;
        const ch = H / scale;
        small.getContext('2d').drawImage(img, (img.naturalWidth - cw) / 2, (img.naturalHeight - ch) / 2, cw, ch, 0, 0, small.width, small.height);
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(small, 0, 0, small.width, small.height, 0, 0, W, H);

        const id = setTimeout(() => setPhase((p) => (p + 1 >= BLOCKS.length ? -1 : p + 1)), 110);
        return () => clearTimeout(id);
    }, [pixelating, phase]);

    const replay = () => {
        if (phase < 0 && hasFinePointer() && !prefersReducedMotion()) setPhase(0);
    };

    return (
        <div className={`px-photo ${className}`} onMouseEnter={replay}>
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                className={`h-full w-full object-cover ${pixelating ? 'opacity-0' : ''}`}
            />
            <canvas
                ref={canvasRef}
                width={W}
                height={H}
                aria-hidden="true"
                className={`px-pixelated absolute inset-0 h-full w-full ${pixelating ? '' : 'hidden'}`}
            />
        </div>
    );
};

export default PixelImage;
