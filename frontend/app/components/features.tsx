import { Clock, MessageSquareText, Quote, ScanSearch, Sparkles } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";

const chapters = [
  {
    number: "01",
    icon: MessageSquareText,
    eyebrow: "Ask",
    title: "Start with the question, not the keyword.",
    description:
      "Ask naturally, even when you cannot remember the lecturer’s exact phrasing. Mementor searches for the explanation that matches what you mean.",
    detail: "Meaning-aware lecture search",
  },
  {
    number: "02",
    icon: Quote,
    eyebrow: "See",
    title: "Bring the important visual into the answer.",
    description:
      "Mementor isolates useful objects—such as a graph, diagram, table, formula, or code block—so an answer can show and explain the visual instead of merely mentioning it.",
    detail: "Object-level visual extraction",
  },
  {
    number: "03",
    icon: Clock,
    eyebrow: "Verify",
    title: "Follow every answer back to the lecture.",
    description:
      "Open the supporting timestamps to hear the original explanation, see what surrounded it, and decide whether the answer holds up.",
    detail: "Replayable, timestamped evidence",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border/70 py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Badge variant="secondary">
            <Sparkles data-icon="inline-start" />
            The grounded loop
          </Badge>
          <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Ask. See what mattered. Check the source.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground text-pretty">
            Mementor connects what the lecturer said to the specific visual
            object they used to explain it.
          </p>

          <div className="mt-8 hidden max-w-sm rounded-2xl bg-foreground p-5 text-background lg:block">
            <div className="flex items-center gap-2 text-xs font-medium text-background/60">
              <ScanSearch className="size-4" />
              One lecture in focus
            </div>
            <p className="mt-4 font-heading text-xl font-medium leading-snug">
              “Where does the lecturer connect model complexity to validation
              error?”
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm text-background/70">
              <span className="rounded-full bg-background/10 px-2.5 py-1 font-mono text-xs">
                18:42
              </span>
              Explanation found in Lecture 08
            </div>
          </div>
        </div>

        <div>
          {chapters.map((chapter, index) => (
            <div key={chapter.number}>
              {index > 0 && <Separator />}
              <article className="grid gap-5 py-9 first:pt-0 sm:grid-cols-[4.5rem_1fr] lg:py-12">
                <div className="flex items-center gap-3 sm:block">
                  <span className="font-mono text-sm text-muted-foreground">
                    {chapter.number}
                  </span>
                  <span className="ml-auto flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:mt-4 sm:ml-0">
                    <chapter.icon className="size-5" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{chapter.eyebrow}</p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                    {chapter.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-7 text-muted-foreground">
                    {chapter.description}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {chapter.detail}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
