"use client";

import { Clock3, LoaderCircle, Play, Search, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { UploadDialog } from "@/app/components/upload-dialog";
import type { VideoResponse } from "@/generated/api/types.gen";

function formatAdded(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function VideoThumbnail({ video }: { video: VideoResponse }) {
  if (video.status === "pending_upload") {
    return (
      <div className="relative flex aspect-video flex-col items-center justify-center overflow-hidden rounded-3xl border bg-muted/55 px-6 text-center shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0,transparent_65%)] opacity-[0.08]" />
        <span className="relative flex size-12 items-center justify-center rounded-2xl bg-background text-primary shadow-sm">
          <LoaderCircle className="size-6 animate-spin" />
        </span>
        <p className="relative mt-4 text-sm font-semibold">Upload in progress</p>
        <p className="relative mt-1 text-xs text-muted-foreground">
          This video will be available when the upload finishes.
        </p>
        <Badge variant="secondary" className="absolute right-3 bottom-3">
          Uploading
        </Badge>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl bg-slate-900 shadow-sm">
      <span className="flex size-12 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg">
        <Play className="ml-0.5 size-5 fill-current" />
      </span>
    </div>
  );
}

export function LectureGrid({
  videos,
  emptyTitle = "No videos yet",
  emptyDescription = "Upload a video to start building your library.",
  showCollectionBadges = true,
  showEmptyUploadButton = false,
}: {
  videos: VideoResponse[];
  emptyTitle?: string;
  emptyDescription?: string;
  showCollectionBadges?: boolean;
  showEmptyUploadButton?: boolean;
}) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return videos;
    return videos.filter((video) =>
      `${video.title} ${video.collection_names.join(" ")}`
        .toLowerCase()
        .includes(value),
    );
  }, [videos, query]);

  if (!videos.length) {
    return (
      <section className="rounded-3xl border border-dashed bg-muted/20 px-6 py-16 text-center">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <UploadCloud className="size-6" />
        </span>
        <h2 className="mt-4 font-heading text-lg font-semibold">{emptyTitle}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          {emptyDescription}
        </p>
        {showEmptyUploadButton && (
          <UploadDialog
            label="Upload video"
            className="mt-6"
          />
        )}
      </section>
    );
  }

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
            placeholder="Search videos…"
            className="bg-muted/60 pl-9"
            aria-label="Search videos"
          />
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((video) => {
            const content = (
              <>
                <VideoThumbnail video={video} />
                <div className="px-1 pt-4">
                  <h2 className="line-clamp-2 font-heading text-base font-semibold leading-snug tracking-tight group-hover:text-primary">
                    {video.title}
                  </h2>
                  {showCollectionBadges && video.collection_names.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {video.collection_names.map((collectionName) => (
                        <Badge key={collectionName} variant="secondary">
                          {collectionName}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="size-3" />
                      {formatAdded(video.created_at)}
                    </span>
                  </div>
                </div>
              </>
            );

            return video.status === "uploaded" ? (
              <Link
                key={video.id}
                href={`/library/${video.id}`}
                className="group min-w-0 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
              >
                {content}
              </Link>
            ) : (
              <article key={video.id} className="group min-w-0">
                {content}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed px-6 py-16 text-center text-sm text-muted-foreground">
          No videos match “{query}”.
        </div>
      )}
    </section>
  );
}
