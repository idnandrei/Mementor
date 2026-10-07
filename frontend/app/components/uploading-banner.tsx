"use client";

import { Video } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { useVideos } from "@/hooks/use-videos";

export function UploadingBanner() {
  const { data: videos = [] } = useVideos();
  const pendingCount = videos.filter(
    (v) => v.status === "pending_upload",
  ).length;

  if (pendingCount === 0) return null;

  return (
    <section
      id="processing"
      className="relative overflow-hidden rounded-4xl bg-primary px-6 py-6 text-primary-foreground shadow-lg shadow-primary/15 sm:px-8"
    >
      <div className="relative flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/12">
          <Video className="size-5" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-heading text-base font-semibold">
              {pendingCount} {pendingCount === 1 ? "video is" : "videos are"}{" "}
              uploading
            </h2>
            <Badge className="bg-primary-foreground/14 text-primary-foreground">
              In progress
            </Badge>
          </div>
          <p className="mt-1 text-sm text-primary-foreground/70">
            They will become available in your library after their uploads
            finish.
          </p>
        </div>
      </div>
    </section>
  );
}
