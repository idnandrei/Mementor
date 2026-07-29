import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid flex-1 place-items-center bg-background p-5 text-foreground sm:p-8">
      <section className="w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-xl shadow-foreground/5 sm:p-10">
        <div className="mb-8 text-center">
          <p className="font-heading text-5xl leading-none font-bold tracking-tighter text-foreground sm:text-6xl">
            MEMENTOR
          </p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Keep your learning path organized in one place.
          </p>
        </div>

        {children}
      </section>
    </div>
  );
}
