import { Badge } from "@/app/components/ui/badge";
import { getVideos } from "@/generated/api";
import { createServerApiClient } from "@/lib/api/server";
import { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getVideosQueryKey } from "@/generated/api/@tanstack/react-query.gen";
import { AllVideos } from "@/app/components/all-videos";
import { getQueryClient } from "@/lib/query-client";
import { prefetchVideos } from "@/lib/api/prefetch";

export const metadata: Metadata = {
  title: "Library | Mementor",
  description: "Your private, searchable video library.",
};

export default async function LibraryPage() {
  const client = await createServerApiClient();
  const queryClient = getQueryClient();
  await prefetchVideos(queryClient, client);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-9 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">
            All videos
          </Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Library
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Every lecture you add lives here. Browse, search, and start a
            conversation.
          </p>
        </div>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AllVideos />
      </HydrationBoundary>
    </div>
  );
}
