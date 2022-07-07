import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

type RequestProps =
  | HookChronology
  | HookContent
  | HookContentGroup
  | HookCustom
  | HookLibraryItem
  | HookPostContent
  | HookRangedContent
  | HookWiki;

type HookRangedContent = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "ranged-content";
  entry: {
    library_item?: {
      slug: string;
    };
    content?: {
      slug: string;
    };
  };
};

type HookCustom = {
  model: "custom";
  url: string;
};

type HookContent = {
  model: "content";
  entry: {
    slug: string;
    ranged_contents: {
      slug: string;
    }[];
  };
};

type HookPostContent = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "post";
  entry: {
    slug: string;
  };
};

type HookLibraryItem = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "library-item";
  entry: {
    slug: string;
    subitem_of: [
      {
        slug: string;
      }
    ];
  };
};

type HookContentGroup = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "contents-group";
  entry: {
    contents: {
      slug: string;
    }[];
  };
};

type HookChronology = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "chronology-era" | "chronology-item";
};

type HookWiki = {
  event: "entry.create" | "entry.delete" | "entry.update";
  model: "wiki-page";
  entry: {
    slug: string;
  };
};

type ResponseMailProps = {
  message: string;
  revalidated: boolean;
};

const Revalidate = (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMailProps>
): void => {
  const body = req.body as RequestProps;
  const { serverRuntimeConfig } = getConfig();

  // Check for secret to confirm this is a valid request
  if (
    req.headers.authorization !== `Bearer ${process.env.REVALIDATION_TOKEN}`
  ) {
    res.status(401).json({ message: "Invalid token", revalidated: false });
    return;
  }

  const paths: string[] = [];

  switch (body.model) {
    case "post": {
      paths.push(`/news`);
      paths.push(`/news/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/news`);
        paths.push(`/${locale}/news/${body.entry.slug}`);
      });
      break;
    }

    case "library-item": {
      paths.push(`/library`);
      paths.push(`/library/${body.entry.slug}`);
      paths.push(`/library/${body.entry.slug}/scans`);
      body.entry.subitem_of.map((parentItem) => {
        paths.push(`/library/${parentItem.slug}`);
      });
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/library`);
        paths.push(`/${locale}/library/${body.entry.slug}`);
        paths.push(`/${locale}/library/${body.entry.slug}/scans`);
        body.entry.subitem_of.map((parentItem) => {
          paths.push(`/${locale}/library/${parentItem.slug}`);
        });
      });
      break;
    }

    case "content": {
      paths.push(`/contents`);
      paths.push(`/contents/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/contents`);
        paths.push(`/${locale}/contents/${body.entry.slug}`);
      });
      if (body.entry.ranged_contents.length > 0) {
        body.entry.ranged_contents.map((ranged_content) => {
          const parentSlug = ranged_content.slug.slice(
            0,
            ranged_content.slug.length - body.entry.slug.length - 1
          );
          paths.push(`/library/${parentSlug}`);
          paths.push(`/library/${parentSlug}/scans`);
          serverRuntimeConfig.locales?.map((locale: string) => {
            paths.push(`/${locale}/library/${parentSlug}`);
            paths.push(`/${locale}/library/${parentSlug}/scans`);
          });
        });
      }
      break;
    }

    case "chronology-era":
    case "chronology-item": {
      paths.push(`/wiki/chronology`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/wiki/chronology`);
      });
      break;
    }

    case "ranged-content": {
      if (body.entry.library_item) {
        paths.push(`/library/${body.entry.library_item.slug}`);
        paths.push(`/library/${body.entry.library_item.slug}/scans`);
      }
      serverRuntimeConfig.locales?.map((locale: string) => {
        if (body.entry.library_item) {
          paths.push(`/${locale}/library/${body.entry.library_item.slug}`);
          paths.push(
            `/${locale}/library/${body.entry.library_item.slug}/scans`
          );
        }
      });
      break;
    }

    case "contents-group": {
      paths.push(`/contents`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/contents`);
      });
      body.entry.contents.map((content) => {
        paths.push(`/contents/${content.slug}`);
        serverRuntimeConfig.locales?.map((locale: string) => {
          paths.push(`/${locale}/contents/${content.slug}`);
        });
      });
      break;
    }

    case "wiki-page": {
      paths.push(`/wiki`);
      paths.push(`/wiki/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/wiki`);
        paths.push(`/${locale}/wiki/${body.entry.slug}`);
      });

      break;
    }

    case "custom": {
      paths.push(`${body.url}`);
      break;
    }

    default:
      console.log(body);
      break;
  }

  console.table(paths);

  try {
    Promise.all(
      paths.map(async (path) => {
        await res.revalidate(path);
      })
    );
    res.json({ message: "Success!", revalidated: true });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ message: `Error revalidating: ${error}`, revalidated: false });
  }
};
export default Revalidate;
