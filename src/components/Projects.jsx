import { projects } from '../data/projects';
import PixelIcon from './pixel/PixelIcon';
import SectionHeading from './pixel/SectionHeading';
import Reveal from './Reveal';

// Grip ridges along the top of a cartridge
const ridges = { backgroundImage: 'repeating-linear-gradient(90deg, rgb(var(--px-line)) 0 4px, transparent 4px 10px)' };

const Projects = () => (
    <section id="projects" className="scroll-mt-20 border-t-4 border-px-line py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading stage={4} label="Projects" title="Things I've built" kicker="Cartridge select" />

            <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                    <li key={project.title}>
                        <Reveal className="h-full">
                            <article className="px-card flex h-full flex-col p-4">
                                <div className="mb-4 flex items-center gap-3" aria-hidden="true">
                                    <span className="h-5 flex-1" style={ridges} />
                                    <span className="font-pixel text-[10px] text-px-muted">No.{String(i + 1).padStart(2, '0')}</span>
                                </div>

                                {/* label sticker */}
                                <div className="flex-1 border-4 border-px-line bg-px-bg p-4">
                                    {project.image && (
                                        <div className="px-photo mb-4 aspect-video border-4 border-px-line">
                                            <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" className="h-full w-full object-cover" />
                                        </div>
                                    )}
                                    <p className="font-pixel text-[10px] uppercase text-px-yellow">{project.period}</p>
                                    <h3 className="mt-3 font-pixel text-sm uppercase leading-relaxed">{project.title}</h3>
                                    <p className="mt-3">{project.description}</p>
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <li key={tech} className="px-chip">
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-btn px-btn-primary"
                                            aria-label={`Play: open ${project.title}`}
                                        >
                                            <PixelIcon name="cursor" className="h-3 w-2" />
                                            Play
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-btn px-btn-ghost"
                                            aria-label={`Source code: ${project.title}`}
                                        >
                                            Source
                                        </a>
                                    )}
                                    {!project.demo && !project.github && (
                                        <p className="text-px-muted">Links and documentation coming soon.</p>
                                    )}
                                </div>
                            </article>
                        </Reveal>
                    </li>
                ))}

                {/* honest placeholder, clearly not a project */}
                <li className="flex min-h-[18rem] flex-col items-center justify-center gap-3 border-4 border-dashed border-px-line p-6 text-center text-px-muted">
                    <p className="font-pixel text-[10px] uppercase">Empty slot</p>
                    <p>More projects coming soon.</p>
                </li>
            </ul>
        </div>
    </section>
);

export default Projects;
