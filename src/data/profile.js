export const profile = {
    name: 'Muh Fatwah Fajriansyah M',
    tagline: 'Informatics Engineering Student · Researcher & Developer',
    location: 'Makassar, Indonesia',
    summary:
        'Informatics Engineering student with research experience in natural language processing and speech recognition, plus hands-on work building web and mobile applications.',
    bio: [
        "I'm an Informatics Engineering student at Muslim University of Indonesia. My research is in natural language processing and automatic speech recognition, and I build applications with Python, Laravel, and Flutter.",
        'In 2026 I joined the NLP Laboratory at Kyushu Institute of Technology in Japan as an exchange research student, working on speech recognition for regional dialects with limited data. Back home, I assist in a computer laboratory and led the machine learning division of the Developer Student Club.',
    ],
    email: 'fatwaaf66@gmail.com',
    links: [
        { name: 'LinkedIn', url: 'https://linkedin.com/in/fatwafajriansyah' },
        { name: 'GitHub', url: 'https://github.com/fattsowavy' },
        { name: 'Instagram', url: 'https://instagram.com/fatwafajriansyah' },
    ],
    cv: `${import.meta.env.BASE_URL}cv.pdf`,
    facts: [
        { value: '3.87', label: 'GPA so far' },
        { value: '1', label: 'IEEE publication' },
        { value: '3', label: 'Roles & positions' },
        { value: '4', label: 'Certifications' },
    ],
};

export const education = [
    {
        school: 'Muslim University of Indonesia',
        degree: 'Bachelor of Information Engineering',
        period: '2023 – Present',
        note: 'GPA 3.87 (current)',
    },
];

export const skillGroups = [
    { title: 'Languages & frameworks', items: ['Python', 'PHP (Laravel)', 'Dart (Flutter)', 'C++'] },
    { title: 'Research & ML', items: ['PyTorch', 'HuggingFace Transformers', 'NLP', 'Speech recognition'] },
    { title: 'Soft skills', items: ['Research', 'Problem-solving', 'Technical writing', 'Team collaboration'] },
    { title: 'Spoken languages', items: ['Indonesian', 'English', 'Japanese (basic)'] },
];
