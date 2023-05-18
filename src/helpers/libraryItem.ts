import { isDefined } from "./asserts";

export const isUntangibleGroupItem = (
  metadata:
    | {
        __typename: string;
        subtype?: { data?: { attributes?: { slug: string } | null } | null } | null;
      }
    | null
    | undefined
): boolean =>
  isDefined(metadata) &&
  metadata.__typename === "ComponentMetadataGroup" &&
  (metadata.subtype?.data?.attributes?.slug === "variant-set" ||
    metadata.subtype?.data?.attributes?.slug === "relation-set");

export const getScanArchiveURL = (slug: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/library/scans/${slug}.zip`;

export const getTrackURL = (itemSlug: string, trackSlug: string): string =>
  `${process.env.NEXT_PUBLIC_URL_ASSETS}/library/tracks/${itemSlug}/${trackSlug}.mp3`;
