const Contact = () => {
    const socialLinks = [
        {
            name: 'GitHub',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            ),
            url: 'https://github.com/fattsowavy',
            color: 'hover:text-gray-900'
        },
        {
            name: 'LinkedIn',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
            url: 'https://linkedin.com/in/fatwafajriansyah',
            color: 'hover:text-blue-700'
        },
        {
            name: 'Email',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            url: 'mailto:fatwa.fajri6670@gmail.com',
            color: 'hover:text-red-600'
        },
        {
            name: 'Instagram',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
            url: 'https://instagram.com/fatwafajriansyah',
            color: 'hover:text-pink-600'
        },
    ];

    return (
        <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-electric-blue-50 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
                        Get In <span className="text-gradient">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Interested in collaborating on AI/ML projects or have a data science challenge? Let's connect!
                    </p>
                </div>

                {/* Contact Info Card with 3D Effect */}
                <div className="max-w-3xl mx-auto perspective-1000">
                    <div className="relative group">
                        {/* 3D Card with Glassmorphism */}
                        <div className="relative bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-electric-blue-500/20 hover:shadow-3xl">
                            {/* Gradient Border Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue-200 via-blue-400 to-electric-blue-200 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>

                            {/* Floating Animation Wrapper */}
                            <div className="animate-float">
                                <div className="text-center mb-8">
                                    <div className="inline-block p-4 bg-gradient-to-br from-electric-blue-200 to-electric-blue-700 rounded-2xl shadow-lg mb-4 transform hover:rotate-6 transition-transform duration-300">
                                        <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                        </svg>

                                    </div>
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-electric-blue-200 to-electric-blue-600 group-hover:from-electric-blue-600 group-hover:to-electric-blue-700 bg-clip-text text-transparent mb-3 font-poppins transition-all duration-500">
                                        Let's Connect
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-white leading-relaxed max-w-xl mx-auto transition-colors duration-500">
                                        I'm always open to discussing AI/ML projects, data science opportunities, or collaborating on innovative solutions.
                                    </p>
                                </div>

                                {/* Contact Info Cards */}
                                <div className="grid md:grid-cols-2 gap-4 mb-8">
                                    <div className="group/item bg-gradient-to-br from-electric-blue-200 to-white p-5 rounded-2xl border border-electric-blue-100 hover:border-electric-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-electric-blue-200 to-electric-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Location</p>
                                                <p className="text-gray-800 font-semibold">Makassar, Indonesia</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="group/item bg-gradient-to-br from-blue-200 to-white p-5 rounded-2xl border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-electric-blue-200 to-electric-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover/item:scale-110 transition-transform duration-300">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-xs text-gray-500 font-medium">Email</p>
                                                <p className="text-gray-800 font-semibold truncate">fatwa.fajri6670@gmail.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links with 3D Effect */}
                                <div className="text-center">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-6 font-poppins">Connect With Me</h4>
                                    <div className="flex gap-6 justify-center">
                                        {socialLinks.map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/social relative"
                                                aria-label={social.name}
                                            >
                                                {/* 3D Button Effect */}
                                                <div className="relative w-16 h-16 transform transition-all duration-300 hover:-translate-y-2 hover:scale-110">
                                                    {/* Shadow layers for 3D effect */}
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl transform translate-y-2 group-hover/social:translate-y-3 transition-transform duration-300"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl transform translate-y-1 group-hover/social:translate-y-2 transition-transform duration-300"></div>

                                                    {/* Main button */}
                                                    <div className={`relative w-full h-full flex items-center justify-center bg-white rounded-2xl shadow-lg text-gray-700 ${social.color} transition-all duration-300 border-2 border-white group-hover/social:border-electric-blue-200`}>
                                                        <div className="transform group-hover/social:scale-110 transition-transform duration-300">
                                                            {social.icon}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Tooltip */}
                                                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                                    {social.name}
                                                </span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600">
                    © {new Date().getFullYear()} Muh Fatwah Fajriansyah M. Built with using React & Tailwind CSS
                </p>
            </div>
        </section>
    );
};

export default Contact;
