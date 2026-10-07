"use client";

import { LectureGrid } from "@/app/components/lecture-grid";
import { Button } from "@/app/components/ui/button";
import { useCollectionVideos } from "@/hooks/use-videos";

export function CollectionVideos({ collectionId }: { collectionId: string }) {
  const { data: videos, isError, refetch } = useCollectionVideos(collectionId);

  if (videos) {
    return (
      <LectureGrid
        videos={videos}
        showCollectionBadges={false}
        emptyTitle="This collection is empty"
        emptyDescription="Add a video to this collection during upload and it will appear here."
      />
    );
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
