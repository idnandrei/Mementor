import "server-only";

import type { QueryClient } from "@tanstack/react-query";
import { getCollectionVideos, getVideos } from "@/generated/api";
import { getCollectionVideosQueryKey } from "@/generated/api/@tanstack/react-query.gen";
import type { Client } from "@/generated/api/client";
import { getVideosQueryKey } from "@/generated/api/@tanstack/react-query.gen";

export function prefetchVideos(queryClient: QueryClient, client: Client) {
  return queryClient.prefetchQuery({
    queryKey: getVideosQueryKey(),
    queryFn: async () => (await getVideos({ client, throwOnError: true })).data,
  });
}

export function prefetchCollectionVideos(
  queryClient: QueryClient,
  client: Client,
  collectionId: string,
) {
  const path = { collection_id: collectionId };
  return queryClient.prefetchQuery({
    queryKey: getCollectionVideosQueryKey({ path }),
    queryFn: async () =>
      (await getCollectionVideos({ client, path, throwOnError: true })).data,
  });
}
