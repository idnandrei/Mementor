import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[\s_-]+/g, " ")
    .trim();
}

export function getInitials(value: string): string {
  return value.slice(0, 2).toUpperCase();
}

export function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex === -1 ? "" : filename.slice(dotIndex).toLowerCase();
}
