import { SiteLogo } from "@/app/components/logo";

const columns = [
  {
    heading: "Product",
    links: ["Features", "How it works", "Use cases", "Pricing"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Contact"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              The AI study assistant that turns lecture videos into searchable,
              answerable knowledge.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border/70 pt-6 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Lecturoo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
