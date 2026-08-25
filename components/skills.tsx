"use client";

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
    <section className="mx-auto w-full max-w-content px-6 py-16">
      <SectionHeader id="skills" index="04" title="Skills & Technologies" />

      {/* Category Tabs & Micro-hint */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-md border px-3 py-1 font-mono text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? "border-accent bg-accent text-bg shadow-md"
                  : "border-border/80 bg-surface/30 text-muted hover:border-accent/40 hover:text-fg"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="font-mono text-[10px] text-faint select-none">
          ( click to filter )
        </span>
      </div>

      <Reveal>
        <motion.div layout className="flex flex-wrap gap-2.5">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.span
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={skill}
                className="flex items-center gap-2 cursor-default rounded-full border border-dashed border-border/80 bg-surface/40 px-3.5 py-1.5 font-mono text-xs text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-fg hover:shadow-md hover:bg-surface/80"
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
        </motion.div>
      </Reveal>
    </section>
  );
}
