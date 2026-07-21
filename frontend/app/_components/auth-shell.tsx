import type { ReactNode } from "react";

type AuthShellProps = {
  children: ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-5 text-foreground sm:p-8">
      <section className="w-full max-w-md rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10">
        <header className="mb-8 text-center">
          <p className="font-heading text-5xl leading-none font-bold tracking-tighter text-foreground sm:text-6xl">
            MEMENTOR
          </p>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Keep your learning path organized in one place.
          </p>
        </header>

        {children}
      </section>
    </main>
  );
}
