import { site } from "@/config/site";
import { LiveClock } from "./live-clock";
import { Socials } from "./socials";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto w-full max-w-content scroll-mt-24 px-6 py-20"
    >
      <div className="rounded-3xl border bg-surface/30 p-8 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-widest text-accent">
          contact
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Let&apos;s build something.
        </h2>
        <p className="mt-3 max-w-md text-muted">
          Got an idea, a role, or just want to say hi? My inbox is always open.
        </p>

        <a
          href={site.socials.email || `mailto:${site.email}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-transform hover:scale-[1.03]"
        >
          {site.email}
        </a>

        <div className="mt-8">
          <Socials />
        </div>
      </div>


      <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.footerNote}
        </p>
        <LiveClock />
      </div>
    </footer>
  );
}
