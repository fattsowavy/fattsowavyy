// Drop photos (jpg, png, webp) into src/assets/gallery/. They appear in filename order.
// Add a title, description and date per photo, keyed by filename. All fields are optional.
// Photos are shown cropped to 4:3. If the crop cuts off the subject, set `position` to move it:
// "<x> <y>" in % like CSS object-position, e.g. position: "30% 50%" keeps the left-centre in frame
// (0% = left / top edge, 100% = right / bottom edge, default "50% 50%").
const details = {
  "01-kyutech.jpeg": {
    title: "Exchange at Kyushu Institute of Technology",
    description:
      "Iizuka Campus, Japan, during the Graduate Research Program with the NLP Laboratory.",
    date: "Apr – Jun 2026",
  },
  "02-DSC.jpg": {
    title: "UMI Developer Student Club",
    description:
      "With the Developer Student Club at Muslim University of Indonesia, where I led the machine learning division.",
    date: "Jan - Jul 2026",
  },
  "03-iclabs.jpg": {
    title: "Computer Laboratory Assistant",
    description:
      'As a lab assistant I teach hands-on programming classes and handle IT support, here presenting "Speech Recognition" to students.',
    date: "Jan 2025 - Present",
  },
};

// lets "03-photo.jpg" in `details` match a file saved as "03-photo.JPG"
const detailsByLowerName = Object.fromEntries(
  Object.entries(details).map(([name, value]) => [name.toLowerCase(), value]),
);

// Upper-case extensions too (cameras and phones often save .JPG)
const modules = import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

export const shotNo = (i) => String(i + 1).padStart(2, "0");

export const gallery = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => {
    const file = path.split("/").pop();
    const {
      title = "",
      description = "",
      date = "",
      position = "50% 50%",
    } = details[file] ?? detailsByLowerName[file.toLowerCase()] ?? {};
    return { src, file, title, description, date, position };
  });
