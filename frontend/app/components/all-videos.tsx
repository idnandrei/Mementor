"use client";

import { LectureGrid } from "@/app/components/lecture-grid";
import { Button } from "@/app/components/ui/button";
import { useVideos } from "@/hooks/use-videos";

export function AllVideos({ limit }: { limit?: number }) {
  const { data: videos, isError, refetch } = useVideos();

  if (videos) {
    return <LectureGrid videos={limit ? videos.slice(0, limit) : videos} />;
  }
  if (isError) {
    return (
      <Button variant="outline" onClick={() => refetch()}>
        Couldn&apos;t load videos. Retry
      </Button>
    );
  }
  return <p className="text-sm text-muted-foreground">Loading videos…</p>;
}
