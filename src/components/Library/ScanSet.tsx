import { Fragment, useCallback, useMemo } from "react";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { getAssetFilename, getAssetURL, ImageQuality } from "helpers/img";
import { isInteger } from "helpers/numbers";
import {
  filterHasAttributes,
  getStatusDescription,
  isDefined,
  isDefinedAndNotEmpty,
} from "helpers/others";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  openLightBox: (images: string[], index?: number) => void;
  scanSet: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<
            GetLibraryItemScansQuery["libraryItems"]
          >["data"][number]["attributes"]
        >["contents"]
      >["data"][number]["attributes"]
    >["scan_set"]
  >;
  id: string;
  title: string;
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
  content: NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          GetLibraryItemScansQuery["libraryItems"]
        >["data"][number]["attributes"]
      >["contents"]
    >["data"][number]["attributes"]
  >["content"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ScanSet = ({
  openLightBox,
  scanSet,
  id,
  title,
  languages,
  langui,
  content,
}: Props): JSX.Element => {
  const [selectedScan, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: scanSet,
      languages: languages,
      languageExtractor: useCallback(
        (item: NonNullable<Props["scanSet"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
      transform: useCallback((item: NonNullable<Props["scanSet"][number]>) => {
        item.pages?.data.sort((a, b) => {
          if (
            a.attributes &&
            b.attributes &&
            isDefinedAndNotEmpty(a.attributes.url) &&
            isDefinedAndNotEmpty(b.attributes.url)
          ) {
            let aName = getAssetFilename(a.attributes.url);
            let bName = getAssetFilename(b.attributes.url);

            /*
             * If the number is a succession of 0s, make the number
             * incrementally smaller than 0 (i.e: 00 becomes -1)
             */
            if (aName.replaceAll("0", "").length === 0) {
              aName = (1 - aName.length).toString(10);
            }
            if (bName.replaceAll("0", "").length === 0) {
              bName = (1 - bName.length).toString(10);
            }

            if (isInteger(aName) && isInteger(bName)) {
              return parseInt(aName, 10) - parseInt(bName, 10);
            }
            return a.attributes.url.localeCompare(b.attributes.url);
          }
          return 0;
        });
        return item;
      }, []),
    });

  const pages = useMemo(
    () => filterHasAttributes(selectedScan?.pages?.data, ["attributes"]),
    [selectedScan]
  );

  return (
    <>
      {selectedScan && isDefined(pages) && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 pt-10 text-base first-of-type:pt-0"
          >
            <h2 id={id} className="text-2xl">
              {title}
            </h2>

            <Chip
              text={
                selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? langui.scan ?? "Scan"
                  : langui.scanlation ?? "Scanlation"
              }
            />
          </div>

          <div className="flex flex-row flex-wrap place-items-center gap-4 pb-6">
            {content?.data?.attributes &&
              isDefinedAndNotEmpty(content.data.attributes.slug) && (
                <Button
                  href={`/contents/${content.data.attributes.slug}`}
                  text={langui.open_content}
                />
              )}

            {languageSwitcherProps.locales.size > 1 && (
              <LanguageSwitcher {...languageSwitcherProps} />
            )}

            <div className="grid place-content-center place-items-center">
              <p className="font-headers font-bold">{langui.status}:</p>
              <ToolTip
                content={getStatusDescription(selectedScan.status, langui)}
                maxWidth={"20rem"}
              >
                <Chip text={selectedScan.status} />
              </ToolTip>
            </div>

            {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.scanners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.scanners.data, [
                    "id",
                    "attributes",
                  ] as const).map((scanner) => (
                    <Fragment key={scanner.id}>
                      <RecorderChip
                        langui={langui}
                        recorder={scanner.attributes}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
              <div>
                <p className="font-headers font-bold">{langui.cleaners}:</p>
                <div className="grid place-content-center place-items-center gap-2">
                  {filterHasAttributes(selectedScan.cleaners.data, [
                    "id",
                    "attributes",
                  ] as const).map((cleaner) => (
                    <Fragment key={cleaner.id}>
                      <RecorderChip
                        langui={langui}
                        recorder={cleaner.attributes}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}

            {selectedScan.typesetters &&
              selectedScan.typesetters.data.length > 0 && (
                <div>
                  <p className="font-headers font-bold">
                    {langui.typesetters}:
                  </p>
                  <div className="grid place-content-center place-items-center gap-2">
                    {filterHasAttributes(selectedScan.typesetters.data, [
                      "id",
                      "attributes",
                    ] as const).map((typesetter) => (
                      <Fragment key={typesetter.id}>
                        <RecorderChip
                          langui={langui}
                          recorder={typesetter.attributes}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

            {isDefinedAndNotEmpty(selectedScan.notes) && (
              <ToolTip content={selectedScan.notes}>
                <Chip text={langui.notes ?? "Notes"} />
              </ToolTip>
            )}
          </div>

          <div
            className="grid items-end gap-8 border-b-[3px] border-dotted pb-12 last-of-type:border-0
             desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] mobile:grid-cols-2"
          >
            {pages.map((page, index) => (
              <div
                key={page.id}
                className="cursor-pointer transition-transform
                drop-shadow-shade-lg hover:scale-[1.02]"
                onClick={() => {
                  const images = pages.map((image) =>
                    getAssetURL(image.attributes.url, ImageQuality.Large)
                  );
                  openLightBox(images, index);
                }}
              >
                <Img image={page.attributes} quality={ImageQuality.Small} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
