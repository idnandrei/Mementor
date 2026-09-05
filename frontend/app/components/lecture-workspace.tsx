import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import type { VideoResponse } from "@/generated/api/types.gen";

export function LectureWorkspace({ video }: { video: VideoResponse }) {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] flex-1 flex-col">
      <header className="flex min-h-14 items-center gap-3 border-b px-4 sm:px-6">
        <Button
          variant="ghost"
          size="icon-sm"
          nativeButton={false}
          render={<Link href="/library" />}
          aria-label="Back to library"
        >
          <ArrowLeft />
        </Button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold">{video.title}</h1>
          <p className="truncate text-xs text-muted-foreground">
            {video.collection_names.join(" · ") || video.original_filename}
          </p>
        </div>
        <Badge variant="secondary">{video.status.replace("_", " ")}</Badge>
      </header>

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 sm:px-8">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
          <span className="flex size-14 items-center justify-center rounded-full bg-white text-slate-950 shadow-lg">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
        </div>
        <div className="mt-8">
          <h2 className="font-heading text-2xl font-semibold">{video.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {video.original_filename}
          </p>
        </div>
      </div>
    </main>
  );
}
