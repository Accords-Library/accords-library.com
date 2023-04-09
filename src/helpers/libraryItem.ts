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
