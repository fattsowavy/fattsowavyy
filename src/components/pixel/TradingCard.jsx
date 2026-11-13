// Two-sided trading card for a gallery photo. The photo sits on a raised box (four "riser" walls)
// so it pops out when the card tilts. Layout after the "Ghouls" card demo (ghoul.gg, CodePen, MIT);
// original pixel-art implementation. Styles: .tc-* in src/index.css.
import PixelIcon from './PixelIcon';

// Portrait on phones; from 900px wide the front turns landscape: photo left, text right (.tc-* areas).
// sizer: a hidden copy that only measures the card's natural height (see CardViewer)
const TradingCard = ({ item, number, sizer = false }) => (
    <div className={`tc-card ${sizer ? 'tc-sizer' : ''}`}>
        <div className="tc-front">
            <div className="tc-head flex items-center justify-between gap-3 font-pixel text-[10px] uppercase leading-relaxed">
                <span className="text-px-yellow">No. {number}</span>
                {item.date && <span className="text-right text-px-cyan">{item.date}</span>}
            </div>

            <div className="tc-pic tc-riser-box aspect-[4/3]">
                <span className="tc-wall tc-wall-top" />
                <span className="tc-wall tc-wall-bottom" />
                <span className="tc-wall tc-wall-left" />
                <span className="tc-wall tc-wall-right" />
                <div className="tc-photo">
                    <img
                        src={item.src}
                        alt={item.title || 'Documentation photo'}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: item.position }}
                        decoding="async"
                    />
                </div>
            </div>

            <h3
                className="tc-title font-pixel text-[11px] uppercase leading-relaxed sm:text-sm"
                style={{ textShadow: '2px 2px 0 rgb(var(--px-red))' }}
            >
                {item.title || 'Documentation'}
            </h3>
            {item.description && <p className="tc-desc text-base leading-snug text-px-muted sm:text-lg">{item.description}</p>}

            {item.link && (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tc-link px-btn px-btn-primary self-start text-[10px]"
                    aria-label={`${item.linkLabel}: ${item.title || 'documentation'} (opens in a new tab)`}
                >
                    <PixelIcon name="cursor" className="h-3 w-2" />
                    {item.linkLabel}
                </a>
            )}

            <div className="tc-foot mt-auto flex items-center justify-between gap-3 border-t-4 border-px-line pt-3" aria-hidden="true">
                <span className="flex items-center gap-2 font-pixel text-[8px] uppercase text-px-muted sm:text-[10px]">
                    <PixelIcon name="heart" className="h-3 w-3 text-px-red" />
                    Fatwah · Gallery
                </span>
                <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                        <PixelIcon key={i} name="star" className="h-3 w-3 text-px-yellow" />
                    ))}
                </span>
            </div>
        </div>

        <div className="tc-back" aria-hidden="true">
            <PixelIcon name="heart" className="h-16 w-20 text-px-red" />
            <p className="font-pixel text-sm uppercase text-px-on">Fatwah</p>
            <p className="font-pixel text-[10px] uppercase text-px-on">Gallery card</p>
        </div>
    </div>
);

export default TradingCard;
