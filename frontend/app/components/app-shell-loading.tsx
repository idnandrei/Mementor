import { Skeleton } from "@/app/components/ui/skeleton";

export function AppShellLoading() {
  return (
    <div className="grid min-h-dvh grid-cols-[16rem_1fr] bg-background">
      <aside className="hidden border-r bg-sidebar p-4 md:block">
        <Skeleton className="h-10 w-36 bg-muted-foreground/30" />
        <div className="mt-10 space-y-3">
          <Skeleton className="h-9 w-full bg-muted-foreground/30" />
          <Skeleton className="h-9 w-full bg-muted-foreground/30" />
          <Skeleton className="h-9 w-full bg-muted-foreground/30" />
        </div>
      </aside>
      <main className="p-8">
        <Skeleton className="h-9 w-52 bg-muted-foreground/30" />
        <Skeleton className="mt-8 h-48 w-full rounded-4xl bg-muted-foreground/30" />
      </main>
    </div>
  );
}
