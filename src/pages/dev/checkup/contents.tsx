import { AppLayout } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Button } from "components/Inputs/Button";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { ToolTip } from "components/ToolTip";
import { DevGetContentsQuery } from "graphql/generated";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { getReadySdk } from "graphql/sdk";
import { filterDefined, filterHasAttributes } from "helpers/others";

import { GetStaticPropsContext } from "next";

interface Props extends AppStaticProps {
  contents: DevGetContentsQuery;
}

export default function CheckupContents(props: Props): JSX.Element {
  const { contents } = props;
  const testReport = testingContent(contents);

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      {<h2 className="text-2xl">{testReport.title}</h2>}

      <div className="my-4 grid grid-cols-[2em,3em,2fr,1fr,0.5fr,0.5fr,2fr] items-center gap-2">
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
          className="mb-2 grid grid-cols-[2em,3em,2fr,1fr,0.5fr,0.5fr,2fr] items-center
          justify-items-start gap-2"
        >
          <Button
            href={line.frontendUrl}
            target="_blank"
            className="w-4 text-xs"
            text="F"
          />
          <Button
            href={line.backendUrl}
            target="_blank"
            className="w-4 text-xs"
            text="B"
          />
          <p>{line.subitems.join(" -> ")}</p>
          <p>{line.name}</p>
          <Chip>{line.type}</Chip>
          <Chip
            className={
              line.severity === "Very High"
                ? "bg-[#f00] font-bold !opacity-100"
                : line.severity === "High"
                ? "bg-[#ff6600] font-bold !opacity-100"
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
  const contents = await sdk.devGetContents();
  const props: Props = {
    ...(await getAppStaticProps(context)),
    contents: contents,
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

function testingContent(contents: Props["contents"]): Report {
  const report: Report = {
    title: "Contents",
    lines: [],
  };

  filterHasAttributes(contents.contents?.data).map((content) => {
    const backendUrl = `${process.env.NEXT_PUBLIC_URL_CMS}/admin/content-manager/collectionType/api::content.content/${content.id}`;
    const frontendUrl = `${process.env.NEXT_PUBLIC_URL_SELF}/contents/${content.attributes.slug}`;

    if (content.attributes.categories?.data.length === 0) {
      report.lines.push({
        subitems: [content.attributes.slug],
        name: "No Category",
        type: "Missing",
        severity: "Medium",
        description: "The Content has no Category.",
        recommandation: "Select a Category in relation with the Content",
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      });
    }

    if (!content.attributes.type?.data?.id) {
      report.lines.push({
        subitems: [content.attributes.slug],
        name: "No Category",
        type: "Missing",
        severity: "Medium",
        description: "The Content has no Type.",
        recommandation: 'If unsure, use the "Other" Type.',
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      });
    }

    if (content.attributes.ranged_contents?.data.length === 0) {
      report.lines.push({
        subitems: [content.attributes.slug],
        name: "No Ranged Content",
        type: "Improvement",
        severity: "Low",
        description: "The Content has no Ranged Content.",
        recommandation:
          "If this Content is available in one or multiple Library Item(s), create a Range Content to connect the Content to its Library Item(s).",
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      });
    }

    if (!content.attributes.thumbnail?.data?.id) {
      report.lines.push({
        subitems: [content.attributes.slug],
        name: "No Thumbnail",
        type: "Missing",
        severity: "High",
        description: "The Content has no Thumbnail.",
        recommandation: "",
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      });
    }

    if (content.attributes.translations?.length === 0) {
      report.lines.push({
        subitems: [content.attributes.slug],
        name: "No Titles",
        type: "Missing",
        severity: "High",
        description: "The Content has no Titles.",
        recommandation: "",
        backendUrl: backendUrl,
        frontendUrl: frontendUrl,
      });
    } else {
      const titleLanguages: string[] = [];

      filterDefined(content.attributes.translations).map(
        (translation, titleIndex) => {
          if (translation.language?.data?.id) {
            if (translation.language.data.id in titleLanguages) {
              report.lines.push({
                subitems: [
                  content.attributes.slug,
                  `Title ${titleIndex.toString()}`,
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
              titleLanguages.push(translation.language.data.id);
            }
          } else {
            report.lines.push({
              subitems: [
                content.attributes.slug,
                `Title ${titleIndex.toString()}`,
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
          if (!translation.description) {
            report.lines.push({
              subitems: [
                content.attributes.slug,
                `Title ${titleIndex.toString()}`,
              ],
              name: "No Description",
              type: "Missing",
              severity: "Medium",
              description: "",
              recommandation: "",
              backendUrl: backendUrl,
              frontendUrl: frontendUrl,
            });
          }

          if (translation.text_set) {
            report.lines.push({
              subitems: [content.attributes.slug],
              name: "No Text Set",
              type: "Missing",
              severity: "Medium",
              description: "The Content has no Text Set.",
              recommandation: "",
              backendUrl: backendUrl,
              frontendUrl: frontendUrl,
            });
          } else {
            /*
             *const textSetLanguages: string[] = [];
             *if (content.attributes && textSet) {
             *  if (textSet.language?.data?.id) {
             *    if (textSet.language.data.id in textSetLanguages) {
             *      report.lines.push({
             *        subitems: [
             *          content.attributes.slug,
             *          `TextSet ${textSetIndex.toString()}`,
             *        ],
             *        name: "Duplicate Language",
             *        type: "Error",
             *        severity: "High",
             *        description: "",
             *        recommandation: "",
             *        backendUrl: backendUrl,
             *        frontendUrl: frontendUrl,
             *      });
             *    } else {
             *      textSetLanguages.push(textSet.language.data.id);
             *    }
             *  } else {
             *    report.lines.push({
             *      subitems: [
             *        content.attributes.slug,
             *        `TextSet ${textSetIndex.toString()}`,
             *      ],
             *      name: "No Language",
             *      type: "Error",
             *      severity: "Very High",
             *      description: "",
             *      recommandation: "",
             *      backendUrl: backendUrl,
             *      frontendUrl: frontendUrl,
             *    });
             *  }
             *
             *  if (!textSet.source_language?.data?.id) {
             *    report.lines.push({
             *      subitems: [
             *        content.attributes.slug,
             *        `TextSet ${textSetIndex.toString()}`,
             *      ],
             *      name: "No Source Language",
             *      type: "Error",
             *      severity: "High",
             *      description: "",
             *      recommandation: "",
             *      backendUrl: backendUrl,
             *      frontendUrl: frontendUrl,
             *    });
             *  }
             *
             *  if (textSet.status !== Enum_Componentsetstextset_Status.Done) {
             *    report.lines.push({
             *      subitems: [
             *        content.attributes.slug,
             *        `TextSet ${textSetIndex.toString()}`,
             *      ],
             *      name: "Not Done Status",
             *      type: "Improvement",
             *      severity: "Low",
             *      description: "",
             *      recommandation: "",
             *      backendUrl: backendUrl,
             *      frontendUrl: frontendUrl,
             *    });
             *  }
             *
             *  if (!textSet.text || textSet.text.length < 10) {
             *    report.lines.push({
             *      subitems: [
             *        content.attributes.slug,
             *        `TextSet ${textSetIndex.toString()}`,
             *      ],
             *      name: "No Text",
             *      type: "Missing",
             *      severity: "Medium",
             *      description: "",
             *      recommandation: "",
             *      backendUrl: backendUrl,
             *      frontendUrl: frontendUrl,
             *    });
             *  }
             *
             *  if (
             *    textSet.source_language?.data?.id ===
             *    textSet.language?.data?.id
             *  ) {
             *    if (textSet.transcribers?.data.length === 0) {
             *      report.lines.push({
             *        subitems: [
             *          content.attributes.slug,
             *          `TextSet ${textSetIndex.toString()}`,
             *        ],
             *        name: "No Transcribers",
             *        type: "Missing",
             *        severity: "High",
             *        description:
             *          "The Content is a Transcription but doesn't credit any Transcribers.",
             *        recommandation: "Add the appropriate Transcribers.",
             *        backendUrl: backendUrl,
             *        frontendUrl: frontendUrl,
             *      });
             *    }
             *    if (
             *      textSet.translators?.data &&
             *      textSet.translators.data.length > 0
             *    ) {
             *      report.lines.push({
             *        subitems: [
             *          content.attributes.slug,
             *          `TextSet ${textSetIndex.toString()}`,
             *        ],
             *        name: "Credited Translators",
             *        type: "Error",
             *        severity: "High",
             *        description:
             *          "The Content is a Transcription but credits one or more Translators.",
             *        recommandation:
             *          "If appropriate, create a Translation Text Set with the Translator credited there.",
             *        backendUrl: backendUrl,
             *        frontendUrl: frontendUrl,
             *      });
             *    }
             *  } else {
             *    if (textSet.translators?.data.length === 0) {
             *      report.lines.push({
             *        subitems: [
             *          content.attributes.slug,
             *          `TextSet ${textSetIndex.toString()}`,
             *        ],
             *        name: "No Translators",
             *        type: "Missing",
             *        severity: "High",
             *        description:
             *          "The Content is a Transcription but doesn't credit any Translators.",
             *        recommandation: "Add the appropriate Translators.",
             *        backendUrl: backendUrl,
             *        frontendUrl: frontendUrl,
             *      });
             *    }
             *    if (
             *      textSet.transcribers?.data &&
             *      textSet.transcribers.data.length > 0
             *    ) {
             *      report.lines.push({
             *        subitems: [
             *          content.attributes.slug,
             *          `TextSet ${textSetIndex.toString()}`,
             *        ],
             *        name: "Credited Transcribers",
             *        type: "Error",
             *        severity: "High",
             *        description:
             *          "The Content is a Translation but credits one or more Transcribers.",
             *        recommandation:
             *          "If appropriate, create a Transcription Text Set with the Transcribers credited there.",
             *        backendUrl: backendUrl,
             *        frontendUrl: frontendUrl,
             *      });
             *    }
             *  }
             *}
             */
          }

          report.lines.push({
            subitems: [content.attributes.slug],
            name: "No Sets",
            type: "Missing",
            severity: "Medium",
            description: "The Content has no Sets.",
            recommandation: "",
            backendUrl: backendUrl,
            frontendUrl: frontendUrl,
          });
        }
      );
    }
  });
  return report;
}
