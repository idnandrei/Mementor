import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";

const timestamps = [
  { time: "04:12", label: "Definition of gradient descent" },
  { time: "11:38", label: "Learning rate trade-offs" },
  { time: "23:50", label: "Worked numerical example" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/70">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Answers grounded in your lectures
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Turn lecture videos into searchable answers
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Upload any lecture, tutorial, or recorded class. Lecturoo analyzes
            it so you can ask questions and get answers grounded in the
            video&mdash;complete with timestamps that jump you straight to the
            moment that matters.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/register" />}
            >
              Start for free
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              <Play />
              See how it works
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required &middot; Your library stays private
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative">
      <div className="rounded-2xl border border-border bg-card p-3 shadow-xl shadow-foreground/5">
        {/* Video area */}
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-foreground/90">
          <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
          <div className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground">
            Lecture 07 — Optimization
          </div>
          <div className="absolute right-3 bottom-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            32:41
          </div>
        </div>

        {/* Chat answer */}
        <div className="space-y-3 p-3">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
            How does the learning rate affect training?
          </div>
          <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground">
            A higher learning rate speeds up training but can overshoot the
            minimum, while a smaller one is more stable but slower. The lecturer
            covers this around the points below.
          </div>

          <div className="space-y-1.5">
            {timestamps.map((t) => (
              <button
                key={t.time}
                className="flex w-full items-center gap-3 rounded-lg border border-border bg-background px-3 py-2 text-left transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <span className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary">
                  <Play className="size-3 fill-current" />
                  {t.time}
                </span>
                <span className="truncate text-sm text-foreground">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
