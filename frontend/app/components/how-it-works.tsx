import { Cpu, MessagesSquare, MousePointerClick, Upload } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Bring the lecture",
    description: "Upload the recording you want to understand or revisit.",
  },
  {
    icon: Cpu,
    title: "Mementor extracts it",
    description: "Speech and useful visual objects are mapped to the same timeline.",
  },
  {
    icon: MessagesSquare,
    title: "Ask what you mean",
    description: "Use a natural question—not a perfectly remembered phrase.",
  },
  {
    icon: MousePointerClick,
    title: "Read, then verify",
    description: "Open the cited moments and watch the evidence in context.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border/70 bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Badge variant="secondary">How it works</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              From a long recording to one clear answer
            </h2>
          </div>
          <p className="max-w-sm text-base leading-7 text-muted-foreground">
            Mementor does the searching. You keep the source, the context, and
            the final say.
          </p>
        </div>

        <Card className="mt-12 overflow-hidden rounded-3xl p-0">
          <CardContent className="p-0">
            <ol className="grid md:grid-cols-4">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="group relative border-b border-border p-6 last:border-b-0 md:min-h-64 md:border-r md:border-b-0 md:last:border-r-0 lg:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <step.icon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-10 font-heading text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                  {index < steps.length - 1 && (
                    <span className="absolute top-1/2 -right-2.5 z-10 hidden size-5 -translate-y-1/2 items-center justify-center rounded-full border bg-card text-[10px] text-muted-foreground md:flex">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
