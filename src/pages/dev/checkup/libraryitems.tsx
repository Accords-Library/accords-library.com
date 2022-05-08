import AppLayout from "components/AppLayout";
import Chip from "components/Chip";
import Button from "components/Inputs/Button";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import ToolTip from "components/ToolTip";
import {
  DevGetLibraryItemsQuery,
  Enum_Componentcollectionscomponentlibraryimages_Status,
} from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { GetStaticPropsContext } from "next";
import { AppStaticProps, getAppStaticProps } from "helpers/getAppStaticProps";

interface Props extends AppStaticProps {
  libraryItems: DevGetLibraryItemsQuery;
}

export default function CheckupLibraryItems(props: Props): JSX.Element {
  const { libraryItems } = props;
  const testReport = testingLibraryItem(libraryItems);

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      {<h2 className="text-2xl">{testReport.title}</h2>}

      <div className="grid grid-cols-[2em,3em,2fr,1fr,0.5fr,0.5fr,2fr] gap-2 items-center my-4">
        <p></p>
        <p></p>
        <p className="font-headers">Ref</p>
        <p className="font-headers">Name</p>
        <p className="font-headers">Type</p>
        <p className="font-headers">Severity</p>
        <p className="font-headers">Description</p>
      </div>

      {testReport.lines.map((line, index) => (
        <div
          key={index}
          className="grid grid-cols-[2em,3em,2fr,1fr,0.5fr,0.5fr,2fr] gap-2 items-center mb-2 justify-items-start"
        >
          <Button
            href={line.frontendUrl}
            target="_blank"
            className="text-xs w-4"
          >
            F
          </Button>
          <Button
            href={line.backendUrl}
            target="_blank"
            className="text-xs w-4"
          >
            B
          </Button>
          <p>{line.subitems.join(" -> ")}</p>
          <p>{line.name}</p>
          <Chip>{line.type}</Chip>
          <Chip
            className={
              line.severity === "Very High"
                ? "bg-[#f00] !opacity-100 font-bold"
                : line.severity === "High"
                ? "bg-[#ff6600] !opacity-100 font-bold"
                : line.severity === "Medium"
                ? "bg-[#fff344] !opacity-100"
                : ""
            }
          >
            {line.severity}
          </Chip>
          <ToolTip content={line.recommandation} placement="left">
            <p>{line.description}</p>
          </ToolTip>
        </div>
      ))}
    </ContentPanel>
  );
  return (
    <AppLayout navTitle={"Checkup"} contentPanel={contentPanel} {...props} />
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const sdk = getReadySdk();
  const libraryItems = await sdk.devGetLibraryItems();
  const props: Props = {
    ...(await getAppStaticProps(context)),
    libraryItems: libraryItems,
  };
  return {
    props: props,
  };
}

type Report = {
  title: string;
  lines: ReportLine[];
};

type ReportLine = {
  subitems: string[];
  name: string;
  type: "Error" | "Improvement" | "Missing";
  severity: "High" | "Low" | "Medium" | "Very High" | "Very Low";
  description: string;
  recommandation: string;
  backendUrl: string;
  frontendUrl: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function testingLibraryItem(libraryItems: Props["libraryItems"]): Report {
  const report: Report = {
    title: "Contents",
    lines: [],
  };

  libraryItems.libraryItems?.data.map((item) => {
    if (item.attributes) {
      const backendUrl = `${process.env.NEXT_PUBLIC_URL_CMS}/admin/content-manager/collectionType/api::library-item.library-item/${item.id}`;
      const frontendUrl = `${process.env.NEXT_PUBLIC_URL_SELF}/library/${item.attributes.slug}`;

      if (item.attributes.categories?.data.length === 0) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No Category",
          type: "Missing",
          severity: "Medium",
          description: "The Item has no Category.",
          recommandation: "Select a Category in relation with the Item",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (
        !item.attributes.root_item &&
        item.attributes.subitem_of?.data.length === 0
      ) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "Disconnected Item",
          type: "Error",
          severity: "Very High",
          description:
            "The Item is neither a Root Item, nor is it a subitem of another item.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (item.attributes.contents?.data.length === 0) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No Contents",
          type: "Missing",
          severity: "Low",
          description: "The Item has no Contents.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (!item.attributes.thumbnail?.data?.id) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No Thumbnail",
          type: "Missing",
          severity: "High",
          description: "The Item has no Thumbnail.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (item.attributes.images?.length === 0) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No Images",
          type: "Missing",
          severity: "Low",
          description: "The Item has no Images.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      } else {
        item.attributes.images?.map((image, imageIndex) => {
          const imagesLanguages: string[] = [];

          if (image && item.attributes) {
            if (image.language?.data?.id) {
              if (image.language.data.id in imagesLanguages) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "Duplicate Language",
                  type: "Error",
                  severity: "High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              } else {
                imagesLanguages.push(image.language.data.id);
              }
            } else {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "No Language",
                type: "Error",
                severity: "Very High",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (!image.source_language?.data?.id) {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "No Source Language",
                type: "Error",
                severity: "Very High",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (
              image.status !==
              Enum_Componentcollectionscomponentlibraryimages_Status.Done
            ) {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "Not Done Status",
                type: "Improvement",
                severity: "Low",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (image.source_language?.data?.id === image.language?.data?.id) {
              if (image.scanners?.data.length === 0) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "No Scanners",
                  type: "Missing",
                  severity: "High",
                  description:
                    "The Item is a Scan but doesn't credit any Scanners.",
                  recommandation: "Add the appropriate Scanners.",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (image.cleaners?.data.length === 0) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "No Cleaners",
                  type: "Missing",
                  severity: "High",
                  description:
                    "The Item is a Scan but doesn't credit any Cleaners.",
                  recommandation: "Add the appropriate Cleaners.",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (
                image.typesetters?.data &&
                image.typesetters.data.length > 0
              ) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "Credited Typesetters",
                  type: "Error",
                  severity: "High",
                  description:
                    "The Item is a Scan but credits one or more Typesetters.",
                  recommandation:
                    "If appropriate, create a Scanlation Images Set Set with the Typesetters credited there.",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            } else {
              if (image.typesetters?.data.length === 0) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "No Typesetters",
                  type: "Missing",
                  severity: "High",
                  description:
                    "The Item is a Scanlation but doesn't credit any Typesetters.",
                  recommandation: "Add the appropriate Typesetters.",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (image.scanners?.data && image.scanners.data.length > 0) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                  ],
                  name: "Credited Scanners",
                  type: "Error",
                  severity: "High",
                  description:
                    "The Item is a Scanlation but credits one or more Scanners.",
                  recommandation:
                    "If appropriate, create a Scanners Images Set Set with the Scanners credited there.",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            }

            if (image.cover) {
              if (!image.cover.front?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Cover",
                  ],
                  name: "No Front",
                  type: "Missing",
                  severity: "Very High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.cover.spine?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Cover",
                  ],
                  name: "No spine",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.cover.back?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Cover",
                  ],
                  name: "No Back",
                  type: "Missing",
                  severity: "High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.cover.full?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Cover",
                  ],
                  name: "No Full",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            } else {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "No Cover",
                type: "Missing",
                severity: "Medium",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (image.dust_jacket) {
              if (!image.dust_jacket.front?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No Front",
                  type: "Missing",
                  severity: "Very High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.dust_jacket.spine?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No spine",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.dust_jacket.back?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No Back",
                  type: "Missing",
                  severity: "High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.dust_jacket.full?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No Full",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.dust_jacket.flap_front?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No Flap Front",
                  type: "Missing",
                  severity: "Medium",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.dust_jacket.flap_back?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Dust Jacket",
                  ],
                  name: "No Flap Back",
                  type: "Missing",
                  severity: "Medium",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            } else {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "No Dust Jacket",
                type: "Missing",
                severity: "Very Low",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (image.obi_belt) {
              if (!image.obi_belt.front?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No Front",
                  type: "Missing",
                  severity: "Very High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.obi_belt.spine?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No spine",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.obi_belt.back?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No Back",
                  type: "Missing",
                  severity: "High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.obi_belt.full?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No Full",
                  type: "Missing",
                  severity: "Low",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.obi_belt.flap_front?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No Flap Front",
                  type: "Missing",
                  severity: "Medium",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
              if (!image.obi_belt.flap_back?.data?.id) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Images ${imageIndex.toString()}`,
                    "Obi Belt",
                  ],
                  name: "No Flap Back",
                  type: "Missing",
                  severity: "Medium",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            } else {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Images ${imageIndex.toString()}`,
                ],
                name: "No Obi Belt",
                type: "Missing",
                severity: "Very Low",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }
          }
        });
      }

      if (
        item.attributes.descriptions &&
        item.attributes.descriptions.length > 0
      ) {
        const descriptionLanguages: string[] = [];

        item.attributes.descriptions.map((description, descriptionIndex) => {
          if (description && item.attributes) {
            if (description.description.length < 10) {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Description ${descriptionIndex}`,
                ],
                name: "No Text",
                type: "Missing",
                severity: "Very High",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }

            if (description.language?.data?.id) {
              if (description.language.data.id in descriptionLanguages) {
                report.lines.push({
                  subitems: [
                    item.attributes.slug,
                    `Description ${descriptionIndex}`,
                  ],
                  name: "Duplicate Language",
                  type: "Error",
                  severity: "High",
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              } else {
                descriptionLanguages.push(description.language.data.id);
              }
            } else {
              report.lines.push({
                subitems: [
                  item.attributes.slug,
                  `Description ${descriptionIndex}`,
                ],
                name: "No Language",
                type: "Error",
                severity: "Very High",
                description: "",
                recommandation: "",
                backendUrl: backendUrl,
                frontendUrl: frontendUrl,
              });
            }
          }
        });
      } else {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No Description",
          type: "Missing",
          severity: "Medium",
          description: "The Item has no Description.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (item.attributes.urls?.length === 0) {
        report.lines.push({
          subitems: [item.attributes.slug],
          name: "No URLs",
          type: "Missing",
          severity: "Very Low",
          description: "The Item has no URLs.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }
    }
  });

  return report;
}
