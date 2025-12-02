const About = () => {
    const skills = [
        { name: 'React.js', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Node.js', level: 80 },
        { name: 'TypeScript', level: 75 },
        { name: 'Git', level: 85 },
    ];

    const badges = [
        'HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js', 'Next.js',
        'Tailwind CSS', 'Bootstrap', 'Node.js', 'Express', 'MongoDB',
        'PostgreSQL', 'Git', 'Docker', 'AWS', 'Figma'
    ];

    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-electric-blue-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Description */}
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins">
                            Hello! I'm a Full Stack Developer
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            I'm a passionate developer with a strong foundation in both front-end and back-end technologies.
                            I love building web applications that are not only functional but also provide an exceptional user experience.
                        </p>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            With several years of experience in the industry, I've worked on various projects ranging from
                            small business websites to large-scale enterprise applications. I'm always eager to learn new
                            technologies and stay up-to-date with the latest trends in web development.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing to open-source
                            projects, or sharing my knowledge through blog posts and tutorials.
                        </p>

                        {/* Skill Badges */}
                        <div className="mt-8">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Technologies I Work With</h4>
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
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">5+</div>
                                <div className="text-sm text-gray-600">Years Exp.</div>
                            </div>
                            <div className="text-center p-4 bg-electric-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">50+</div>
                                <div className="text-sm text-gray-600">Projects</div>
                            </div>
                            <div className="text-center p-4 bg-electric-blue-50 rounded-lg">
                                <div className="text-3xl font-bold text-electric-blue-600 mb-1">30+</div>
                                <div className="text-sm text-gray-600">Clients</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
