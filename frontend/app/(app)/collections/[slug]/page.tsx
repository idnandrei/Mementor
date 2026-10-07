import { notFound } from "next/navigation";
import { CollectionVideos } from "@/app/components/collection-videos";
import { Badge } from "@/app/components/ui/badge";
import { getCollections } from "@/generated/api";
import { createServerApiClient } from "@/lib/api/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient } from "@/lib/query-client";
import { prefetchCollectionVideos } from "@/lib/api/prefetch";

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const client = await createServerApiClient();
  const queryClient = getQueryClient();
  const { data: collections } = await getCollections({
    client,
    throwOnError: true,
  });
  const collection = collections.find((item) => item.id === slug);
  if (!collection) notFound();
  await prefetchCollectionVideos(queryClient, client, collection.id);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-9 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section>
        <Badge variant="secondary" className="mb-3">
          <span className="size-2 rounded-full bg-cyan-500" />
          Collection
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
          {collection.name}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          {collection.description ||
            `Videos from your ${collection.name} collection.`}
        </p>
      </section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CollectionVideos collectionId={collection.id} />
      </HydrationBoundary>
    </div>
  );
}
