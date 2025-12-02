const About = () => {
    const skills = [
        { name: 'Python', level: 95 },
        { name: 'Machine Learning', level: 90 },
        { name: 'Deep Learning', level: 85 },
        { name: 'Data Analysis', level: 90 },
        { name: 'TensorFlow/PyTorch', level: 88 },
        { name: 'SQL & Databases', level: 87 },
    ];

    const badges = [
        'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas',
        'NumPy', 'Keras', 'XGBoost', 'SQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Jupyter', 'Matplotlib', 'Seaborn'
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
                        About <span className="text-electric-blue-600">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-electric-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Description */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins">
                            Hello! I'm a Data Scientist & AI/ML Engineer
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            I'm a passionate data scientist with expertise in machine learning, deep learning, and advanced analytics.
                            I specialize in building intelligent systems that extract meaningful insights from complex datasets and create predictive models that drive business value.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            With extensive experience in the field, I've worked on diverse projects ranging from
                            predictive modeling and natural language processing to computer vision and recommendation systems. I'm always eager to explore cutting-edge AI technologies and stay current with the latest research in machine learning.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            When I'm not training models, you can find me exploring new ML frameworks, contributing to data science communities,
                            or sharing insights through technical articles and research papers.
                        </p>

                        {/* Skill Badges */}
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">AI/ML Technologies & Tools</h4>
                            <div className="flex flex-wrap gap-2">
                                {badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-electric-blue-50 text-electric-blue-700 rounded-full text-sm font-medium hover:bg-electric-blue-100 transition-colors duration-300 cursor-default"
                                    >
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills Progress Bars */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-6 font-poppins">
                            My Skills
                        </h3>
                        <div className="space-y-6">
                            {skills.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-700 font-medium">{skill.name}</span>
                                        <span className="text-electric-blue-600 font-semibold">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-electric-blue-500 to-electric-blue-700 h-full rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-10">
                            <div className="text-center p-4 bg-electric-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">3+</div>
                                <div className="text-sm text-gray-600">Years Exp.</div>
                            </div>
                            <div className="text-center p-4 bg-electric-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">25+</div>
                                <div className="text-sm text-gray-600">ML Models</div>
                            </div>
                            <div className="text-center p-4 bg-electric-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">15+</div>
                                <div className="text-sm text-gray-600">Projects</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
