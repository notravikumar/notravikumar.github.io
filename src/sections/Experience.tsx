import { motion } from "framer-motion";
import { Shell, SectionHeader } from "@/components/Layout";
import { site } from "@/config/site";
import { ExternalLink } from "lucide-react";

export function Experience() {
  if (!site.experience.length) return null;

  return (
    <div id="experience">
      <SectionHeader title="Experience" />
      <Shell>
        {site.experience.map((job, i) => (
          <motion.div
            key={`${job.company}-${i}`}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`px-6 py-6 transition-colors duration-200 hover:bg-[var(--hover)] sm:px-8 ${
              i > 0 ? "border-t border-[var(--line)]" : ""
            }`}
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-[15.5px] font-semibold text-[var(--fg)] flex items-center gap-2">
                {job.role} <span className="text-[var(--soft)]">·</span>{" "}
                <span className="text-[var(--muted)]">{job.company}</span>
                {job.url && <ExternalLink size={14} className="text-[var(--soft)]" />}
              </h3>
              <span className="font-mono text-[11px] text-[var(--soft)]">{job.period}</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--muted)]">{job.blurb}</p>

            {/* Impact Metric Matrix */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 rounded-lg border border-[var(--line)] bg-[var(--chip)]/60 p-3 text-center divide-x divide-[var(--line)]">
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">5+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">Projects Shipped</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">100%</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">TypeScript</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">10+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">APIs Built</p>
              </div>
              <div>
                <p className="font-bold text-[15px] text-[var(--fg)]">45+</p>
                <p className="font-mono text-[9px] uppercase text-[var(--soft)] mt-0.5">LeetCode Problems</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Shell>
    </div>
  );
}
