export type Project = {
  title: string;
  blurb: string;
  story?: string;
  stack: string[];
  year: string;
  links: { live?: string; source?: string };
  featured?: boolean;
  status?: string;
  image?: string;
  categories?: ("Frontend" | "Backend" | "Fullstack")[];
};

export type Job = {
  company: string;
  role: string;
  period: string;
  blurb: string;
  url?: string;
};

export type Post = {
  title: string;
  summary: string;
  date: string;
  url: string;
  readingTime?: string;
};

export const site = {
  name: "Ravi Kumar",
  firstName: "Ravi",
  url: "https://www.notravi.codes",
  quote: {
    text: "Simplicity is prerequisite for reliability.",
    author: "Edsger W. Dijkstra",
  },
  profileImages: [
    "/profile.jpg",
    "/profile2.png",
  ],
  bannerImage: "/images/cover.jpg",
  socialBannerImage: "/social-banner.png",
  initials: "RK",
  role: "Software Engineer",
  location: "Lucknow, India",
  timezone: "Asia/Kolkata",
  email: "staravikr18@gmail.com",
  greeting: "Hey, I'm Ravi",
  tagline: "I am a Software Engineer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter.",
  about: [
    "Hey, I'm Ravi, a software engineer who loves building clean, modern websites and apps where design, functionality, and even the smallest details matter, with a focus on making products that are both practical and visually satisfying.",
    "I spend most of my time in the terminal, the browser, or scribbling on a whiteboard. I lean backend, not because I don't like frontend, but because I enjoy making polished things actually hold up.",
  ],
  tldr: [
    "Building products.",
    "Learning technologies.",
    "Shipping consistently.",
    "Obsessed with clean code.",
  ],
  status: {
    available: true,
    availableText: "open to opportunities",
    nowLearning: " System Design • DSA • DevOps",
    nowBuilding: "DashMaps",
    nowListening: "focus playlists",
  },
  socials: {
    github: "https://github.com/notravikumar",
    twitter: "",
    linkedin: "https://linkedin.com/in/notravikumar",
    email: "mailto:staravikr18@gmail.com",
    resume: "/resume.pdf",
    discord: "https://discord.gg/",
    medium: "https://medium.com/@notravi",
  },
  experience: [
    {
      company: "Independent Developer",
      role: "Web and Android Developer",
      period: "2025 – Present",
      blurb:
        "Building and deploying full-stack web applications, SaaS platforms, and backend systems. Working across APIs, authentication, databases, real-time systems, and modern web infrastructure.",
      url: "",
    },
  ] as Job[],
  projects: [
    {
      title: "DashMaps",
      blurb:
        "A lightweight and fast android app developed using react native.",
      story:
        "",
      stack: ["React Native", "Node.js", "OpenStreetMap", "TypeScript", "Tailwind CSS v4",],
      year: "2026",
      links: {
        live: "",
        source: "https://github.com/notravikumar",
      },
      featured: true,
      image: "/projects/doodledash.png",
      categories: ["Fullstack", "Backend"],
    },
    // {
    //   title: "CodeForge",
    //   blurb:
    //     "A local-first browser-based IDE offering full Monaco editing, in-browser code execution for JS/Python/TS, sandboxed previews, and IndexedDB workspace persistence.",
    //   story:
    //     "Engineered to run entirely client-side without servers. Integrates Monaco Editor models with dynamic Web Workers and Pyodide runtimes. Features resizable panel split layouts, instant sandboxed iframe live-previews for web files, Dexie-powered IndexedDB database state management, workspace-wide text search, and URL-encoded code snippets sharing.",
    //   stack: ["React.js", "Vite", "Zustand", "Monaco Editor", "Pyodide", "Dexie.js"],
    //   year: "2026",
    //   links: {
    //     source: "https://github.com/",
    //   },
    //   featured: true,
    //   status: "In Progress",
    //   image: "/projects/codeforge.png",
    //   categories: ["Frontend"],
    // },
  ] as Project[],
  skills: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Tailwind CSS",
    "Shadcn UI",
    "PostgreSQL",
    "MongoDB",
    "Prisma",
    "Supabase",
    "Firebase",
    "REST APIs",
    "JWT",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
    "Figma",
    "C++",
    "Python",
  ],
  writing: [
    // {
    //   title: "Understanding HTTP: The Backbone of the Web",
    //   summary: "A deep dive into the Hypertext Transfer Protocol, exploring header lifecycle, request methods, statelessness, and connection optimization from HTTP/1.1 to HTTP/3.",
    //   date: "Aug 22, 2026",
    //   readingTime: "15 min read",
    //   url: "https://medium.com/@anuragdotdev/understanding-http-the-backbone-of-the-web-3d2109d0facd",
    // }
  ] as Post[],
  github: {
    username: "notravikumar",
    contributionsLastYear: "10+",
  },
  footerNote: "© 2026 notravikumar.",
} as const;

export type Site = typeof site;
