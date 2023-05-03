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

type StrapiRelationalFieldEntry = {
  id: string;
  slug: string;
};

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
    library_item?: StrapiRelationalFieldEntry;
    content?: StrapiRelationalFieldEntry;
  };
}

interface StrapiContent extends StrapiEvent {
  model: "content";
  entry: {
    slug: string;
    folder?: StrapiRelationalFieldEntry;
    ranged_contents: StrapiRelationalFieldEntry[];
    next_contents: StrapiRelationalFieldEntry[];
    previous_contents: StrapiRelationalFieldEntry[];
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
    subitems: StrapiRelationalFieldEntry[];
    subitem_of: StrapiRelationalFieldEntry[];
    contents: StrapiRelationalFieldEntry[];
  };
}

interface StrapiContentFolder extends StrapiEvent {
  event: CRUDEvents;
  model: "contents-folder";
  entry: {
    slug: string;
    parent_folder?: StrapiRelationalFieldEntry;
    subfolders: StrapiRelationalFieldEntry[];
    contents: StrapiRelationalFieldEntry[];
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
    chronicles: StrapiRelationalFieldEntry[];
  };
}

interface StrapiVideo extends StrapiEvent {
  event: CRUDEvents;
  model: "video";
  entry: {
    uid: string;
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

  console.log(JSON.stringify(body, null, 2));

  switch (body.model) {
    case "post": {
      paths.push(`/news/${body.entry.slug}`);
      break;
    }

    case "library-item": {
      paths.push(`/library/${body.entry.slug}`);
      paths.push(`/library/${body.entry.slug}/reader`);

      body.entry.subitem_of.map(({ slug: subItemOfSlug }) => {
        paths.push(`/library/${subItemOfSlug}`);
      }, []);

      body.entry.subitems.map(({ slug: subItemSlug }) => {
        paths.push(`/library/${subItemSlug}`);
      }, []);

      await Promise.all(
        body.entry.contents.map(async ({ id }) => {
          const rangedContent = await sdk.revalidationGetRangedContent({
            id,
          });

          const contentSlug =
            rangedContent.rangedContent?.data?.attributes?.content?.data?.attributes?.slug;
          if (contentSlug) {
            paths.push(`/contents/${contentSlug}`);
          }
        })
      );

      break;
    }

    case "content": {
      paths.push(`/contents/${body.entry.slug}`);

      const folderSlug = body.entry.folder?.slug;
      if (folderSlug) {
        if (folderSlug === "root") {
          paths.push(`/contents`);
        } else {
          paths.push(`/contents/folder/${body.entry.folder?.slug}`);
        }
      }

      body.entry.previous_contents.forEach(({ slug }) => paths.push(`/contents/${slug}`));
      body.entry.next_contents.forEach(({ slug }) => paths.push(`/contents/${slug}`));

      await Promise.all(
        body.entry.ranged_contents.map(async ({ id }) => {
          const rangedContent = await sdk.revalidationGetRangedContent({
            id,
          });

          const libraryItemSlug =
            rangedContent.rangedContent?.data?.attributes?.library_item?.data?.attributes?.slug;
          if (libraryItemSlug) {
            paths.push(`/library/${libraryItemSlug}`);
            paths.push(`/library/${libraryItemSlug}/reader`);
          }
        })
      );

      break;
    }

    case "chronology-era":
    case "chronology-item": {
      paths.push(`/wiki/chronology`);
      break;
    }

    case "ranged-content": {
      const libraryItemSlug = body.entry.library_item?.slug;
      const contentSlug = body.entry.content?.slug;
      if (libraryItemSlug) {
        paths.push(`/library/${libraryItemSlug}`);
      }
      if (contentSlug) {
        paths.push(`/contents/${contentSlug}`);
      }
      break;
    }

    case "contents-folder": {
      if (body.entry.slug === "root") {
        paths.push(`/contents`);
      } else {
        paths.push(`/contents/folder/${body.entry.slug}`);
      }

      body.entry.contents.map(({ slug: contentSlug }) => {
        paths.push(`/contents/${contentSlug}`);
      });

      if (body.entry.parent_folder) {
        if (body.entry.parent_folder.slug === "root") {
          paths.push(`/contents`);
        } else {
          paths.push(`/contents/folder/${body.entry.parent_folder.slug}`);
        }
      }

      body.entry.subfolders.map(({ slug: folderSlug }) => {
        paths.push(`/contents/folder/${folderSlug}`);
      });

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
