import { GraduationCap, Presentation, Users, Video } from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "University lectures",
    description: "Revisit any concept from a semester of recordings instantly.",
  },
  {
    icon: Video,
    title: "Tutorials & courses",
    description: "Skip to the exact step you need in a long tutorial.",
  },
  {
    icon: Users,
    title: "Seminars & talks",
    description: "Search panels and discussions for the points that matter.",
  },
  {
    icon: Presentation,
    title: "Training videos",
    description: "Onboard faster by asking the recording your questions.",
  },
];

export function UseCases() {
  return (
    <section
      id="use-cases"
      className="border-b border-border/70 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Built for every kind of educational content
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
            Students and educators use Lecturoo to make recordings genuinely
            useful.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <useCase.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-card-foreground">
                {useCase.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
