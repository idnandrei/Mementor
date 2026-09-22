import { signParts } from "@/generated/api";
import { signPartsMutation } from "@/generated/api/@tanstack/react-query.gen";
import { getFileExtension } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const PART_SIZE_BYTES = 16 * 1024 * 1024; // 16MB, 16,777,216
export type PartRange = { start: number; end: number };

const VIDEO_CONTENT_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".mkv": "video/x-matroska",
  ".avi": "video/x-msvideo",
  ".m4v": "video/x-m4v",
};

export function getVideoContentType(
  filename: string,
  fallback: string,
): string {
  const extension = getFileExtension(filename);
  return VIDEO_CONTENT_TYPES[extension] ?? fallback;
}
export function getPartCount(fileSize: number): number {
  return Math.ceil(fileSize / PART_SIZE_BYTES);
}

export function getPartRange(partNumber: number, fileSize: number): PartRange {
  const start = (partNumber - 1) * PART_SIZE_BYTES;
  const end = Math.min(fileSize, start + PART_SIZE_BYTES);
  return { start, end };
}
export async function startPartUpload(
  videoId: string,
  uploadId: string,
  file: File,
) {
  const partsNum = getPartCount(file.size);
  const ranges = [];
  for (let partNumber = 1; partNumber <= partsNum; partNumber++) {
    ranges.push(getPartRange(partNumber, file.size));
  }

  const { data } = await signParts({
    path: { video_id: videoId, upload_id: uploadId },
    body: { part_numbers: Array.from({ length: partsNum }, (_, i) => i + 1) },
    throwOnError: true,
  });
  return data.parts;
}
