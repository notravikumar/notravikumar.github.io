"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Search } from "lucide-react";
import { site } from "@/config/site";
import { useTheme } from "./theme-provider";
import { CommandPalette } from "./command-palette";

const links = [
  { href: "#about", label: "about" },
  { href: "#work", label: "work" },
  { href: "#projects", label: "projects" },
  { href: "#contact", label: "contact" },
];

function SunMoon({ theme }: { theme: string }) {
  return theme === "dark" ? (
    <Sun size={16} aria-hidden />
  ) : (
    <Moon size={16} aria-hidden />
  );
}

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleProfileChange = (e: any) => setImgIndex(e.detail);
    window.addEventListener("profileImageChanged", handleProfileChange);
    return () => window.removeEventListener("profileImageChanged", handleProfileChange);
  }, []);

  // Listen for Ctrl+K / Cmd+K keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-3xl items-center justify-between rounded-full px-4 py-2 transition-all duration-300 ${
          scrolled
            ? "border bg-surface/70 backdrop-blur-xl shadow-lg shadow-black/5"
            : "border border-transparent"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight"
        >
          <img 
            src={site.profileImages[imgIndex]} 
            alt={site.initials} 
            className="h-7 w-7 rounded-full object-cover ring-1 ring-accent/30 transition-transform group-hover:rotate-12" 
          />
          <span className="hidden sm:inline">{site.name.split(" ")[0].toLowerCase()}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-fg/5 hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            aria-label="Open Command Palette"
            onClick={() => setIsPaletteOpen(true)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
            title="Search / Shortcuts (Ctrl+K)"
          >
            <Search size={16} aria-hidden />
          </button>
          
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg"
          >
            <SunMoon theme={theme} />
          </button>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition-colors hover:bg-fg/5 hover:text-fg md:hidden"
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </motion.nav>

      {/* Global Command Palette */}
      <CommandPalette isOpen={isPaletteOpen} setIsOpen={setIsPaletteOpen} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-20 w-[calc(100%-2rem)] max-w-3xl rounded-2xl border bg-surface/90 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
