import { signParts } from "@/generated/api";
import { getFileExtension } from "@/lib/utils";

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
  const completedParts = [];
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
  for (const part of data.parts) {
    const { start, end } = getPartRange(part.part_number, file.size);
    const chunk = file.slice(start, end);
    const etag = await uploadPart(part.url, chunk);
    completedParts.push({ part_number: part.part_number, etag });
  }
  return completedParts;
}

export function uploadPart(url: string, chunk: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("PUT", url);

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader("ETag");
        if (!etag) {
          reject(new Error("Missing ETag — check bucket CORS ExposeHeaders"));
          return;
        }
        resolve(etag);
      } else {
        reject(new Error(`${xhr.status} - Failed to upload`));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error - Failed to upload"));
    };

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        console.log(`progress: ${event.loaded} / ${event.total} bytes`);
      }
    };

    xhr.send(chunk);
  });
}
