import {
  Clock,
  Library,
  MessageSquareText,
  Quote,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Ask anything, per video",
    description:
      "Every video gets its own chat. Ask follow-up questions and keep a full conversation history tied to each lecture.",
  },
  {
    icon: Quote,
    title: "Grounded answers",
    description:
      "Responses are drawn from the actual lecture content, not generic AI guesses, so you can trust what you learn.",
  },
  {
    icon: Clock,
    title: "Jump to the moment",
    description:
      "Every answer comes with timestamps. Click to jump straight to where the topic is discussed in the video.",
  },
  {
    icon: Library,
    title: "Your private library",
    description:
      "Upload and organize lectures, tutorials, seminars, and recorded classes in a workspace that is yours alone.",
  },
  {
    icon: Search,
    title: "Search across content",
    description:
      "Stop scrubbing through hours of footage. Find the exact concept across a single video in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Your uploads and conversations stay in your workspace and are never shared without your permission.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-b border-border/70 py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            A study assistant that actually knows the lecture
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Lecturoo combines a video library, an AI study assistant, and a
            lecture search tool into one focused workspace.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
