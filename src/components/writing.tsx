import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";
import { ArrowUpRight } from "./icons";

export function Writing() {
  if (!site.writing.length) return null;

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <SectionHeader id="writing" index="05" title="writing & thoughts" />

      <div className="space-y-4">
        {site.writing.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.05}>
            <a
              href={post.url}
              target={post.url.startsWith("#") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70 backdrop-blur-md"
            >
              <div>
                <h3 className="font-semibold text-lg text-neutral-100 transition-colors group-hover:text-white flex items-center gap-2">
                  {post.title}
                  <ArrowUpRight className="text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed">{post.summary}</p>
              </div>
              <div className="flex sm:flex-col items-start sm:items-end justify-between gap-1 flex-none font-mono text-xs text-neutral-400 border-t sm:border-t-0 border-neutral-800 pt-3 sm:pt-0">
                <span>{post.date}</span>
                {post.readingTime && (
                  <span className="text-neutral-500">
                    {post.readingTime}
                  </span>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
