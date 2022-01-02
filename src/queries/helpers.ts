export function getAssetURL(url: string): string {
  return process.env.NEXT_PUBLIC_URL_CMS + url;
}