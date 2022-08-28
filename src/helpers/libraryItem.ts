import { isDefined } from "./others";

export const isUntangibleGroupItem = (
  metadata:
    | {
        __typename: string;
        // eslint-disable-next-line id-denylist
        subtype?: { data?: { attributes?: { slug: string } | null } | null } | null;
      }
    | null
    | undefined
): boolean =>
  isDefined(metadata) &&
  metadata.__typename === "ComponentMetadataGroup" &&
  (metadata.subtype?.data?.attributes?.slug === "variant-set" ||
    metadata.subtype?.data?.attributes?.slug === "relation-set");
