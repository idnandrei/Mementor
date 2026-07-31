"use client";

import { Clock3, MessageCircle, Play, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import type { Lecture } from "@/lib/demo-library";

export function LectureGrid({ lectures }: { lectures: Lecture[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return lectures;
    return lectures.filter((lecture) =>
      `${lecture.title} ${lecture.course}`.toLowerCase().includes(value),
    );
  }, [lectures, query]);

  return (
    <section>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "video" : "videos"}
        </p>
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search videos and concepts…"
            className="bg-muted/60 pl-9"
            aria-label="Search videos and concepts"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((lecture) => (
            <Link
              key={lecture.id}
              href={`/library/${lecture.id}`}
              className="group min-w-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
            >
              <div className={`relative aspect-video overflow-hidden rounded-3xl bg-gradient-to-br ${lecture.accent} shadow-sm transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.35),transparent_28%),linear-gradient(120deg,transparent_45%,rgba(255,255,255,.12)_45%,rgba(255,255,255,.12)_46%,transparent_46%)]" />
                <div className="absolute top-4 left-4 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
                  Mementor · {lecture.episode}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg transition-transform group-hover:scale-105">
                    <Play className="ml-0.5 size-5 fill-current" />
                  </span>
                </div>
                <Badge className="absolute right-3 bottom-3 border-0 bg-black/55 text-white backdrop-blur">
                  {lecture.duration}
                </Badge>
              </div>

              <div className="px-1 pt-4">
                <h2 className="line-clamp-2 font-heading text-base font-semibold leading-snug tracking-tight group-hover:text-primary">
                  {lecture.title}
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{lecture.course}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3" />{lecture.added}</span>
                  <span className="inline-flex items-center gap-1"><MessageCircle className="size-3" />{lecture.questions} questions</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed px-6 py-16 text-center text-sm text-muted-foreground">
          No videos match “{query}”.
        </div>
      )}
    </section>
  );
}
