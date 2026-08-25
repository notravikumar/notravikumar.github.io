import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";

const getIconSlug = (skill: string) => {
  const map: Record<string, string> = {
    TypeScript: "ts",
    JavaScript: "js",
    React: "react",
    "Next.js": "nextjs",
    "Node.js": "nodejs",
    "Express.js": "express",
    "Tailwind CSS": "tailwind",
    PostgreSQL: "postgres",
    MongoDB: "mongodb",
    Prisma: "prisma",
    Supabase: "supabase",
    Firebase: "firebase",
    Git: "git",
    GitHub: "github",
    Postman: "postman",
    Vercel: "vercel",
    Figma: "figma",
    "C++": "cpp",
    Python: "python",
    "REST APIs": "fastapi",
    "Shadcn UI": "shadcnui",
  };
  return map[skill];
};

const skillCategories: Record<string, string[]> = {
  Frontend: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS", "Shadcn UI", "Figma"],
  Backend: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "Prisma", "Supabase", "Firebase", "REST APIs", "C++", "Python"],
  Tools: ["Git", "GitHub", "Postman", "Vercel"],
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!site.skills.length) return null;

  const categories = ["All", "Frontend", "Backend", "Tools"];

  const filteredSkills = activeCategory === "All"
    ? site.skills
    : site.skills.filter((skill) => skillCategories[activeCategory]?.includes(skill));

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <SectionHeader id="skills" index="04" title="Skills & Technologies" />

      {/* Category Tabs & Micro-hint */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-lg border px-3.5 py-1.5 font-mono text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border-white bg-white text-neutral-950 font-bold shadow-md"
                  : "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-neutral-500 select-none">
          ( click category to filter )
        </span>
      </div>

      <Reveal>
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {filteredSkills.map((skill) => (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={skill}
                className="flex items-center gap-2 cursor-default rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-xs text-neutral-200 transition-all hover:-translate-y-0.5 hover:border-neutral-600 hover:text-white hover:bg-neutral-800/80 shadow-sm"
              >
                {getIconSlug(skill) && (
                  <img
                    src={`https://skillicons.dev/icons?i=${getIconSlug(skill)}`}
                    alt={`${skill} icon`}
                    className="w-4 h-4 object-contain shrink-0"
                  />
                )}
                {skill}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
