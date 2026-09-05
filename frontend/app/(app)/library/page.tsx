import { LectureGrid } from "@/app/components/lecture-grid";
import { Badge } from "@/app/components/ui/badge";
import { UploadDialog } from "@/app/components/upload-dialog";
import { getVideos } from "@/generated/api";
import { createServerApiClient } from "@/lib/api/server";

export const metadata = {
  title: "Library | Mementor",
  description: "Your private, searchable video library.",
};

export default async function LibraryPage() {
  const client = await createServerApiClient();
  const { data: videos } = await getVideos({ client, throwOnError: true });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-9 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge variant="secondary" className="mb-3">All videos</Badge>
          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Library</h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Every lecture you add lives here. Browse, search, and start a conversation.
          </p>
        </div>
        <UploadDialog size="lg" label="Upload video" />
      </section>
      <LectureGrid videos={videos} />
    </div>
  );
}
