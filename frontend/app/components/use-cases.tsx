import { GraduationCap, Presentation, Users, Video } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";

const useCases = [
  {
    icon: GraduationCap,
    title: "Review a hard concept",
    context: "University lectures",
    description: "Return to the explanation you missed when it was first taught.",
  },
  {
    icon: Video,
    title: "Find one step again",
    context: "Tutorials and courses",
    description: "Locate the exact demonstration without replaying every chapter.",
  },
  {
    icon: Users,
    title: "Unpack a discussion",
    context: "Seminars and talks",
    description: "Pull a specific argument from a long session or panel.",
  },
  {
    icon: Presentation,
    title: "Check what was taught",
    context: "Training recordings",
    description: "Get a sourced answer instead of relying on notes or memory.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="border-b border-border/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <Badge variant="secondary">Made for the rewind moment</Badge>
            <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              You know it was covered. You just need to find where.
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-muted-foreground">
            Start with your question instead of scanning the timeline—whether
            you are studying, following a tutorial, or revisiting training.
          </p>
        </div>

        <div className="mt-12 border-y border-border">
          {useCases.map((useCase, index) => (
            <article
              key={useCase.title}
              className="group grid gap-4 border-b border-border py-6 last:border-b-0 sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-center sm:gap-6"
            >
              <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                <useCase.icon className="size-5" />
              </span>
              <div>
                <p className="font-heading text-lg font-semibold">{useCase.title}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
                  {useCase.context}
                </p>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {useCase.description}
              </p>
              <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                0{index + 1}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
