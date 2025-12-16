import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const PhysicsBackground = () => {
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    const engineRef = useRef(null);
    const [formulaBodies, setFormulaBodies] = useState([]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const Engine = Matter.Engine;
        const Render = Matter.Render;
        const Runner = Matter.Runner;
        const Bodies = Matter.Bodies;
        const Composite = Matter.Composite;
        const Mouse = Matter.Mouse;
        const MouseConstraint = Matter.MouseConstraint;

        const engine = Engine.create({
            gravity: { x: 0, y: 1 }
        });
        engineRef.current = engine;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const render = Render.create({
            element: canvasRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        });

        const wallOptions = {
            isStatic: true,
            render: { fillStyle: 'transparent', strokeStyle: 'transparent' }
        };

        const ground = Bodies.rectangle(width / 2, height - 10, width, 20, wallOptions);
        const leftWall = Bodies.rectangle(10, height / 2, 20, height, wallOptions);
        const rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, wallOptions);

        // ML formulas in LaTeX
        const mlFormulas = [
            { latex: '\\text{MSE} = \\frac{1}{n}\\sum_{i=1}^{n}(y_i - \\hat{y}_i)^2', width: 280, height: 60 },
            { latex: '\\sigma(x) = \\frac{1}{1+e^{-x}}', width: 160, height: 50 },
            { latex: 'J(\\theta) = -\\frac{1}{m}\\sum[y\\log(h)]', width: 240, height: 55 },
            { latex: '\\theta := \\theta - \\alpha\\nabla J(\\theta)', width: 200, height: 50 },
            { latex: '\\text{ReLU}(x) = \\max(0, x)', width: 180, height: 50 },
            { latex: '\\tanh(x) = \\frac{e^x - e^{-x}}{e^x + e^{-x}}', width: 200, height: 55 },
            { latex: '\\text{Softmax}(x_i) = \\frac{e^{x_i}}{\\sum_j e^{x_j}}', width: 220, height: 55 },
            { latex: 'L_2 = \\lambda\\sum\\theta^2', width: 140, height: 50 },
            { latex: '\\text{Accuracy} = \\frac{TP + TN}{\\text{Total}}', width: 220, height: 55 },
            { latex: '\\text{Precision} = \\frac{TP}{TP + FP}', width: 200, height: 55 },
            { latex: '\\text{Recall} = \\frac{TP}{TP + FN}', width: 180, height: 55 },
            { latex: 'F_1 = \\frac{2 \\cdot P \\cdot R}{P + R}', width: 180, height: 55 },
            { latex: 'H(X) = -\\sum p(x)\\log_2 p(x)', width: 220, height: 50 },
            { latex: 'D_{KL}(P||Q) = \\sum p\\log\\frac{p}{q}', width: 220, height: 55 },
            { latex: '\\cos(\\theta) = \\frac{A \\cdot B}{||A|| \\cdot ||B||}', width: 220, height: 55 },
            { latex: 'R^2 = 1 - \\frac{SS_{res}}{SS_{tot}}', width: 180, height: 55 },
            { latex: '\\text{Dropout}(x) = x \\cdot \\text{Bernoulli}(p)', width: 260, height: 50 },
            { latex: '\\text{BatchNorm} = \\frac{x-\\mu}{\\sqrt{\\sigma^2+\\epsilon}}', width: 240, height: 60 },
            { latex: '\\text{Adam}: \\frac{m}{\\sqrt{v} + \\epsilon}', width: 180, height: 55 },
            { latex: '\\nabla f(x) = \\frac{\\partial f}{\\partial x}', width: 160, height: 55 },
        ];

        const shapes = [];
        const shapeCount = 20;

        for (let i = 0; i < shapeCount; i++) {
            const x = Math.random() * (width - 300) + 150;
            const y = Math.random() * -2000 - 100;
            const formulaData = mlFormulas[i % mlFormulas.length];

            const shape = Bodies.rectangle(x, y, formulaData.width, formulaData.height, {
                restitution: 0.7,
                friction: 0.05,
                density: 0.001,
                angle: (Math.random() - 0.5) * 0.3,
                render: {
                    fillStyle: 'transparent',
                    strokeStyle: 'transparent',
                    lineWidth: 0
                },
                formulaLatex: formulaData.latex,
                formulaId: `formula-${i}`
            });

            shapes.push(shape);
        }

        Composite.add(engine.world, [ground, leftWall, rightWall, ...shapes]);

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: { stiffness: 0.2, render: { visible: false } }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Update formula positions
        Matter.Events.on(engine, 'afterUpdate', function () {
            const bodies = Composite.allBodies(engine.world);
            const updatedBodies = bodies
                .filter(body => body.formulaLatex)
                .map(body => ({
                    id: body.formulaId,
                    x: body.position.x,
                    y: body.position.y,
                    angle: body.angle,
                    latex: body.formulaLatex
                }));
            setFormulaBodies(updatedBodies);
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        const handleResize = () => {
            const newWidth = window.innerWidth;
            const newHeight = window.innerHeight;

            render.canvas.width = newWidth;
            render.canvas.height = newHeight;
            render.options.width = newWidth;
            render.options.height = newHeight;

            Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight - 10 });
            Matter.Body.setVertices(ground, Matter.Vertices.fromPath(`0 0 ${newWidth} 0 ${newWidth} 20 0 20`));

            Matter.Body.setPosition(leftWall, { x: 10, y: newHeight / 2 });
            Matter.Body.setVertices(leftWall, Matter.Vertices.fromPath(`0 0 20 0 20 ${newHeight} 0 ${newHeight}`));

            Matter.Body.setPosition(rightWall, { x: newWidth - 10, y: newHeight / 2 });
            Matter.Body.setVertices(rightWall, Matter.Vertices.fromPath(`0 0 20 0 20 ${newHeight} 0 ${newHeight}`));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            Render.stop(render);
            Runner.stop(runner);
            Engine.clear(engine);
            render.canvas.remove();
            render.textures = {};
        };
    }, []);

    return (
        <>
            <div
                ref={canvasRef}
                className="absolute inset-0 pointer-events-auto"
                style={{ zIndex: 1 }}
            />
            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 2 }}
            >
                {formulaBodies.map((body) => (
                    <FormulaElement
                        key={body.id}
                        x={body.x}
                        y={body.y}
                        angle={body.angle}
                        latex={body.latex}
                    />
                ))}
            </div>
        </>
    );
};

const FormulaElement = ({ x, y, angle, latex }) => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            try {
                katex.render(latex, ref.current, {
                    throwOnError: false,
                    displayMode: false
                });
            } catch (e) {
                ref.current.textContent = latex;
            }
        }
    }, [latex]);

    return (
        <div
            style={{
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) rotate(${angle}rad)`,
                padding: '8px 12px',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '0',
                boxShadow: 'none',
                fontSize: '16px',
                color: '#000000',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                transition: 'none'
            }}
        >
            <div ref={ref} style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.1))' }} />
        </div>
    );
};

export default PhysicsBackground;
