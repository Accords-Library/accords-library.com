import Img, { getAssetURL, ImageQuality } from "components/Img";
import LanguageSwitcher from "components/LanguageSwitcher";
import { useAppLayout } from "contexts/AppLayoutContext";
import { GetLibraryItemScansQuery } from "graphql/generated";
import { useRouter } from "next/router";
import { AppStaticProps } from "queries/getAppStaticProps";
import { getPreferredLanguage } from "queries/helpers";
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
    if (selectedScanIndex !== undefined)
      setSelectedScan(scanSet[selectedScanIndex]);
  }, [selectedScanIndex]);

  return (
    <div>
      <div className="flex flex-row place-items-center gap-4 text-base pb-6 pt-10 first-of-type:pt-0">
        <h2
          id={slug}
          className="text-2xl"
        >
          {title}
        </h2>
        <LanguageSwitcher
          languages={languages}
          locales={scanLocales}
          localesIndex={selectedScanIndex}
          setLocalesIndex={setSelectedScanIndex}
        />
      </div>

      <div className="grid gap-8 items-end mobile:grid-cols-2 desktop:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] pb-12 border-b-[3px] border-dotted last-of-type:border-0">
        {selectedScan?.pages?.data.map((page, index) => (
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
  );
}
