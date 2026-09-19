export const NAME_FIRST = "MUHAMMAD";
export const NAME_LAST = "KHUBAIB";
export const EMAIL = "mkhubaibkhan36@gmail.com";
export const ROLE = "FULL STACK FRONTEND SOFTWARE ENGINEER";

export type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  tags: string[];
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "BAKER",
    category: "EDUCATION · INSTITUTIONAL",
    year: "2025",
    blurb:
      "Institutional site with elegant design, strong visual hierarchy and a fully responsive layout for showcasing programmes and services.",
    tags: ["REACT", "TAILWIND", "RESPONSIVE"],
    image: "/images/work/baker.png",
    href: "https://baker.edu.au/",
  },
  {
    index: "02",
    title: "NEXTU",
    category: "EDUCATION · PLATFORM",
    year: "2025",
    blurb:
      "Education and tech platform with a clean UI, intuitive navigation and a focus on user experience — built with modern frontend tooling.",
    tags: ["NEXT.JS", "TAILWIND", "UI/UX"],
    image: "/images/work/nextu.png",
    href: "https://nextu.se",
  },
  {
    index: "03",
    title: "QUAD TECH DEVELOPERS",
    category: "AGENCY · WEB & MOBILE",
    year: "2025",
    blurb:
      "Agency site showcasing web and mobile development services — modern UI/UX and full stack solutions end to end.",
    tags: ["REACT", "NODE", "FULL STACK"],
    image: "/images/work/quadtech.png",
    href: "https://quadtechdevelopers.netlify.app/",
  },
  {
    index: "04",
    title: "ALPHANEST STUDIOS",
    category: "CREATIVE · STUDIO",
    year: "2024",
    blurb:
      "Creative studio site with modern design, smooth animations and a responsive layout for showcasing digital work and services.",
    tags: ["REACT", "ANIMATION", "TAILWIND"],
    image: "/images/work/alphanest.png",
    href: "https://alphaneststudios.infinityfreeapp.com/?i=1",
  },
  {
    index: "05",
    title: "PERSONAL PORTFOLIO",
    category: "PORTFOLIO · INTERFACE",
    year: "2024",
    blurb:
      "Developer portfolio built with React, Tailwind and Vite — animated throughout, showcasing skills, projects and experience.",
    tags: ["REACT", "VITE", "TAILWIND"],
    image: "/images/work/portfolio.png",
    href: "https://khubaibkamran.vercel.app/",
  },
];

export type Job = {
  period: string;
  start: string;
  role: string;
  company: string;
  mode: string;
  type: string;
  current?: boolean;
  summary: string;
  points: string[];
  stack: string[];
};

export const jobs: Job[] = [
  {
    period: "2025 — PRESENT",
    start: "2025",
    role: "Full Stack Developer",
    company: "Elevatech Solutions",
    mode: "FULL-TIME",
    type: "FULL-TIME",
    current: true,
    summary:
      "Building and shipping full stack products end to end — React front ends on Node services, from schema to the last pixel.",
    points: [
      "Own features from database design through to the shipped interface.",
      "Build reusable React components and keep the UI consistent across the product.",
      "Write and integrate the Node APIs the front end runs on.",
    ],
    stack: ["REACT", "NEXT.JS", "NODE.JS", "MONGODB", "TAILWIND"],
  },
  {
    period: "2024 — 2025",
    start: "2024",
    role: "Frontend & WordPress Developer",
    company: "Apps Nation",
    mode: "FULL-TIME",
    type: "FULL-TIME",
    summary:
      "Split between product front ends and WordPress builds — turning designs into responsive, fast, client-ready sites.",
    points: [
      "Built responsive React interfaces from Figma designs.",
      "Developed and customised WordPress themes for client sites.",
      "Tuned page speed and responsiveness across mobile and desktop.",
    ],
    stack: ["REACT", "JAVASCRIPT", "WORDPRESS", "PHP", "TAILWIND"],
  },
  {
    period: "2021 — 2022",
    start: "2021",
    role: "Frontend Developer",
    company: "Developers Thrill",
    mode: "FULL-TIME",
    type: "FULL-TIME",
    summary:
      "Where it started — turning designs into clean, responsive, accessible interfaces.",
    points: [
      "Hand-built responsive marketing sites and web app screens.",
      "Moved from plain JavaScript into a component-driven React workflow.",
    ],
    stack: ["JAVASCRIPT", "HTML5", "CSS", "REACT"],
  },
];

export type SkillItem = { name: string; pct: number; years: string; cat: Cat };
export type Cat = "FRONTEND" | "BACKEND" | "DATA" | "DEVOPS";
export type SkillGroup = { group: string; cat: Cat; items: SkillItem[] };

export const categories: Cat[] = ["FRONTEND", "BACKEND", "DATA", "DEVOPS"];

export const skills: SkillGroup[] = [
  {
    group: "FRONTEND CORE",
    cat: "FRONTEND",
    items: [
      { name: "REACT", pct: 96, years: "8Y", cat: "FRONTEND" },
      { name: "NEXT.JS", pct: 93, years: "5Y", cat: "FRONTEND" },
      { name: "TYPESCRIPT", pct: 94, years: "6Y", cat: "FRONTEND" },
      { name: "TAILWIND / CSS", pct: 95, years: "9Y", cat: "FRONTEND" },
    ],
  },
  {
    group: "INTERFACE CRAFT",
    cat: "FRONTEND",
    items: [
      { name: "DESIGN SYSTEMS", pct: 92, years: "5Y", cat: "FRONTEND" },
      { name: "ACCESSIBILITY (WCAG)", pct: 88, years: "4Y", cat: "FRONTEND" },
      { name: "ANIMATION / GSAP", pct: 86, years: "4Y", cat: "FRONTEND" },
      { name: "CORE WEB VITALS", pct: 91, years: "5Y", cat: "FRONTEND" },
    ],
  },
  {
    group: "BACKEND & APIS",
    cat: "BACKEND",
    items: [
      { name: "NODE.JS / EXPRESS", pct: 91, years: "7Y", cat: "BACKEND" },
      { name: "REST / GRAPHQL", pct: 89, years: "6Y", cat: "BACKEND" },
      { name: "AUTH & SECURITY", pct: 85, years: "5Y", cat: "BACKEND" },
      { name: "PYTHON", pct: 76, years: "3Y", cat: "BACKEND" },
    ],
  },
  {
    group: "DATABASES",
    cat: "DATA",
    items: [
      { name: "POSTGRESQL", pct: 89, years: "5Y", cat: "DATA" },
      { name: "MONGODB", pct: 86, years: "5Y", cat: "DATA" },
      { name: "MYSQL", pct: 84, years: "6Y", cat: "DATA" },
      { name: "FIREBASE", pct: 83, years: "4Y", cat: "DATA" },
    ],
  },
  {
    group: "SHIPPING & OPS",
    cat: "DEVOPS",
    items: [
      { name: "GIT / CI-CD", pct: 92, years: "8Y", cat: "DEVOPS" },
      { name: "DOCKER", pct: 82, years: "4Y", cat: "DEVOPS" },
      { name: "AWS / VERCEL", pct: 85, years: "5Y", cat: "DEVOPS" },
      { name: "TESTING (JEST/PW)", pct: 87, years: "5Y", cat: "DEVOPS" },
    ],
  },
  {
    group: "WORKFLOW",
    cat: "DEVOPS",
    items: [
      { name: "AGILE / SCRUM", pct: 90, years: "7Y", cat: "DEVOPS" },
      { name: "FIGMA HANDOFF", pct: 93, years: "8Y", cat: "DEVOPS" },
      { name: "CODE REVIEW", pct: 91, years: "6Y", cat: "DEVOPS" },
      { name: "MENTORING", pct: 88, years: "4Y", cat: "DEVOPS" },
    ],
  },
];

export const learning = ["RUST", "WEBGPU", "BUN", "TURBOREPO", "AI SDK"];

export const principles = [
  {
    n: "01",
    title: "THE USER FEELS THE BUILD",
    text: "Nobody reads your bundle report — they feel the 3-second load. I budget performance before I write the first component.",
  },
  {
    n: "02",
    title: "SHIP IT ACCESSIBLE",
    text: "Keyboard paths, contrast, semantics. If it only works with a mouse and perfect eyesight, it isn't finished.",
  },
  {
    n: "03",
    title: "BORING CODE, BOLD UI",
    text: "Clever abstractions age badly. Predictable code with a striking interface is what survives the next developer.",
  },
];

export type Social = {
  key: "github" | "linkedin";
  label: string;
  handle: string;
  href: string;
  brand: string;
  meta: string;
};

export const socials: Social[] = [
  {
    key: "github",
    label: "GitHub",
    handle: "@Khubaibkamran",
    href: "https://github.com/Khubaibkamran",
    brand: "#f2ece6",
    meta: "CODE · PROJECTS",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "muhammad khubaib kamran",
    href: "https://www.linkedin.com/in/muhammad-khubaib-kamran-472069342/",
    brand: "#4a9fe0",
    meta: "PROFILE · LET'S CONNECT",
  },
];

export const marqueeItems = [
  "FULL STACK ENGINEER",
  "WEB APPS",
  "MOBILE APPS",
  "REACT / NEXT.JS",
  "REACT NATIVE",
  "TYPESCRIPT",
  "NODE · POSTGRES",
];
