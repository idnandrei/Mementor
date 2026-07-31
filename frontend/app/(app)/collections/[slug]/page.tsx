import { notFound } from "next/navigation";

import { LectureGrid } from "@/app/components/lecture-grid";
import { Badge } from "@/app/components/ui/badge";
import { collections, lectures } from "@/lib/demo-library";

export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export default async function CollectionPage({ params }: PageProps<"/collections/[slug]">) {
  const { slug } = await params;
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) notFound();
  const filteredLectures = lectures.filter((lecture) => lecture.collection === slug);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-9 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
      <section>
        <Badge variant="secondary" className="mb-3">
          <span className={`size-2 rounded-full ${collection.color}`} />Collection
        </Badge>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{collection.label}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
          Videos from your {collection.label} collection.
        </p>
      </section>
      <LectureGrid lectures={filteredLectures} />
    </div>
  );
}
