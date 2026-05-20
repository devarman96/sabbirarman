export const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Tech Stack", href: "#tech" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Recognition", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const CV_URL = "/Sabbir_Arman_CV.pdf";

export const TECH_STACK = {
  frontend: [
    { name: "React JS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" },
  ],
  backend: [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  ],
  others: [
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "SEO", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
    { name: "Data Analysis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  ]
};

export const EXPERIENCE = [
  {
    company: "Samsung R&D",
    role: "Software Engineer",
    duration: "09/2024 - Present",
    description: "Specializing in research and development of high-performance software systems. Contributing to innovative mobile ecosystem features and large-scale application architecture within Samsung's global technology framework.",
    icon: "briefcase",
  },
  {
    company: "TechNexus Bangladesh (Remote)",
    role: "Full-Stack Developer Intern",
    duration: "2023 - 2024",
    description: "Developed and maintained responsive web applications using React and Node.js. Optimized database queries in PostgreSQL resulting in 30% faster load times for dashboard analytics.",
    icon: "code",
  },
];

export const EDUCATION = [
  {
    institution: "Northern University Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    duration: "2024 - Present",
    description: "Currently pursuing advanced studies in algorithms, database management systems, and software engineering principles to complement technical expertise.",
    icon: "graduation",
  },
  {
    institution: "Jashore Polytechnic Institute",
    degree: "Diploma Engineering in Computer Technology",
    duration: "2020 - 2024",
    description: "Completed 4-year diploma program with a GPA of 3.85/4.00. Specialized in networking, system administration, and software development fundamentals.",
    icon: "school",
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "E-commerce Website",
    category: "Web Development",
    description: "A modern web application featuring email confirmation, secure payment processing, and a comprehensive product browsing system. Focused on providing a seamless shopping experience.",
    tech: ["Python", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    image: "https://i.postimg.cc/HnkCfGbL/Ecommerce.webp",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 2,
    title: "Quizzes Application",
    category: "EduTech",
    description: "An interactive learning platform with 10 default quizzes, customizable options for users, and secure authentication. Features progress tracking and profile-based results display.",
    tech: ["JavaScript", "HTML5", "CSS3", "Firebase"],
    image: "https://i.postimg.cc/FFLRFhQW/Quize-Application.webp",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 3,
    title: "Portfolio 3D",
    category: "Creative",
    description: "A high-end professional portfolio with 3D interactive elements using Three.js and Framer Motion. Features custom shaders and high-performance animations.",
    tech: ["React", "Three.js", "Framer Motion", "Tailwind"],
    image: "https://i.postimg.cc/prLtgNKX/3d-portfolio.webp",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 4,
    title: "Finance Tracker",
    category: "FinTech",
    description: "Real-time expense tracking application with detailed analytics dashboards. Supports multiple currencies and automated reports.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    image: "https://i.postimg.cc/05wQ59qX/Finance-Tracker.webp",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 5,
    title: "Social Connect",
    category: "Web Development",
    description: "A social networking platform focused on privacy and real-time communication. Includes encrypted messaging and file sharing capabilities.",
    tech: ["Next.js", "Supabase", "Tailwind", "WebRTC"],
    image: "https://i.postimg.cc/c1nH1dND/Social-Connect.webp",
    liveLink: "#",
    githubLink: "#"
  },
  {
    id: 6,
    title: "Cloud System",
    category: "Entertainment",
    description: "A video streaming service with adaptive bitrate streaming and personalized recommendations using machine learning.",
    tech: ["React", "AWS S3", "Node.js", "Redis"],
    image: "https://i.postimg.cc/90Qjv3yX/cloud-system.webp",
    liveLink: "#",
    githubLink: "#"
  }
];

