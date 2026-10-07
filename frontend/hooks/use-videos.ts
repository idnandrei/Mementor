import { uploadVideo, VideoUploadRequest } from "@/generated/api";
import {
  getCollectionVideosOptions,
  getVideoOptions,
  getVideosOptions,
} from "@/generated/api/@tanstack/react-query.gen";
import { startPartUpload } from "@/lib/uploads";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const VIDEO_QUERY_IDS = ["getVideos", "getVideo", "getCollectionVideos"];

export const useVideos = () => useQuery(getVideosOptions());

export const useVideo = (id: string) => {
  useQuery(getVideoOptions({ path: { video_id: id } }));
};
export const useCollectionVideos = (id: string) =>
  useQuery(getCollectionVideosOptions({ path: { collection_id: id } }));

type UploadInput = {
  body: VideoUploadRequest;
  file: File;
  onStarted?: () => void;
};

export function useUploadVideo() {
  const queryClient = useQueryClient();
  const invalidateVideos = () =>
    queryClient.invalidateQueries({
      predicate: (query) =>
        VIDEO_QUERY_IDS.includes(
          (query.queryKey[0] as { _id?: string })._id ?? "",
        ),
    });
  return useMutation({
    mutationFn: async ({ body, file, onStarted }: UploadInput) => {
      const { data } = await uploadVideo({ body, throwOnError: true });
      onStarted?.();
      await invalidateVideos();
      await startPartUpload(data.video_id, data.upload_id, file);
      return data;
    },
    onSuccess: invalidateVideos,
    onError: () => toast.error("Upload failed"),
  });
}
