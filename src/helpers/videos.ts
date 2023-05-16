export const getVideoThumbnailURL = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/videos/${uid}.webp`;

export const getVideoFile = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/videos/${uid}.mp4`;
