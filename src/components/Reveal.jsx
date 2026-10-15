import { useInView } from '../hooks/useInView';

// Fades/slides children in, in 4 discrete steps, the first time they scroll into view
const Reveal = ({ children, className = '' }) => {
    const [ref, visible] = useInView(0.1);

    return (
        <div
            ref={ref}
            className={`transition-[opacity,transform] duration-300 ease-[steps(4)] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
