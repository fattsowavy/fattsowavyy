// Stacks several same-size <svg> layers (sprite frames, a UFO beam...) in one box. Each layer is its
// own <svg> root so a CSS opacity animation on it runs on the compositor; animating <g> elements
// inside a single <svg> forced a style recalculation on every frame.
// The first layer sizes the box; the rest are laid on top of it.
const SpriteStack = ({ viewBox, className = '', layers }) => {
    const display = /\b(block|flex|grid|hidden)\b/.test(className) ? '' : 'inline-block';
    return (
        <span className={`relative ${display} ${className}`} aria-hidden="true">
            {layers.map((layer, i) => (
                <svg
                    key={layer.key}
                    viewBox={viewBox}
                    shapeRendering="crispEdges"
                    className={`${i === 0 ? 'block h-auto w-full' : 'absolute inset-0 h-full w-full'} ${layer.className ?? ''}`}
                >
                    {layer.children}
                </svg>
            ))}
        </span>
    );
};

export default SpriteStack;
