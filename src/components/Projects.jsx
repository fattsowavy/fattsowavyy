import { projects } from '../data/projects';
import Reveal from './Reveal';
import SectionTitle from './SectionTitle';

const linkClass = 'font-semibold text-olive-dark underline underline-offset-4 hover:text-ink';

const Projects = () => (
    <section id="projects" className="scroll-mt-16 border-t border-ink/20 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionTitle label="Projects" title="Things I've built" />

            <div className="space-y-6">
                {projects.map((project) => (
                    <Reveal key={project.title}>
                        <article className="grid gap-6 rounded-md border border-ink/25 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
                            {project.image && (
                                <img
                                    src={project.image}
                                    alt={`${project.title} screenshot`}
                                    className="w-full rounded border border-ink/20 object-cover md:order-2 md:w-72"
                                />
                            )}
                            <div>
                                <p className="text-sm font-semibold text-olive-dark">{project.period}</p>
                                <h3 className="mt-1 font-display text-2xl font-medium sm:text-3xl">{project.title}</h3>
                                <p className="mt-3 max-w-2xl leading-relaxed text-ink/80">{project.description}</p>

                                <ul className="mt-5 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <li key={tech} className="rounded-full bg-sage/30 px-3 py-1 text-xs font-medium">
                                            {tech}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-6 flex gap-6">
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            Link
                                        </a>
                                    )}
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                                            Source code
                                        </a>
                                    )}
                                    {!project.demo && !project.github && (
                                        <p className="text-sm text-ink/70">Links and documentation coming soon.</p>
                                    )}
                                </div>
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
