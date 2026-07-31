import { notFound } from "next/navigation";

import { LectureWorkspace } from "@/app/components/lecture-workspace";
import { lectures } from "@/lib/demo-library";

export function generateStaticParams() {
  return lectures.map(({ id }) => ({ id }));
}

export default async function LecturePage({ params }: PageProps<"/library/[id]">) {
  const { id } = await params;
  const lecture = lectures.find((item) => item.id === id);
  if (!lecture) notFound();
  return <LectureWorkspace lecture={lecture} />;
}
