export function getVideoThumbnailURL(uid: string): string {
  return `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.webp`;
}

export function getVideoFile(uid: string): string {
  return `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.mp4`;
}
