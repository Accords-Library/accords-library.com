import { Fragment, useCallback, useMemo } from "react";
import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import {
  GetLibraryItemScansQuery,
  UploadImageFragment,
} from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { getAssetURL, ImageQuality } from "helpers/img";
import { filterHasAttributes, getStatusDescription } from "helpers/others";
import { useSmartLanguage } from "hooks/useSmartLanguage";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  openLightBox: (images: string[], index?: number) => void;
  images: NonNullable<
    NonNullable<
      NonNullable<
        GetLibraryItemScansQuery["libraryItems"]
      >["data"][number]["attributes"]
    >["images"]
  >;
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const ScanSetCover = ({
  openLightBox,
  images,
  languages,
  langui,
}: Props): JSX.Element => {
  const [selectedScan, LanguageSwitcher, languageSwitcherProps] =
    useSmartLanguage({
      items: images,
      languages: languages,
      languageExtractor: useCallback(
        (item: NonNullable<Props["images"][number]>) =>
          item.language?.data?.attributes?.code,
        []
      ),
    });

  const coverImages = useMemo(() => {
    const memo: UploadImageFragment[] = [];
    if (selectedScan?.obi_belt?.full?.data?.attributes)
      memo.push(selectedScan.obi_belt.full.data.attributes);
    if (selectedScan?.obi_belt?.inside_full?.data?.attributes)
      memo.push(selectedScan.obi_belt.inside_full.data.attributes);
    if (selectedScan?.dust_jacket?.full?.data?.attributes)
      memo.push(selectedScan.dust_jacket.full.data.attributes);
    if (selectedScan?.dust_jacket?.inside_full?.data?.attributes)
      memo.push(selectedScan.dust_jacket.inside_full.data.attributes);
    if (selectedScan?.cover?.full?.data?.attributes)
      memo.push(selectedScan.cover.full.data.attributes);
    if (selectedScan?.cover?.inside_full?.data?.attributes)
      memo.push(selectedScan.cover.inside_full.data.attributes);
    return memo;
  }, [selectedScan]);

  return (
    <>
      {coverImages.length > 0 && selectedScan && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 pt-10 text-base first-of-type:pt-0"
          >
            <h2 id={"cover"} className="text-2xl">
              {langui.cover}
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
            <LanguageSwitcher {...languageSwitcherProps} />

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
          </div>

          <div
            className="grid items-end gap-8 border-b-[3px] border-dotted pb-12
              last-of-type:border-0 desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]
              mobile:grid-cols-2"
          >
            {coverImages.map((image, index) => (
              <div
                key={image.url}
                className="cursor-pointer transition-transform
                  drop-shadow-shade-lg hover:scale-[1.02]"
                onClick={() => {
                  const imgs = coverImages.map((img) =>
                    getAssetURL(img.url, ImageQuality.Large)
                  );

                  openLightBox(imgs, index);
                }}
              >
                <Img image={image} quality={ImageQuality.Small} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
