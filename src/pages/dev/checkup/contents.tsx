import { GetStaticProps } from "next";
import { useMemo } from "react";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Chip } from "components/Chip";
import { Button } from "components/Inputs/Button";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { ToolTip } from "components/ToolTip";
import { DevGetContentsQuery } from "graphql/generated";
import { getReadySdk } from "graphql/sdk";
import { filterDefined, filterHasAttributes } from "helpers/others";
import { Report, Severity } from "types/Report";
import { getOpenGraph } from "helpers/openGraph";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {
  contents: DevGetContentsQuery;
}

const CheckupContents = ({ contents, ...otherProps }: Props): JSX.Element => {
  const testReport = useMemo(() => testingContent(contents), [contents]);

  const contentPanel = useMemo(
    () => (
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

        {testReport.lines
          .sort((a, b) => a.name.localeCompare(b.name))
          .sort((a, b) => b.severity - a.severity)
          .map((line, index) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-[2em,3em,2fr,1fr,0.5fr,0.5fr,2fr] items-center
          justify-items-start gap-2"
            >
              <Button
                href={line.frontendUrl}
                className="w-4 text-xs"
                text="F"
                alwaysNewTab
              />
              <Button
                href={line.backendUrl}
                className="w-4 text-xs"
                text="B"
                alwaysNewTab
              />
              <p>{line.subitems.join(" -> ")}</p>
              <p>{line.name}</p>
              <Chip text={line.type} />
              <Chip
                className={
                  line.severity === Severity.VeryHigh
                    ? "bg-[#f00] font-bold !opacity-100"
                    : line.severity === Severity.High
                    ? "bg-[#ff6600] font-bold !opacity-100"
                    : line.severity === Severity.Medium
                    ? "bg-[#fff344] !opacity-100"
                    : ""
                }
                text={Severity[line.severity]}
              />
              <ToolTip content={line.recommandation} placement="left">
                <p>{line.description}</p>
              </ToolTip>
            </div>
          ))}
      </ContentPanel>
    ),
    [testReport.lines, testReport.title]
  );

  return <AppLayout contentPanel={contentPanel} {...otherProps} />;
};
export default CheckupContents;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = async (context) => {
  const sdk = getReadySdk();
  const langui = getLangui(context.locale);
  const contents = await sdk.devGetContents();
  const props: Props = {
    contents: contents,
    openGraph: getOpenGraph(langui, "Checkup Contents"),
  };
  return {
    props: props,
  };
};

/*
 *                                      ╭───────────────────╮
 * ─────────────────────────────────────╯  PRIVATE METHODS  ╰───────────────────────────────────────
 */

const testingContent = (contents: Props["contents"]): Report => {
  const report: Report = {
    title: "Contents",
    lines: [],
  };

  filterHasAttributes(contents.contents?.data, ["attributes"] as const).map(
    (content) => {
      const backendUrl = `${process.env.NEXT_PUBLIC_URL_CMS}/admin/content-manager/collectionType/api::content.content/${content.id}`;
      const frontendUrl = `${process.env.NEXT_PUBLIC_URL_SELF}/contents/${content.attributes.slug}`;

      if (content.attributes.categories?.data.length === 0) {
        report.lines.push({
          subitems: [content.attributes.slug],
          name: "No Category",
          type: "Missing",
          severity: Severity.High,
          description: "The Content has no Category.",
          recommandation: "Select a Category in relation with the Content",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      }

      if (!content.attributes.type?.data?.id) {
        report.lines.push({
          subitems: [content.attributes.slug],
          name: "No Type",
          type: "Missing",
          severity: Severity.High,
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
          severity: Severity.Low,
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
          severity: Severity.High,
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
          severity: Severity.High,
          description: "The Content has no Titles.",
          recommandation: "",
          backendUrl: backendUrl,
          frontendUrl: frontendUrl,
        });
      } else {
        const titleLanguages: string[] = [];

        if (
          content.attributes.translations &&
          content.attributes.translations.length > 0
        ) {
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
                    severity: Severity.High,
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
                  severity: Severity.VeryHigh,
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
                  severity: Severity.Medium,
                  description: "",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }

              if (!translation.text_set) {
                report.lines.push({
                  subitems: [
                    content.attributes.slug,
                    translation.language?.data?.attributes?.code ?? "",
                  ],
                  name: "No Text Set",
                  type: "Missing",
                  severity: Severity.High,
                  description: "The Content has no Text Set.",
                  recommandation: "",
                  backendUrl: backendUrl,
                  frontendUrl: frontendUrl,
                });
              }
            }
          );
        } else {
          report.lines.push({
            subitems: [content.attributes.slug],
            name: "No Translations",
            type: "Missing",
            severity: Severity.High,
            description: "The Content has no Translations.",
            recommandation: "",
            backendUrl: backendUrl,
            frontendUrl: frontendUrl,
          });
        }
      }
    }
  );
  return report;
};
