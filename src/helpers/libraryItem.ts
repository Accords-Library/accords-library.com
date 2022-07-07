export const isUntangibleGroupItem = (metadata: any): boolean =>
  metadata &&
  metadata.__typename === "ComponentMetadataGroup" &&
  (metadata.subtype?.data?.attributes?.slug === "variant-set" ||
    metadata.subtype?.data?.attributes?.slug === "relation-set");
