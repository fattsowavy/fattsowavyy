// Drop photos (jpg, png, webp) into src/assets/gallery/. They appear in filename order.
// Add a title, description and date per photo, keyed by filename. All fields are optional.
const details = {
    '01-kyutech.jpeg': {
        title: 'Exchange at Kyushu Institute of Technology',
        description: 'Iizuka Campus, Japan, during the Graduate Research Program with the NLP Laboratory.',
        date: 'Apr – Jun 2026',
    },
    '02-DSC.jpg': {
        title: 'UMI Developer Student Club',
        description: 'With the Developer Student Club at Muslim University of Indonesia, where I led the machine learning division.',
        date: 'Jan - Jul 2026',
    },
};

const modules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
});

export const gallery = Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
        const file = path.split('/').pop();
        const { title = '', description = '', date = '' } = details[file] ?? {};
        return { src, file, title, description, date };
    });
