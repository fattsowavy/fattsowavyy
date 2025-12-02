const Projects = () => {
    const projects = [
        {
            title: 'Sentiment Analysis System',
            description: 'Advanced NLP model for analyzing customer sentiment from social media and reviews using BERT and transformers.',
            technologies: ['Python', 'TensorFlow', 'BERT', 'NLP'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/0050ff/ffffff?text=Sentiment+Analysis'
        },
        {
            title: 'Image Classification Model',
            description: 'Deep learning CNN model for multi-class image classification with 95% accuracy using transfer learning.',
            technologies: ['PyTorch', 'CNN', 'ResNet', 'Computer Vision'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/1890ff/ffffff?text=Image+Classification'
        },
        {
            title: 'Recommendation System',
            description: 'Collaborative filtering recommendation engine using matrix factorization and deep learning techniques.',
            technologies: ['Python', 'Scikit-learn', 'Pandas', 'Surprise'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/40a9ff/ffffff?text=Recommendation'
        },
        {
            title: 'Predictive Analytics Dashboard',
            description: 'Time series forecasting dashboard for sales prediction using LSTM and Prophet models with interactive visualizations.',
            technologies: ['Python', 'LSTM', 'Prophet', 'Plotly'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/69c0ff/ffffff?text=Predictive+Analytics'
        },
        {
            title: 'NLP Chatbot',
            description: 'Intelligent conversational AI chatbot using transformer models and intent classification for customer support.',
            technologies: ['Python', 'Transformers', 'Rasa', 'NLP'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/91d5ff/ffffff?text=AI+Chatbot'
        },
        {
            title: 'Fraud Detection System',
            description: 'Machine learning model for detecting fraudulent transactions using ensemble methods and anomaly detection.',
            technologies: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas'],
            demoLink: 'https://github.com/fattsowavy',
            githubLink: 'https://github.com/fattsowavy',
            image: 'https://via.placeholder.com/400x250/bae7ff/333333?text=Fraud+Detection'
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
                        Here are some of my AI/ML and data science projects that demonstrate my expertise in building intelligent solutions
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
