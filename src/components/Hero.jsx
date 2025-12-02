const Hero = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-electric-blue-50 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Profile Photo */}
                    <div className="mb-8 animate-fade-in">
                        <div className="relative inline-block">
                            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-electric-blue-500 shadow-xl mx-auto">
                                <img
                                    src="https://via.placeholder.com/200/0050ff/ffffff?text=Photo"
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-electric-blue-500 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up font-poppins">
                        <span className="text-gradient">Your Name</span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto animate-slide-up-delay font-inter">
                        Full Stack Developer | UI/UX Enthusiast | Problem Solver
                    </p>

                    <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-3xl mx-auto animate-slide-up-delay-2">
                        Passionate about creating beautiful, functional, and user-friendly digital experiences.
                        Specialized in modern web technologies and always eager to learn new things.
                    </p>

                    {/* CTA Button */}
                    <div className="animate-slide-up-delay-3">
                        <a
                            href="/cv.pdf"
                            download
                            className="inline-flex items-center px-8 py-4 bg-electric-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-electric-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download CV
                        </a>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="mt-16 animate-bounce">
                        <svg className="w-6 h-6 mx-auto text-electric-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
