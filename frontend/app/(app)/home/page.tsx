import { Sparkles, Video } from "lucide-react";

import { LectureGrid } from "@/app/components/lecture-grid";
import { Badge } from "@/app/components/ui/badge";
import { getVideos } from "@/generated/api";
import { createServerApiClient } from "@/lib/api/server";

export const metadata = {
  title: "Home | Mementor",
  description: "Your learning workspace.",
};

export default async function HomePage() {
  const client = await createServerApiClient();
  const { data: videos } = await getVideos({ client, throwOnError: true });
  const pendingCount = videos.filter(
    (video) => video.status === "pending_upload",
  ).length;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section>
        <div>
          <Badge variant="secondary" className="mb-3">
            <Sparkles data-icon="inline-start" />
            Your learning workspace
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Home
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Add a lecture to make every concept searchable.
          </p>
        </div>
      </section>

      {pendingCount > 0 && (
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
                  {pendingCount} {pendingCount === 1 ? "video is" : "videos are"} uploading
                </h2>
                <Badge className="bg-primary-foreground/14 text-primary-foreground">
                  In progress
                </Badge>
              </div>
              <p className="mt-1 text-sm text-primary-foreground/70">
                They will become available in your library after their uploads finish.
              </p>
            </div>
          </div>
        </section>
      )}

      <section id="recent">
        <div className="mb-5">
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Your videos
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your latest uploaded and in-progress videos.
          </p>
        </div>
        <LectureGrid videos={videos.slice(0, 6)} />
      </section>
    </div>
  );
}
