"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/config/site";
import { useTheme } from "./theme-provider";
import { 
  Search, 
  Compass, 
  Globe, 
  Terminal, 
  Copy, 
  Check, 
  Moon, 
  Sun, 
  ExternalLink 
} from "lucide-react";
import { GitHubIcon } from "./icons";

interface PaletteItem {
  id: string;
  category: "navigation" | "projects" | "actions";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export function CommandPalette({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(site.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1000);
  };

  const items: PaletteItem[] = [
    {
      id: "nav-about",
      category: "navigation",
      title: "Jump to About",
      subtitle: "Learn more about who I am",
      icon: <Compass size={16} />,
      action: () => {
        const el = document.getElementById("about");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#about";
        }
        setIsOpen(false);
      },
    },
    {
      id: "nav-experience",
      category: "navigation",
      title: "Jump to Experience",
      subtitle: "My work history and internship timeline",
      icon: <Terminal size={16} />,
      action: () => {
        const el = document.getElementById("work");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#work";
        }
        setIsOpen(false);
      },
    },
    {
      id: "nav-projects",
      category: "navigation",
      title: "Jump to Projects",
      subtitle: "Things I've built recently",
      icon: <Globe size={16} />,
      action: () => {
        const el = document.getElementById("projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#projects";
        }
        setIsOpen(false);
      },
    },
    {
      id: "nav-github",
      category: "navigation",
      title: "Jump to Live Code Heatmap",
      subtitle: "Real-time contribution calendar",
      icon: <GitHubIcon className="h-4 w-4" />,
      action: () => {
        const el = document.getElementById("github");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.location.href = "/#github";
        }
        setIsOpen(false);
      },
    },
    ...site.projects.map((p) => ({
      id: `project-${p.title.toLowerCase()}`,
      category: "projects" as const,
      title: `View ${p.title}`,
      subtitle: p.blurb,
      icon: <Globe size={16} />,
      action: () => {
        const cardId = `project-card-${p.title.toLowerCase()}`;
        const el = document.getElementById(cardId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.classList.add("border-accent", "ring-2", "ring-accent/20");
          setTimeout(() => {
            el.classList.remove("border-accent", "ring-2", "ring-accent/20");
          }, 2000);
        } else {
          window.location.href = `/#${cardId}`;
        }
        setIsOpen(false);
      },
    })),
    {
      id: "action-theme",
      category: "actions",
      title: theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme",
      subtitle: theme === "dark" ? "Go light mode" : "Go dark mode",
      icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
      action: () => {
        toggle();
        setIsOpen(false);
      },
    },
    {
      id: "action-copy-email",
      category: "actions",
      title: copied ? "Copied!" : "Copy Email Address",
      subtitle: site.email,
      icon: copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />,
      action: handleCopyEmail,
    },
  ];

  const filteredItems = items.filter((item) => {
    const term = query.toLowerCase().trim();
    if (!term) return true;
    return (
      item.title.toLowerCase().includes(term) ||
      item.subtitle?.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    const activeEl = listRef.current?.querySelector("[data-active='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-bg/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border bg-surface/90 shadow-2xl backdrop-blur-xl max-h-[60vh] z-10"
          >
            <div className="flex items-center border-b px-4 py-3.5 gap-2.5">
              <Search className="text-muted-foreground shrink-0" size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, sections, or actions..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none"
              />
              <kbd className="hidden sm:inline-block rounded-md border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div 
              ref={listRef} 
              className="flex-1 overflow-y-auto py-2 divide-y divide-border/25"
            >
              {filteredItems.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-xs text-muted-foreground">
                  No commands matched "{query}"
                </div>
              ) : (
                Object.entries(
                  filteredItems.reduce((acc, item) => {
                    if (!acc[item.category]) acc[item.category] = [];
                    acc[item.category].push(item);
                    return acc;
                  }, {} as Record<string, PaletteItem[]>)
                ).map(([category, catItems]) => {
                  return (
                    <div key={category} className="py-2 first:pt-0 last:pb-0">
                      <h4 className="px-4 py-1.5 font-mono text-[9px] uppercase tracking-wider text-faint font-semibold">
                        {category}
                      </h4>
                      <div className="mt-1 flex flex-col px-2 gap-0.5">
                        {catItems.map((item) => {
                          const itemIndex = filteredItems.indexOf(item);
                          const isActive = itemIndex === selectedIndex;

                          return (
                            <button
                              key={item.id}
                              data-active={isActive}
                              onClick={item.action}
                              onMouseEnter={() => setSelectedIndex(itemIndex)}
                              className={`flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-left w-full transition-all duration-150 border border-transparent ${
                                isActive
                                  ? "bg-accent/10 border-accent/25 text-accent shadow-xs"
                                  : "text-foreground hover:bg-fg/[0.03]"
                              }`}
                            >
                              <span className={`shrink-0 ${isActive ? "text-accent" : "text-muted-foreground"}`}>
                                {item.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold leading-tight truncate">
                                  {item.title}
                                </p>
                                {item.subtitle && (
                                  <p className={`text-[10px] leading-tight truncate mt-0.5 ${
                                    isActive ? "text-accent/80" : "text-muted-foreground"
                                  }`}>
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>
                              {isActive && (
                                <ExternalLink size={12} className="opacity-60 text-accent" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t bg-bg/50 px-4 py-2.5 font-mono text-[9px] text-faint">
              <div className="flex gap-2">
                <span>↑↓ to navigate</span>
                <span>•</span>
                <span>Enter to select</span>
              </div>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
