import Button from "components/Button";
import Chip from "components/Chip";
import Img, { getAssetURL, ImageQuality } from "components/Img";
import LanguageSwitcher from "components/LanguageSwitcher";
import RecorderChip from "components/RecorderChip";
import ToolTip from "components/ToolTip";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { useRouter } from "next/router";
import { AppStaticProps } from "queries/getAppStaticProps";
import { getPreferredLanguage, getStatusDescription } from "queries/helpers";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

interface Props {
  setLightboxOpen: Dispatch<SetStateAction<boolean>>;
  setLightboxImages: Dispatch<SetStateAction<string[]>>;
  setLightboxIndex: Dispatch<SetStateAction<number>>;
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

export default function ScanSet(props: Props): JSX.Element {
  const {
    setLightboxOpen,
    setLightboxImages,
    setLightboxIndex,
    scanSet,
    slug,
    title,
    languages,
    langui,
    content,
  } = props;
  const appLayout = useAppLayout();
  const router = useRouter();

  const [selectedScan, setSelectedScan] = useState<Props["scanSet"][number]>();
  const scanLocales: Map<string, number> = new Map();

  const [selectedScanIndex, setSelectedScanIndex] = useState<
    number | undefined
  >();

  scanSet.map((scan, index) => {
    if (scan?.language?.data?.attributes?.code) {
      scanLocales.set(scan.language.data.attributes.code, index);
    }
  });

  useMemo(() => {
    setSelectedScanIndex(
      getPreferredLanguage(
        appLayout.preferredLanguages ?? [router.locale],
        scanLocales
      )
    );
  }, [appLayout.preferredLanguages]);

  useEffect(() => {
    if (selectedScanIndex !== undefined) {
      const selectedScanSet = scanSet[selectedScanIndex];
      selectedScanSet?.pages?.data.sort((a, b) => {
        function isInteger(value: string): boolean {
          return /^\d+$/.test(value);
        }
        function getFileName(path: string): string {
          let result = path.split("/");
          result = result[result.length - 1].split(".");
          result = result
            .splice(0, result.length - 1)
            .join(".")
            .split("_");
          return result[0];
        }
        if (a.attributes?.url && b.attributes?.url) {
          const aName = getFileName(a.attributes.url);
          const bName = getFileName(b.attributes.url);
          if (isInteger(aName) && isInteger(bName)) {
            return parseInt(aName, 10) - parseInt(bName, 10);
          }
          return a.attributes.url.localeCompare(b.attributes.url);
        }
        return 0;
      });
      setSelectedScan(selectedScanSet);
    }
  }, [selectedScanIndex]);

  return (
    <>
      {selectedScan && (
        <div>
          <div className="flex flex-row flex-wrap place-items-center gap-6 text-base pt-10 first-of-type:pt-0">
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
              <Button href={`/contents/${content?.data?.attributes?.slug}`}>
                {langui.open_content}
              </Button>
            )}

            <LanguageSwitcher
              languages={languages}
              locales={scanLocales}
              localesIndex={selectedScanIndex}
              setLocalesIndex={setSelectedScanIndex}
            />

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

          <div className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
            {selectedScan.pages?.data.map((page, index) => (
              <div
                key={page.id}
                className="drop-shadow-shade-lg hover:scale-[1.02] cursor-pointer transition-transform"
                onClick={() => {
                  const images: string[] = [];
                  selectedScan.pages?.data.map((image) => {
                    if (image.attributes?.url)
                      images.push(
                        getAssetURL(image.attributes.url, ImageQuality.Large)
                      );
                  });
                  setLightboxOpen(true);
                  setLightboxImages(images);
                  setLightboxIndex(index);
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
