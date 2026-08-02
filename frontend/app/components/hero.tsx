import Link from "next/link";
import { ArrowRight, ChartNoAxesCombined, Play, Sparkles } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] overflow-hidden border-b border-border/70">
      <div className="mx-auto grid w-full max-w-6xl flex-1 content-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-start lg:py-14">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            Your lecture, now answerable
          </span>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Ask the lecture. Find the moment.
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Upload a lecture and ask what you actually want to know. Mementor
            finds the explanation in what was said and shown, brings the
            relevant visual into the answer, and takes you back to the exact
            moment that supports it.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/register" />}
            >
              Make a lecture searchable
              <ArrowRight />
            </Button>
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              <Play />
              See the four steps
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            No credit card required &middot; Your lectures stay in your workspace
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
        <div className="relative flex aspect-[16/7] items-center justify-center overflow-hidden rounded-xl bg-foreground/90">
          <span className="flex size-14 items-center justify-center rounded-full bg-background/90 text-foreground">
            <Play className="size-6 translate-x-0.5 fill-current" />
          </span>
          <div className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground">
            Lecture 08 — Generalization
          </div>
          <div className="absolute right-3 bottom-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            54:18
          </div>
        </div>

        {/* Chat answer */}
        <div className="space-y-3 p-3">
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
            Why does the model perform worse on new data?
          </div>
          <div className="w-fit max-w-[90%] rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm text-foreground">
            The lecturer describes this as overfitting: the model learns the
            training examples too closely, including their noise, so it does
            not generalize well. The extracted graph below shows the gap the
            lecturer is referring to.
          </div>

          <div className="rounded-xl border border-border bg-background p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-xs font-medium">
                <ChartNoAxesCombined className="size-3.5 text-primary" />
                Visual extracted from the lecture
              </span>
              <span className="font-mono text-xs text-primary">20:16</span>
            </div>
            <div className="relative mt-3 h-16 overflow-hidden rounded-lg bg-muted/60 px-3 pt-3">
              <div className="absolute inset-x-3 bottom-3 h-px bg-border" />
              <div className="absolute top-3 bottom-3 left-3 w-px bg-border" />
              <svg
                viewBox="0 0 320 72"
                className="relative h-full w-full"
                role="img"
                aria-label="Training error decreases while validation error rises"
              >
                <path d="M8 13 C70 30, 130 48, 300 60" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary" />
                <path d="M8 58 C90 42, 145 27, 205 31 C255 35, 280 46, 300 56" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-foreground/60" />
              </svg>
            </div>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              Training error keeps falling, while validation error turns upward—evidence that the model is no longer generalizing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
