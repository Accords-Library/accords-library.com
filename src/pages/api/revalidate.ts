import type { NextApiRequest, NextApiResponse } from "next";
import { i18n } from "../../../next.config";
import { cartesianProduct } from "helpers/others";
import { filterHasAttributes } from "helpers/asserts";
import { fetchLocalData } from "graphql/fetchLocalData";
import { getReadySdk } from "graphql/sdk";

type CRUDEvents = "entry.create" | "entry.delete" | "entry.update";

type StrapiEvent = {
  event: CRUDEvents;
  model: string;
  entry: Record<string, unknown>;
};

type StrapiRelationalField = { count: number };

type RequestProps =
  | CustomRequest
  | StrapiChronicle
  | StrapiChronicleChapter
  | StrapiChronology
  | StrapiContent
  | StrapiContentFolder
  | StrapiCurrency
  | StrapiLanguage
  | StrapiLibraryItem
  | StrapiPostContent
  | StrapiRangedContent
  | StrapiVideo
  | StrapiWeaponGroup
  | StrapiWeaponStory
  | StrapiWebsiteInterface
  | StrapiWiki;

interface CustomRequest {
  model: "custom";
  path: string;
}

interface StrapiWeaponStory extends StrapiEvent {
  model: "weapon-story";
  entry: {
    slug: string;
  };
}

interface StrapiWeaponGroup extends StrapiEvent {
  model: "weapon-story-group";
  entry: {
    id: string;
    slug: string;
  };
}

interface StrapiRangedContent extends StrapiEvent {
  event: CRUDEvents;
  model: "ranged-content";
  entry: {
    id: string;
    library_item: StrapiRelationalField;
    content: StrapiRelationalField;
  };
}

interface StrapiContent extends StrapiEvent {
  model: "content";
  entry: {
    slug: string;
    folder: StrapiRelationalField;
    ranged_contents: StrapiRelationalField;
  };
}

interface StrapiPostContent extends StrapiEvent {
  event: CRUDEvents;
  model: "post";
  entry: {
    slug: string;
  };
}

interface StrapiWebsiteInterface extends StrapiEvent {
  event: CRUDEvents;
  model: "website-interface";
  entry: {
    slug: string;
  };
}

interface StrapiLanguage extends StrapiEvent {
  event: CRUDEvents;
  model: "language";
  entry: {
    slug: string;
  };
}

interface StrapiCurrency extends StrapiEvent {
  event: CRUDEvents;
  model: "currency";
  entry: {
    slug: string;
  };
}

interface StrapiLibraryItem extends StrapiEvent {
  event: CRUDEvents;
  model: "library-item";
  entry: {
    slug: string;
    subitem_of: StrapiRelationalField;
  };
}

interface StrapiContentFolder extends StrapiEvent {
  event: CRUDEvents;
  model: "contents-folder";
  entry: {
    slug: string;
    parent_folder: StrapiRelationalField;
    subfolders: StrapiRelationalField;
    contents: StrapiRelationalField;
  };
}

interface StrapiChronology extends StrapiEvent {
  event: CRUDEvents;
  model: "chronology-era" | "chronology-item";
}

interface StrapiWiki extends StrapiEvent {
  event: CRUDEvents;
  model: "wiki-page";
  entry: {
    slug: string;
  };
}

interface StrapiChronicle extends StrapiEvent {
  event: CRUDEvents;
  model: "chronicle";
  entry: {
    slug: string;
  };
}

interface StrapiChronicleChapter extends StrapiEvent {
  event: CRUDEvents;
  model: "chronicles-chapter";
  entry: {
    chronicles: { slug: string }[];
  };
}

interface StrapiVideo extends StrapiEvent {
  event: CRUDEvents;
  model: "video";
  entry: {
    uid: string;
    channel: StrapiRelationalField;
  };
}

type ResponseProps = {
  message: string;
  revalidated: boolean;
};

const Revalidate = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps>
): Promise<void> => {
  const body = req.body as RequestProps;
  const sdk = getReadySdk();

  // Check for secret to confirm this is a valid request
  if (req.headers.authorization !== `Bearer ${process.env.REVALIDATION_TOKEN}`) {
    res.status(401).json({ message: "Invalid token", revalidated: false });
    return;
  }

  const paths: string[] = [];

  console.log(body);

  switch (body.model) {
    case "post": {
      paths.push(`/news/${body.entry.slug}`);
      break;
    }

    case "library-item": {
      paths.push(`/library/${body.entry.slug}`);
      paths.push(`/library/${body.entry.slug}/reader`);

      if (body.entry.subitem_of.count > 0) {
        const libraryItem = await sdk.getLibraryItem({
          language_code: "en",
          slug: body.entry.slug,
        });
        filterHasAttributes(libraryItem.libraryItems?.data[0]?.attributes?.subitem_of?.data, [
          "attributes.slug",
        ]).forEach((parentItem) => paths.push(`/library/${parentItem.attributes.slug}`));
      }

      break;
    }

    case "content": {
      paths.push(`/contents/${body.entry.slug}`);

      if (body.entry.folder.count > 0 || body.entry.ranged_contents.count > 0) {
        const content = await sdk.getContentText({
          language_code: "en",
          slug: body.entry.slug,
        });

        const folderSlug = content.contents?.data[0]?.attributes?.folder?.data?.attributes?.slug;
        if (folderSlug) {
          if (folderSlug === "root") {
            paths.push(`/contents`);
          } else {
            paths.push(`/contents/folder/${folderSlug}`);
          }
        }

        filterHasAttributes(content.contents?.data[0]?.attributes?.ranged_contents?.data, [
          "attributes.library_item.data.attributes.slug",
        ]).forEach((ranged_content) => {
          const parentSlug = ranged_content.attributes.library_item.data.attributes.slug;
          paths.push(`/library/${parentSlug}`);
          paths.push(`/library/${parentSlug}/reader`);
        });
      }
      break;
    }

    case "chronology-era":
    case "chronology-item": {
      paths.push(`/wiki/chronology`);
      break;
    }

    case "ranged-content": {
      if (body.entry.content.count > 0 || body.entry.library_item.count > 0) {
        const rangedContent = await sdk.revalidationGetRangedContent({
          id: body.entry.id,
        });
        const libraryItemSlug =
          rangedContent.rangedContent?.data?.attributes?.content?.data?.attributes?.slug;
        if (libraryItemSlug) {
          paths.push(`/library/${libraryItemSlug}`);
          paths.push(`/library/${libraryItemSlug}/reader`);
        }
        const contentSlug =
          rangedContent.rangedContent?.data?.attributes?.content?.data?.attributes?.slug;
        if (contentSlug) {
          paths.push(`/contents/${contentSlug}`);
        }
      }
      break;
    }

    case "contents-folder": {
      if (body.entry.slug === "root") {
        paths.push(`/contents`);
      } else {
        paths.push(`/contents/folder/${body.entry.slug}`);
      }

      if (
        body.entry.contents.count > 0 ||
        body.entry.parent_folder.count > 0 ||
        body.entry.subfolders.count > 0
      ) {
        const folder = await sdk.getContentsFolder({
          language_code: "en",
          slug: body.entry.slug,
        });
        const parentSlug =
          folder.contentsFolders?.data[0]?.attributes?.parent_folder?.data?.attributes?.slug;
        if (parentSlug) {
          paths.push(`/contents/folder/${parentSlug}`);
        }
        filterHasAttributes(folder.contentsFolders?.data[0]?.attributes?.subfolders?.data, [
          "attributes.slug",
        ]).forEach((subfolder) => paths.push(`/contents/folder/${subfolder.attributes.slug}`));
        filterHasAttributes(folder.contentsFolders?.data[0]?.attributes?.contents?.data, [
          "attributes.slug",
        ]).forEach((content) => paths.push(`/contents/${content.attributes.slug}`));
      }
      break;
    }

    case "wiki-page": {
      paths.push(`/wiki/${body.entry.slug}`);
      break;
    }

    case "chronicle": {
      paths.push(`/chronicles`);
      paths.push(`/chronicles/${body.entry.slug}`);
      break;
    }

    case "chronicles-chapter": {
      paths.push(`/chronicles`);
      body.entry.chronicles.forEach((chronicle) => {
        paths.push(`/chronicles/${chronicle.slug}`);
      });
      break;
    }

    case "website-interface":
    case "language":
    case "currency": {
      await fetchLocalData();
      break;
    }

    case "video": {
      if (body.entry.uid) {
        paths.push(`/archives/videos/v/${body.entry.uid}`);
      }
      break;
    }

    case "weapon-story": {
      paths.push(`/wiki/weapons/${body.entry.slug}`);
      break;
    }

    case "weapon-story-group": {
      const group = await sdk.revalidationGetWeaponGroup({
        id: body.entry.id,
      });
      filterHasAttributes(group.weaponStoryGroup?.data?.attributes?.weapons?.data, [
        "attributes.slug",
      ]).forEach((weapon) => paths.push(`/wiki/weapons/${weapon.attributes.slug}`));
      break;
    }

    case "custom": {
      paths.push(`${body.path}`);
      break;
    }

    default:
      console.log("Unknown case");
      break;
  }

  console.table(paths);
  const localizedPaths = cartesianProduct(i18n.locales, paths).map(
    ([locale, path]) => `/${locale}${path}`
  );

  try {
    Promise.all(
      localizedPaths.map(async (path) => {
        await res.revalidate(path);
      })
    );
    res.json({ message: "Success!", revalidated: true });
    return;
  } catch (error) {
    res.status(500).send({ message: `Error revalidating: ${error}`, revalidated: false });
  }
};
export default Revalidate;
