import type { NextApiRequest, NextApiResponse } from "next";
import { i18n } from "../../../next.config";
import { cartesianProduct } from "helpers/others";

type CRUDEvents = "entry.create" | "entry.delete" | "entry.update";

type StrapiEvent = {
  event: CRUDEvents;
  model: string;
  entry: Record<string, unknown>;
};

type RequestProps =
  | CustomRequest
  | StrapiChronicle
  | StrapiChronicleChapter
  | StrapiChronology
  | StrapiContent
  | StrapiContentFolder
  | StrapiLibraryItem
  | StrapiPostContent
  | StrapiRangedContent
  | StrapiWiki;

interface CustomRequest {
  model: "custom";
  path: string;
}

interface StrapiRangedContent extends StrapiEvent {
  event: CRUDEvents;
  model: "ranged-content";
  entry: {
    library_item?: {
      slug: string;
    };
    content?: {
      slug: string;
    };
  };
}

interface StrapiContent extends StrapiEvent {
  model: "content";
  entry: {
    slug: string;
    folder?: {
      slug: string;
    };
    ranged_contents: {
      slug: string;
    }[];
  };
}

interface StrapiPostContent extends StrapiEvent {
  event: CRUDEvents;
  model: "post";
  entry: {
    slug: string;
  };
}

interface StrapiLibraryItem extends StrapiEvent {
  event: CRUDEvents;
  model: "library-item";
  entry: {
    slug: string;
    subitem_of: [
      {
        slug: string;
      }
    ];
  };
}

interface StrapiContentFolder extends StrapiEvent {
  event: CRUDEvents;
  model: "contents-folder";
  entry: {
    slug: string;
    parent_folder?: {
      slug: string;
    };
    subfolders: { slug: string }[];
    contents: {
      slug: string;
    }[];
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

type ResponseMailProps = {
  message: string;
  revalidated: boolean;
};

const Revalidate = (req: NextApiRequest, res: NextApiResponse<ResponseMailProps>): void => {
  const body = req.body as RequestProps;

  // Check for secret to confirm this is a valid request
  if (req.headers.authorization !== `Bearer ${process.env.REVALIDATION_TOKEN}`) {
    res.status(401).json({ message: "Invalid token", revalidated: false });
    return;
  }

  const paths: string[] = [];

  switch (body.model) {
    case "post": {
      paths.push(`/news`);
      paths.push(`/news/${body.entry.slug}`);
      break;
    }

    case "library-item": {
      paths.push(`/library`);
      paths.push(`/library/${body.entry.slug}`);
      paths.push(`/library/${body.entry.slug}/scans`);
      body.entry.subitem_of.forEach((parentItem) => {
        paths.push(`/library/${parentItem.slug}`);
      });
      break;
    }

    case "content": {
      paths.push(`/contents`);
      paths.push(`/contents/all`);
      paths.push(`/contents/${body.entry.slug}`);
      if (body.entry.folder?.slug) {
        paths.push(`/contents/folder/${body.entry.folder.slug}`);
      }
      if (body.entry.ranged_contents.length > 0) {
        body.entry.ranged_contents.forEach((ranged_content) => {
          const parentSlug = ranged_content.slug.slice(
            0,
            ranged_content.slug.length - body.entry.slug.length - 1
          );
          paths.push(`/library/${parentSlug}`);
          paths.push(`/library/${parentSlug}/scans`);
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
      if (body.entry.library_item) {
        paths.push(`/library/${body.entry.library_item.slug}`);
        paths.push(`/library/${body.entry.library_item.slug}/scans`);
      }
      if (body.entry.content) {
        paths.push(`/contents/${body.entry.content.slug}`);
      }
      break;
    }

    case "contents-folder": {
      if (body.entry.slug === "root") {
        paths.push(`/contents`);
      }
      paths.push(`/contents/folder/${body.entry.slug}`);
      if (body.entry.parent_folder) {
        paths.push(`/contents/folder/${body.entry.parent_folder.slug}`);
      }
      body.entry.subfolders.forEach((subfolder) =>
        paths.push(`/contents/folder/${subfolder.slug}`)
      );
      body.entry.contents.forEach((content) => paths.push(`/contents/${content.slug}`));
      break;
    }

    case "wiki-page": {
      paths.push(`/wiki`);
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

    case "custom": {
      paths.push(`${body.path}`);
      break;
    }

    default:
      console.log(body);
      break;
  }

  const localizedPaths = cartesianProduct(i18n.locales, paths).map(
    ([locale, path]) => `/${locale}${path}`
  );
  console.table(localizedPaths);

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
