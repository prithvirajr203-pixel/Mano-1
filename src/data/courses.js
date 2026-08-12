// Course categories offered by DD ART ACADEMY.
// Add new courses here without touching any component.
// `image` should point to a file placed in /public/images/courses/
const courses = [
  {
    id: 1,
    title: "Kids Courses",
    category: "Kids",
    description:
      "Fun, guided art classes designed to build confidence and creativity in young learners.",
    image: "public/images/courses/1000278345.jpg.jpeg",
    learningMode: ["Online", "Offline"],
  },
  {
    id: 2,
    title: "Certificate Courses",
    category: "Certificate",
    description:
      "Structured learning opportunities with certificate options for dedicated learners.",
    image: "/images/courses/certificate.jpg",
    learningMode: ["Online", "Offline"],
  },
  {
    id: 3,
    title: "Diploma Courses",
    category: "Diploma",
    description:
      "In-depth, structured diploma-level training for students pursuing art seriously.",
    image: "/images/courses/diploma.jpg",
    learningMode: ["Offline"],
  },
  {
    id: 4,
    title: "Drawing Courses",
    category: "Drawing",
    description:
      "Learn drawing fundamentals through guided, practical, step-by-step practice.",
    image: "/images/courses/drawing.jpg",
    learningMode: ["Online", "Offline"],
  },
  {
    id: 5,
    title: "Painting Courses",
    category: "Painting",
    description:
      "Explore acrylic, watercolour, oil and fabric painting with professional guidance.",
    image: "/images/courses/painting.jpg",
    learningMode: ["Online", "Offline"],
  },
  {
    id: 6,
    title: "Fine Arts",
    category: "Fine Arts",
    description:
      "Build a strong foundation across core fine arts techniques and concepts.",
    image: "/images/courses/fine-arts.jpg",
    learningMode: ["Offline"],
  },
  {
    id: 7,
    title: "Art & Craft",
    category: "Art & Craft",
    description:
      "Hands-on art and craft sessions that blend creativity with practical skills.",
    image: "/images/courses/art-craft.jpg",
    learningMode: ["Offline"],
  },
  {
    id: 8,
    title: "Teacher Training",
    category: "Teacher Training",
    description:
      "Professional training for aspiring art teachers, focused on teaching methods.",
    image: "/images/courses/teacher-training.jpg",
    learningMode: ["Offline"],
  },
  {
    id: 9,
    title: "Professional Art Courses",
    category: "Professional",
    description:
      "Advanced, practical training for students building a professional art career.",
    image: "/images/courses/professional.jpg",
    learningMode: ["Online", "Offline"],
  },
];

export default courses;
