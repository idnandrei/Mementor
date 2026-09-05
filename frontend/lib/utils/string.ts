export function titleFromFilename(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[\s_-]+/g, " ")
    .trim()
}

export function getInitials(value: string): string {
  return value.slice(0, 2).toUpperCase()
}
