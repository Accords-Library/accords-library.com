import { Chip } from "components/Chip";
import { Img } from "components/Img";
import { Button } from "components/Inputs/Button";
import { RecorderChip } from "components/RecorderChip";
import { ToolTip } from "components/ToolTip";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { AppStaticProps } from "graphql/getAppStaticProps";
import { getAssetFilename, getAssetURL, ImageQuality } from "helpers/img";
import { isInteger } from "helpers/numbers";
import { getStatusDescription } from "helpers/others";
import { Immutable } from "helpers/types";
import { useSmartLanguage } from "hooks/useSmartLanguage";

interface Props {
  openLightBox: (images: string[], index?: number) => void;
  scanSet: Exclude<
    Exclude<
      Exclude<
        Exclude<
          Exclude<
            GetLibraryItemScansQuery["libraryItems"],
            null | undefined
          >["data"][number]["attributes"],
          null | undefined
        >["contents"],
        null | undefined
      >["data"][number]["attributes"],
      null | undefined
    >["scan_set"],
    null | undefined
  >;
  slug: string;
  title: string;
  languages: AppStaticProps["languages"];
  langui: AppStaticProps["langui"];
  content: Exclude<
    Exclude<
      Exclude<
        Exclude<
          GetLibraryItemScansQuery["libraryItems"],
          null | undefined
        >["data"][number]["attributes"],
        null | undefined
      >["contents"],
      null | undefined
    >["data"][number]["attributes"],
    null | undefined
  >["content"];
}

export function ScanSet(props: Immutable<Props>): JSX.Element {
  const { openLightBox, scanSet, slug, title, languages, langui, content } =
    props;

  const [selectedScan, LanguageSwitcher] = useSmartLanguage({
    items: scanSet,
    languages: languages,
    languageExtractor: (item) => item.language?.data?.attributes?.code,
    transform: (item) => {
      const newItem = { ...item } as Exclude<Props["scanSet"][number], null>;
      newItem.pages?.data.sort((a, b) => {
        if (a.attributes?.url && b.attributes?.url) {
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
      return newItem;
    },
  });

  return (
    <>
      {selectedScan && (
        <div>
          <div
            className="flex flex-row flex-wrap place-items-center
          gap-6 text-base pt-10 first-of-type:pt-0"
          >
            <h2 id={slug} className="text-2xl">
              {title}
            </h2>

            <Chip>
              {selectedScan.language?.data?.attributes?.code ===
              selectedScan.source_language?.data?.attributes?.code
                ? "Scan"
                : "Scanlation"}
            </Chip>
          </div>

          <div className="flex flex-row flex-wrap gap-4 pb-6 place-items-center">
            {content?.data?.attributes?.slug && (
              <Button href={`/contents/${content.data.attributes.slug}`}>
                {langui.open_content}
              </Button>
            )}

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

            {selectedScan.notes && (
              <ToolTip content={selectedScan.notes}>
                <Chip>{"Notes"}</Chip>
              </ToolTip>
            )}
          </div>

          <div
            className="grid gap-8 items-end mobile:grid-cols-2
            desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))]
            pb-12 border-b-[3px] border-dotted last-of-type:border-0"
          >
            {selectedScan.pages?.data.map((page, index) => (
              <div
                key={page.id}
                className="drop-shadow-shade-lg hover:scale-[1.02]
                cursor-pointer transition-transform"
                onClick={() => {
                  const images: string[] = [];
                  selectedScan.pages?.data.map((image) => {
                    if (image.attributes?.url)
                      images.push(
                        getAssetURL(image.attributes.url, ImageQuality.Large)
                      );
                  });
                  openLightBox(images, index);
                }}
              >
                {page.attributes && (
                  <Img image={page.attributes} quality={ImageQuality.Small} />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
