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
import { getStatusDescription } from "helpers/others";
import { Immutable } from "helpers/types";
import { useSmartLanguage } from "hooks/useSmartLanguage";

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

export function ScanSetCover(props: Immutable<Props>): JSX.Element {
  const { openLightBox, images, languages, langui } = props;

  const [selectedScan, LanguageSwitcher] = useSmartLanguage({
    items: images,
    languages: languages,
    languageExtractor: (item) => item.language?.data?.attributes?.code,
  });

  const coverImages: UploadImageFragment[] = [];
  if (selectedScan?.obi_belt?.full?.data?.attributes)
    coverImages.push(selectedScan.obi_belt.full.data.attributes);
  if (selectedScan?.obi_belt?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.obi_belt.inside_full.data.attributes);
  if (selectedScan?.dust_jacket?.full?.data?.attributes)
    coverImages.push(selectedScan.dust_jacket.full.data.attributes);
  if (selectedScan?.dust_jacket?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.dust_jacket.inside_full.data.attributes);
  if (selectedScan?.cover?.full?.data?.attributes)
    coverImages.push(selectedScan.cover.full.data.attributes);
  if (selectedScan?.cover?.inside_full?.data?.attributes)
    coverImages.push(selectedScan.cover.inside_full.data.attributes);

  if (coverImages.length > 0) {
    return (
      <>
        {selectedScan && (
          <div>
            <div
              className="flex flex-row flex-wrap place-items-center
              gap-6 text-base pt-10 first-of-type:pt-0"
            >
              <h2 id="cover" className="text-2xl">
                {"Cover"}
              </h2>

              <Chip>
                {selectedScan.language?.data?.attributes?.code ===
                selectedScan.source_language?.data?.attributes?.code
                  ? "Scan"
                  : "Scanlation"}
              </Chip>
            </div>

            <div className="flex flex-row flex-wrap gap-4 pb-6 place-items-center">
              <LanguageSwitcher />

              <div className="grid place-items-center place-content-center">
                <p className="font-headers">{langui.status}:</p>
                <ToolTip
                  content={getStatusDescription(selectedScan.status, langui)}
                  maxWidth={"20rem"}
                >
                  <Chip>{selectedScan.status}</Chip>
                </ToolTip>
              </div>

              {selectedScan.scanners && selectedScan.scanners.data.length > 0 && (
                <div>
                  <p className="font-headers">{"Scanners"}:</p>
                  <div className="grid place-items-center place-content-center gap-2">
                    {selectedScan.scanners.data.map((scanner) => (
                      <>
                        {scanner.attributes && (
                          <RecorderChip
                            key={scanner.id}
                            langui={langui}
                            recorder={scanner.attributes}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}

              {selectedScan.cleaners && selectedScan.cleaners.data.length > 0 && (
                <div>
                  <p className="font-headers">{"Cleaners"}:</p>
                  <div className="grid place-items-center place-content-center gap-2">
                    {selectedScan.cleaners.data.map((cleaner) => (
                      <>
                        {cleaner.attributes && (
                          <RecorderChip
                            key={cleaner.id}
                            langui={langui}
                            recorder={cleaner.attributes}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </div>
              )}

              {selectedScan.typesetters &&
                selectedScan.typesetters.data.length > 0 && (
                  <div>
                    <p className="font-headers">{"Typesetters"}:</p>
                    <div className="grid place-items-center place-content-center gap-2">
                      {selectedScan.typesetters.data.map((typesetter) => (
                        <>
                          {typesetter.attributes && (
                            <RecorderChip
                              key={typesetter.id}
                              langui={langui}
                              recorder={typesetter.attributes}
                            />
                          )}
                        </>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div
              className="grid gap-8 items-end mobile:grid-cols-2
              desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]
              pb-12 border-b-[3px] border-dotted last-of-type:border-0"
            >
              {coverImages.map((image, index) => (
                <div
                  key={image.url}
                  className="drop-shadow-shade-lg hover:scale-[1.02]
                  cursor-pointer transition-transform"
                  onClick={() => {
                    const imgs: string[] = [];
                    coverImages.map((img) => {
                      if (img.url)
                        imgs.push(getAssetURL(img.url, ImageQuality.Large));
                    });
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
  }
  return <></>;
}
