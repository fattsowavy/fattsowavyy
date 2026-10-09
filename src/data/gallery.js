// Drop photos (jpg, png, webp) into src/assets/gallery/. They appear in filename order.
// Optional captions, keyed by filename: { 'kyutech-lab.jpg': 'Kyutech NLP Lab, Iizuka' }
const captions = {};

const modules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
    eager: true,
    import: 'default',
});

export const gallery = Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => {
        const file = path.split('/').pop();
        return { src, file, caption: captions[file] ?? '' };
    });
