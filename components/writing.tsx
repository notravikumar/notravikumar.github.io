import { site } from "@/config/site";
import { Reveal, SectionHeader } from "./reveal";
import { ArrowUpRight } from "./icons";

export function Writing() {
  if (!site.writing.length) return null;

  return (

    <section className="mx-auto w-full max-w-content px-6 py-16">
      <SectionHeader id="writing" index="05" title="writing" />

      <div className="divide-y divide-border">
        {site.writing.map((post, i) => (
          <Reveal key={post.title} delay={i * 0.05}>
            <a
              href={post.url}
              target={post.url.startsWith("#") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-4"
            >
              <div>
                <h3 className="font-medium text-fg transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{post.summary}</p>
              </div>
              <div className="flex flex-none flex-col items-end gap-1">
                <span className="font-mono text-xs text-faint">{post.date}</span>
                {post.readingTime && (
                  <span className="font-mono text-[11px] text-faint">
                    {post.readingTime}
                  </span>
                )}
                <ArrowUpRight className="text-faint opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
