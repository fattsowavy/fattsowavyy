import { setSetting, useSetting } from '../lib/settings';

const toggleClass = 'px-btn px-btn-ghost w-full justify-between text-[10px]';

// THEME / FX / SOUND switches; rendered in the desktop popover and the mobile drawer
const Options = () => {
    const theme = useSetting('theme');
    const fx = useSetting('fx');
    const sound = useSetting('sound');

    return (
        <div className="flex flex-col gap-3">
            <button
                type="button"
                className={toggleClass}
                onClick={() => setSetting('theme', theme === 'sakura' ? 'crt' : 'sakura')}
                aria-label={`Theme: ${theme === 'sakura' ? 'Sakura' : 'CRT'}. Switch theme`}
            >
                <span>Theme</span>
                <span className="text-px-yellow">{theme === 'sakura' ? 'Sakura' : 'CRT'}</span>
            </button>
            <button
                type="button"
                className={toggleClass}
                onClick={() => setSetting('fx', fx === 'off' ? 'on' : 'off')}
                aria-pressed={fx !== 'off'}
            >
                <span>Screen FX</span>
                <span className="text-px-yellow">{fx === 'off' ? 'OFF' : 'ON'}</span>
            </button>
            <button
                type="button"
                className={toggleClass}
                onClick={() => setSetting('sound', sound === 'on' ? 'off' : 'on')}
                aria-pressed={sound === 'on'}
            >
                <span>Sound</span>
                <span className="text-px-yellow">{sound === 'on' ? 'ON' : 'OFF'}</span>
            </button>
        </div>
    );
};

export default Options;
