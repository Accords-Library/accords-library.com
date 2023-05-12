export const getVideoThumbnailURL = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_VIDEOS}/${uid}.webp`;

export const getVideoFile = (uid: string): string =>
  `${process.env.NEXT_PUBLIC_URL_VIDEOS}/${uid}.mp4`;
