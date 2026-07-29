import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  MoreHorizontal,
  Play,
  Search,
  Sparkles,
  Upload,
  Video,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const recentLectures = [
  {
    title: "Gradient Descent & Optimization",
    course: "Machine Learning",
    duration: "1h 24m",
    progress: 68,
    lastOpened: "12 min ago",
    accent: "from-cyan-500/25 via-sky-500/10 to-transparent",
  },
  {
    title: "Neural Networks: Backpropagation",
    course: "Deep Learning",
    duration: "58 min",
    progress: 34,
    lastOpened: "Yesterday",
    accent: "from-violet-500/25 via-indigo-500/10 to-transparent",
  },
  {
    title: "Probability Distributions",
    course: "Statistics",
    duration: "1h 08m",
    progress: 91,
    lastOpened: "3 days ago",
    accent: "from-amber-500/25 via-orange-500/10 to-transparent",
  },
];

const allLectures = [
  {
    title: "Introduction to Linear Algebra",
    course: "Mathematics",
    duration: "47 min",
    added: "Jul 27, 2026",
    questions: 8,
  },
  {
    title: "Attention Is All You Need",
    course: "Deep Learning",
    duration: "1h 12m",
    added: "Jul 24, 2026",
    questions: 14,
  },
  {
    title: "Microeconomics: Market Equilibrium",
    course: "Economics",
    duration: "52 min",
    added: "Jul 18, 2026",
    questions: 5,
  },
];

export const metadata = {
  title: "Library | Mementor",
  description: "Your private, searchable lecture library.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">
            <Sparkles data-icon="inline-start" />
            Your learning workspace
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            My library
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Pick up where you left off, or add a new lecture to make every
            concept searchable.
          </p>
        </div>

        <Button size="lg">
          <Upload data-icon="inline-start" />
          Upload lecture
        </Button>
      </section>

      <section
        id="processing"
        className="relative overflow-hidden rounded-4xl bg-primary px-6 py-6 text-primary-foreground shadow-lg shadow-primary/15 sm:px-8"
      >
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,var(--color-primary-foreground)_0,transparent_68%)] opacity-10" />
        <div className="relative grid gap-5 lg:grid-cols-[1fr_18rem] lg:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/12">
              <Video className="size-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-heading text-base font-semibold">
                  Computer Vision — Lecture 08
                </h2>
                <Badge className="bg-primary-foreground/14 text-primary-foreground">
                  Processing
                </Badge>
              </div>
              <p className="mt-1 text-sm text-primary-foreground/70">
                Building the transcript and searchable timeline · about 3
                minutes left
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-xs font-medium">
              <span>Analyzing lecture</span>
              <span>62%</span>
            </div>
            <Progress
              value={62}
              className="[&_[data-slot=progress-indicator]]:bg-primary-foreground [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-primary-foreground/20"
            />
          </div>
        </div>
      </section>

      <section id="recent">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Continue learning
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your recently opened lectures.
            </p>
          </div>
          <Button variant="ghost" size="sm">
            View all
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recentLectures.map((lecture) => (
            <Card
              key={lecture.title}
              className="group transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardContent className="px-4 pt-4">
                <div
                  className={`relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${lecture.accent}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:28px_28px] opacity-35" />
                  <span className="relative flex size-12 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md backdrop-blur">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                  <Badge
                    variant="secondary"
                    className="absolute right-3 bottom-3 bg-background/90 backdrop-blur"
                  >
                    {lecture.duration}
                  </Badge>
                </div>
              </CardContent>

              <CardHeader>
                <CardTitle className="line-clamp-1">{lecture.title}</CardTitle>
                <CardDescription>{lecture.course}</CardDescription>
                <CardAction>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`More options for ${lecture.title}`}
                  >
                    <MoreHorizontal />
                  </Button>
                </CardAction>
              </CardHeader>

              <CardFooter className="flex-col items-stretch gap-2">
                <Progress
                  value={lecture.progress}
                  className="[&_[data-slot=progress-track]]:h-1.5"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{lecture.progress}% watched</span>
                  <span>{lecture.lastOpened}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              All lectures
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and browse everything in your private library.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search lectures and concepts…"
              className="pl-9"
              aria-label="Search lectures and concepts"
            />
          </div>
        </div>

        <Card className="gap-0 py-0">
          {allLectures.map((lecture, index) => (
            <div
              key={lecture.title}
              className="grid gap-4 px-5 py-5 transition-colors hover:bg-muted/45 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-6"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BookOpen className="size-5" />
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-medium">{lecture.title}</h3>
                  {index === 0 && (
                    <Badge variant="outline">
                      <CheckCircle2 data-icon="inline-start" />
                      Ready
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>{lecture.course}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3" />
                    {lecture.duration}
                  </span>
                  <span>Added {lecture.added}</span>
                  <span>{lecture.questions} questions</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                Open lecture
                <ArrowUpRight data-icon="inline-end" />
              </Button>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
