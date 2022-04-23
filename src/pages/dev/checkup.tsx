import AppLayout from "components/AppLayout";
import {
  GetChronologyItemsQuery,
  GetContentTextQuery,
  GetErasQuery,
  GetLibraryItemQuery,
} from "graphql/generated";
import { GetStaticPropsContext } from "next";
import { NextRouter, useRouter } from "next/router";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { sortContent } from "queries/helpers";

interface Props extends AppStaticProps {}

export default function Checkup(props: Props): JSX.Element {
  return <AppLayout navTitle={"Checkup"} {...props} />;
}

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}

function prettyTestWarning(
  router: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  prettyTestWritter(TestingLevel.Warning, router, message, subCategory, url);
}

function prettyTestError(
  router: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  prettyTestWritter(TestingLevel.Error, router, message, subCategory, url);
}

enum TestingLevel {
  Warning = "warn",
  Error = "error",
}

function prettyTestWritter(
  level: TestingLevel,
  { asPath, locale }: NextRouter,
  message: string,
  subCategory: string[],
  url: string
): void {
  const line = [
    level,
    `${process.env.NEXT_PUBLIC_URL_SELF}/${locale}${asPath}`,
    locale,
    subCategory.join(" -> "),
    message,
    process.env.NEXT_PUBLIC_URL_CMS + url,
  ];

  if (process.env.ENABLE_TESTING_LOG) {
    if (level === TestingLevel.Warning) {
      console.warn(line.join("\t"));
    } else {
      console.error(line.join("\t"));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useTestingContent(props: {
  content: Exclude<
    GetContentTextQuery["contents"],
    null | undefined
  >["data"][number]["attributes"];
  contentId: Exclude<
    GetContentTextQuery["contents"],
    null | undefined
  >["data"][number]["id"];
}) {
  const router = useRouter();
  const { content, contentId } = props;

  const contentURL = `/admin/content-manager/collectionType/api::content.content/${contentId}`;

  if (router.locale === "en") {
    if (content?.categories?.data.length === 0) {
      prettyTestError(router, "Missing categories", ["content"], contentURL);
    }
  }

  if (content?.ranged_contents?.data.length === 0) {
    prettyTestWarning(
      router,
      "Unconnected to any source",
      ["content"],
      contentURL
    );
  }

  if (content?.text_set?.length === 0) {
    prettyTestWarning(
      router,
      "Has no textset, nor audioset, nor videoset",
      ["content"],
      contentURL
    );
  }

  if (content?.text_set && content.text_set.length > 1) {
    prettyTestError(
      router,
      "More than one textset for this language",
      ["content", "text_set"],
      contentURL
    );
  }

  if (content?.text_set?.length === 1) {
    const textset = content.text_set[0];

    if (!textset?.text) {
      prettyTestError(
        router,
        "Missing text",
        ["content", "text_set"],
        contentURL
      );
    }
    if (!textset?.source_language?.data) {
      prettyTestError(
        router,
        "Missing source language",
        ["content", "text_set"],
        contentURL
      );
    } else if (
      textset.source_language.data.attributes?.code === router.locale
    ) {
      // This is a transcript
      if (textset.transcribers?.data.length === 0) {
        prettyTestError(
          router,
          "Missing transcribers attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.translators && textset.translators.data.length > 0) {
        prettyTestError(
          router,
          "Transcripts shouldn't have translators",
          ["content", "text_set"],
          contentURL
        );
      }
    } else {
      // This is a translation
      if (textset.translators?.data.length === 0) {
        prettyTestError(
          router,
          "Missing translators attribution",
          ["content", "text_set"],
          contentURL
        );
      }
      if (textset.transcribers && textset.transcribers.data.length > 0) {
        prettyTestError(
          router,
          "Translations shouldn't have transcribers",
          ["content", "text_set"],
          contentURL
        );
      }
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useTestingLibrary(props: {
  item: Exclude<
    GetLibraryItemQuery["libraryItems"],
    null | undefined
  >["data"][number]["attributes"];
  itemId: Exclude<
    GetLibraryItemQuery["libraryItems"],
    null | undefined
  >["data"][number]["id"];
}) {
  const { item, itemId } = props;
  const router = useRouter();

  const libraryItemURL = `/admin/content-manager/collectionType/api::library-item.library-item/${itemId}`;

  sortContent(item?.contents);

  if (router.locale === "en") {
    if (!item?.thumbnail?.data) {
      prettyTestError(
        router,
        "Missing thumbnail",
        ["libraryItem"],
        libraryItemURL
      );
    }
    if (item?.metadata?.length === 0) {
      prettyTestError(
        router,
        "Missing metadata",
        ["libraryItem"],
        libraryItemURL
      );
    } else if (
      item?.metadata?.[0]?.__typename === "ComponentMetadataGroup" &&
      (item.metadata[0].subtype?.data?.attributes?.slug === "relation-set" ||
        item.metadata[0].subtype?.data?.attributes?.slug === "variant-set")
    ) {
      // This is a group type item
      if (item.price) {
        prettyTestError(
          router,
          "Group-type items shouldn't have price",
          ["libraryItem"],
          libraryItemURL
        );
      }
      if (item.size) {
        prettyTestError(
          router,
          "Group-type items shouldn't have size",
          ["libraryItem"],
          libraryItemURL
        );
      }
      if (item.release_date) {
        prettyTestError(
          router,
          "Group-type items shouldn't have release_date",
          ["libraryItem"],
          libraryItemURL
        );
      }
      if (item.contents && item.contents.data.length > 0) {
        prettyTestError(
          router,
          "Group-type items shouldn't have contents",
          ["libraryItem"],
          libraryItemURL
        );
      }
      if (item.subitems && item.subitems.data.length === 0) {
        prettyTestError(
          router,
          "Group-type items should have subitems",
          ["libraryItem"],
          libraryItemURL
        );
      }
    } else {
      // This is a normal item

      if (item?.metadata?.[0]?.__typename === "ComponentMetadataGroup") {
        if (item.subitems?.data.length === 0) {
          prettyTestError(
            router,
            "Group-type item should have subitems",
            ["libraryItem"],
            libraryItemURL
          );
        }
      }

      if (item?.price) {
        if (!item.price.amount) {
          prettyTestError(
            router,
            "Missing amount",
            ["libraryItem", "price"],
            libraryItemURL
          );
        }
        if (!item.price.currency) {
          prettyTestError(
            router,
            "Missing currency",
            ["libraryItem", "price"],
            libraryItemURL
          );
        }
      } else {
        prettyTestWarning(
          router,
          "Missing price",
          ["libraryItem"],
          libraryItemURL
        );
      }

      if (!item?.digital) {
        if (item?.size) {
          if (!item.size.width) {
            prettyTestWarning(
              router,
              "Missing width",
              ["libraryItem", "size"],
              libraryItemURL
            );
          }
          if (!item.size.height) {
            prettyTestWarning(
              router,
              "Missing height",
              ["libraryItem", "size"],
              libraryItemURL
            );
          }
          if (!item.size.thickness) {
            prettyTestWarning(
              router,
              "Missing thickness",
              ["libraryItem", "size"],
              libraryItemURL
            );
          }
        } else {
          prettyTestWarning(
            router,
            "Missing size",
            ["libraryItem"],
            libraryItemURL
          );
        }
      }

      if (item?.release_date) {
        if (!item.release_date.year) {
          prettyTestError(
            router,
            "Missing year",
            ["libraryItem", "release_date"],
            libraryItemURL
          );
        }
        if (!item.release_date.month) {
          prettyTestError(
            router,
            "Missing month",
            ["libraryItem", "release_date"],
            libraryItemURL
          );
        }
        if (!item.release_date.day) {
          prettyTestError(
            router,
            "Missing day",
            ["libraryItem", "release_date"],
            libraryItemURL
          );
        }
      } else {
        prettyTestWarning(
          router,
          "Missing release_date",
          ["libraryItem"],
          libraryItemURL
        );
      }

      if (item?.contents?.data.length === 0) {
        prettyTestWarning(
          router,
          "Missing contents",
          ["libraryItem"],
          libraryItemURL
        );
      } else {
        let currentRangePage = 0;
        item?.contents?.data.map((content) => {
          const contentURL = `/admin/content-manager/collectionType/api::content.content/${content.id}`;

          if (content.attributes?.scan_set?.length === 0) {
            prettyTestWarning(
              router,
              "Missing scan_set",
              ["libraryItem", "content", content.id ?? ""],
              contentURL
            );
          }
          if (content.attributes?.range.length === 0) {
            prettyTestWarning(
              router,
              "Missing range",
              ["libraryItem", "content", content.id ?? ""],
              contentURL
            );
          } else if (
            content.attributes?.range[0]?.__typename ===
            "ComponentRangePageRange"
          ) {
            if (
              content.attributes.range[0].starting_page <
              currentRangePage + 1
            ) {
              prettyTestError(
                router,
                `Overlapping pages ${content.attributes.range[0].starting_page} to ${currentRangePage}`,
                ["libraryItem", "content", content.id ?? "", "range"],
                libraryItemURL
              );
            } else if (
              content.attributes.range[0].starting_page >
              currentRangePage + 1
            ) {
              prettyTestError(
                router,
                `Missing pages ${currentRangePage + 1} to ${
                  content.attributes.range[0].starting_page - 1
                }`,
                ["libraryItem", "content", content.id ?? "", "range"],
                libraryItemURL
              );
            }

            if (!content.attributes.content?.data) {
              prettyTestWarning(
                router,
                "Missing content",
                ["libraryItem", "content", content.id ?? "", "range"],
                libraryItemURL
              );
            }

            currentRangePage = content.attributes.range[0].ending_page;
          }
        });

        if (item?.metadata?.[0]?.__typename === "ComponentMetadataBooks") {
          if (item.metadata[0].languages?.data.length === 0) {
            prettyTestWarning(
              router,
              "Missing language",
              ["libraryItem", "metadata"],
              libraryItemURL
            );
          }

          if (item.metadata[0].page_count) {
            if (currentRangePage < item.metadata[0].page_count) {
              prettyTestError(
                router,
                `Missing pages ${currentRangePage + 1} to ${
                  item.metadata[0].page_count
                }`,
                ["libraryItem", "content"],
                libraryItemURL
              );
            } else if (currentRangePage > item.metadata[0].page_count) {
              prettyTestError(
                router,
                `Page overflow, content references pages up to ${currentRangePage} when the highest expected was ${item.metadata[0].page_count}`,
                ["libraryItem", "content"],
                libraryItemURL
              );
            }
          } else {
            prettyTestWarning(
              router,
              "Missing page_count",
              ["libraryItem", "metadata"],
              libraryItemURL
            );
          }
        }
      }
    }

    if (!item?.root_item && item?.subitem_of?.data.length === 0) {
      prettyTestError(
        router,
        "This item is inaccessible (not root item and not subitem of another item)",
        ["libraryItem"],
        libraryItemURL
      );
    }

    if (item?.gallery?.data.length === 0) {
      prettyTestWarning(
        router,
        "Missing gallery",
        ["libraryItem"],
        libraryItemURL
      );
    }
  }

  if (item?.descriptions?.length === 0) {
    prettyTestWarning(
      router,
      "Missing description",
      ["libraryItem"],
      libraryItemURL
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function useTestingChronology(props: {
  chronologyItems: Exclude<
    GetChronologyItemsQuery["chronologyItems"],
    null | undefined
  >["data"];
  chronologyEras: Exclude<
    GetErasQuery["chronologyEras"],
    null | undefined
  >["data"];
}) {
  const router = useRouter();
  const { chronologyItems, chronologyEras } = props;
  chronologyEras.map((era) => {
    const chronologyErasURL = `/admin/content-manager/collectionType/api::chronology-era.chronology-era/${chronologyItems[0].id}`;

    if (era.attributes?.title?.length === 0) {
      prettyTestError(
        router,
        "Missing translation for title and description, using slug instead",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else if (era.attributes?.title && era.attributes.title.length > 1) {
      prettyTestError(
        router,
        "More than one title and description",
        ["chronologyEras", era.attributes.slug],
        chronologyErasURL
      );
    } else {
      if (!era.attributes?.title?.[0]?.title)
        prettyTestError(
          router,
          "Missing title, using slug instead",
          ["chronologyEras", era.attributes?.slug ?? ""],
          chronologyErasURL
        );
      if (!era.attributes?.title?.[0]?.description)
        prettyTestError(
          router,
          "Missing description",
          ["chronologyEras", era.attributes?.slug ?? ""],
          chronologyErasURL
        );
    }
  });

  chronologyItems.map((item) => {
    const chronologyItemsURL = `/admin/content-manager/collectionType/api::chronology-item.chronology-item/${chronologyItems[0].id}`;

    const date = `${item.attributes?.year}/${item.attributes?.month}/${item.attributes?.day}`;

    if (item.attributes?.events && item.attributes.events.length > 0) {
      item.attributes.events.map((event) => {
        if (!event?.source?.data) {
          prettyTestError(
            router,
            "No source for this event",
            ["chronologyItems", date, event?.id ?? ""],
            chronologyItemsURL
          );
        }
        if (!(event?.translations && event.translations.length > 0)) {
          prettyTestWarning(
            router,
            "No translation for this event",
            ["chronologyItems", date, event?.id ?? ""],
            chronologyItemsURL
          );
        }
      });
    } else {
      prettyTestError(
        router,
        "No events for this date",
        ["chronologyItems", date],
        chronologyItemsURL
      );
    }
  });
}
