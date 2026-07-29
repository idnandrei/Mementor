import { Upload, Cpu, MessagesSquare, MousePointerClick } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload your video",
    description:
      "Add a university lecture, tutorial, seminar, or any recorded class to your private library.",
  },
  {
    icon: Cpu,
    title: "We process it",
    description:
      "Lecturoo analyzes the lecture and makes every concept inside it instantly queryable.",
  },
  {
    icon: MessagesSquare,
    title: "Ask your questions",
    description:
      "Open the video and chat with it. Get answers grounded in the lecture, with sources.",
  },
  {
    icon: MousePointerClick,
    title: "Jump to the answer",
    description:
      "Click a timestamp to jump straight to the exact section where it is discussed.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b border-border/70 bg-secondary/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            From upload to answer in four steps
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            No more scrubbing through hours of footage to find one explanation.
          </p>
        </div>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="relative rounded-xl border border-border bg-card p-6"
            >
              <span className="font-mono text-sm font-medium text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <step.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
