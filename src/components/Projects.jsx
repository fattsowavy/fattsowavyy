const Projects = () => {
    const projects = [
        {
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform with shopping cart, payment integration, and admin dashboard.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/0050ff/ffffff?text=E-Commerce'
        },
        {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates and team collaboration features.',
            technologies: ['React', 'Firebase', 'Tailwind CSS'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/1890ff/ffffff?text=Task+Manager'
        },
        {
            title: 'Weather Dashboard',
            description: 'A beautiful weather dashboard that displays current weather and forecasts using external APIs.',
            technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/40a9ff/ffffff?text=Weather+App'
        },
        {
            title: 'Portfolio Website',
            description: 'A modern and responsive portfolio website built with Next.js and styled with Tailwind CSS.',
            technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/69c0ff/ffffff?text=Portfolio'
        },
        {
            title: 'Blog Platform',
            description: 'A full-stack blog platform with markdown support, comments, and user authentication.',
            technologies: ['React', 'Express', 'PostgreSQL', 'JWT'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/91d5ff/ffffff?text=Blog+Platform'
        },
        {
            title: 'Social Media Dashboard',
            description: 'An analytics dashboard for social media metrics with beautiful charts and data visualization.',
            technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
            demoLink: 'https://demo.example.com',
            githubLink: 'https://github.com/username/project',
            image: 'https://via.placeholder.com/400x250/bae7ff/333333?text=Analytics'
        },
    ];

    return (
        <section id="projects" className="py-20 bg-gradient-to-br from-electric-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
                        My <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-electric-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and experience
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group"
                        >
                            {/* Project Image */}
                            <div className="relative overflow-hidden h-48">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-electric-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                                    {project.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-3 py-1 bg-electric-blue-50 text-electric-blue-700 text-xs font-medium rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-4">
                                    <a
                                        href={project.demoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-4 py-2 bg-electric-blue-600 text-white rounded-lg hover:bg-electric-blue-700 transition-colors duration-300 text-sm font-medium"
                                    >
                                        Live Demo
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-4 py-2 border-2 border-electric-blue-600 text-electric-blue-600 rounded-lg hover:bg-electric-blue-600 hover:text-white transition-colors duration-300 text-sm font-medium"
                                    >
                                        GitHub
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
