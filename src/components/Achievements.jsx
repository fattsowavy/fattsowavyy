import certif1 from '../assets/certif/certif1.png';
import certif2 from '../assets/certif/certif2.png';

const Achievements = () => {
    const certificates = [
        {
            title: 'Learn Machine Learning for Beginners',
            issuer: 'Dicoding Indonesia',
            date: '2025',
            description: 'Completed comprehensive ML course covering supervised learning and best practices.',
            image: certif1,
            credentialUrl: 'https://www.dicoding.com/certificates/N9ZO2O6J6PG5'
        },
        {
            title: 'Fundamentals of Deep Learning ',
            issuer: 'Nvidia',
            date: '2025',
            description: 'Mastered deep learning fundamentals, CNNs and sequence models.',
            image: certif2,
            credentialUrl: 'https://learn.nvidia.com/certificates?id=xHDpNa87QR-budXTZ7L97w'
        },
        // {
        //     title: 'TensorFlow Developer Certificate',
        //     issuer: 'Google',
        //     date: '2023',
        //     description: 'Certified in building and deploying ML models using TensorFlow.',
        //     image: 'https://via.placeholder.com/400x300/40a9ff/ffffff?text=TF+Certificate',
        //     credentialUrl: '#'
        // },
    ];

    const research = [
        {
            title: 'Sentiment Analysis on Social Media Using BERT',
            authors: 'Your Name, et al.',
            venue: 'International Conference on AI and Data Science',
            year: '202',
            description: 'Novel approach to sentiment analysis using transformer models with 95% accuracy on Indonesian text.',
            link: '#',
            tags: ['NLP', 'Deep Learning', 'BERT']
        },
        // {
        //     title: 'Predictive Modeling for Customer Churn',
        //     authors: 'Your Name, Co-Author',
        //     venue: 'Journal of Machine Learning Research',
        //     year: '2023',
        //     description: 'Ensemble learning approach for predicting customer churn with improved precision.',
        //     link: '#',
        //     tags: ['Machine Learning', 'Ensemble Methods']
        // },
        // {
        //     title: 'Image Classification Using Transfer Learning',
        //     authors: 'Your Name',
        //     venue: 'IEEE Conference on Computer Vision',
        //     year: '2023',
        //     description: 'Comparative study of transfer learning techniques for medical image classification.',
        //     link: '#',
        //     tags: ['Computer Vision', 'Transfer Learning']
        // },
    ];

    return (
        <section id="achievements" className="py-20 bg-gradient-to-br from-electric-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 font-poppins">
                        My <span className="text-electric-blue-600">Achievements</span>
                    </h2>
                    <div className="w-20 h-1 bg-electric-blue-600 mx-auto rounded-full"></div>
                    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                        Certifications and research contributions in AI/ML and Data Science
                    </p>
                </div>

                {/* Certificates Section */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
                        Certifications
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {certificates.map((cert, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Certificate Image */}
                                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-electric-blue-100 to-electric-blue-50">
                                    <img
                                        src={cert.image}
                                        alt={cert.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Certificate Content */}
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                                        {cert.title}
                                    </h4>
                                    <p className="text-electric-blue-600 font-semibold mb-2">
                                        {cert.issuer}
                                    </p>
                                    <p className="text-sm text-gray-500 mb-3">
                                        {cert.date}
                                    </p>
                                    <p className="text-gray-600 text-sm mb-4">
                                        {cert.description}
                                    </p>
                                    <a
                                        href={cert.credentialUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-electric-blue-600 hover:text-electric-blue-700 font-medium text-sm"
                                    >
                                        View Credential
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Research/Publications Section */}
                <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-8 font-poppins">
                        Research & Publications
                    </h3>
                    <div className="space-y-6">
                        {research.map((paper, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                                    <div className="flex-1">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                                            {paper.title}
                                        </h4>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-semibold">Authors:</span> {paper.authors}
                                        </p>
                                        <p className="text-electric-blue-600 font-medium mb-3">
                                            {paper.venue} • {paper.year}
                                        </p>
                                        <p className="text-gray-600 mb-4">
                                            {paper.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {paper.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-3 py-1 bg-electric-blue-50 text-electric-blue-700 text-xs font-medium rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={paper.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 md:mt-0 md:ml-6 inline-flex items-center px-4 py-2 bg-electric-blue-600 text-white rounded-lg hover:bg-electric-blue-700 transition-colors duration-300 text-sm font-medium whitespace-nowrap"
                                    >
                                        Read Paper
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
