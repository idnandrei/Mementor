import { Sparkles } from "lucide-react";

import { Badge } from "@/app/components/ui/badge";
import { createServerApiClient } from "@/lib/api/server";
import { Metadata } from "next";
import { AllVideos } from "@/app/components/all-videos";
import { getQueryClient } from "@/lib/query-client";
import { prefetchVideos } from "@/lib/api/prefetch";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { UploadingBanner } from "@/app/components/uploading-banner";

export const metadata: Metadata = {
  title: "Home | Mementor",
  description: "Your learning workspace.",
};

export default async function HomePage() {
  const client = await createServerApiClient();
  const queryClient = getQueryClient();
  await prefetchVideos(queryClient, client);

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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UploadingBanner />
        <section id="recent">
          <div className="mb-5">
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Your videos
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your latest uploaded and in-progress videos.
            </p>
          </div>
          <AllVideos limit={3} />
        </section>
      </HydrationBoundary>
    </div>
  );
}
