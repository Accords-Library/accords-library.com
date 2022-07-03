export const getVideoThumbnailURL = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.webp`;

export const getVideoFile = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_WATCH}/videos/${uid}.mp4`;
