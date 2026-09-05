import { notFound } from "next/navigation";

import { LectureWorkspace } from "@/app/components/lecture-workspace";
import { getVideo } from "@/generated/api";
import { createServerApiClient } from "@/lib/api/server";

export default async function LecturePage({ params }: PageProps<"/library/[id]">) {
  const { id } = await params;
  const client = await createServerApiClient();
  const { data: video, error } = await getVideo({
    client,
    path: { video_id: id },
  });
  if (error || !video) notFound();
  return <LectureWorkspace video={video} />;
}
