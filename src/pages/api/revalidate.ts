import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

type RequestProps =
  | HookRangedContent
  | HookPostContent
  | HookLibraryItem
  | HookChronology
  | HookContent
  | HookCustom;

type HookRangedContent = {
  event: "entry.update" | "entry.delete" | "entry.create";
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
  };
};

type HookPostContent = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: "post";
  entry: {
    slug: string;
  };
};

type HookLibraryItem = {
  event: "entry.update" | "entry.delete" | "entry.create";
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

type HookChronology = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: "chronology-era" | "chronology-item";
};

type ResponseMailProps = {
  message: string;
  revalidated: boolean;
};

export default async function Mail(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMailProps>
) {
  const body = req.body as RequestProps;
  const { serverRuntimeConfig } = getConfig();

  // Check for secret to confirm this is a valid request
  if (
    req.headers.authorization !== `Bearer ${process.env.REVALIDATION_TOKEN}`
  ) {
    return res
      .status(401)
      .json({ message: "Invalid token", revalidated: false });
  }

  const paths: string[] = [];

  switch (body.model) {
    case "post": {
      paths.push(`/news`);
      paths.push(`/news/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/news/${body.entry.slug}`);
        paths.push(`/${locale}/news`);
      });
      break;
    }

    case "library-item": {
      paths.push(`/library`);
      paths.push(`/library/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/library/${body.entry.slug}`);
        body.entry.subitem_of.map((parentItem) => {
          paths.push(`/${locale}/library/${parentItem.slug}`);
        });
        paths.push(`/${locale}/library`);
      });
      break;
    }

    case "content": {
      paths.push(`/contents`);
      paths.push(`/contents/${body.entry.slug}`);
      serverRuntimeConfig.locales?.map((locale: string) => {
        paths.push(`/${locale}/contents/${body.entry.slug}`);
        paths.push(`/${locale}/contents`);
      });
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

    case "custom": {
      paths.push(`${body.url}`);
      break;
    }

    case "content": {
      break;
    }

    default:
      break;
  }

  //console.table(paths);

  try {
    Promise.all(
      paths.map(async (path) => {
        await res.unstable_revalidate(path);
      })
    );
    return res.json({ message: "Success!", revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send({ message: "Error revalidating", revalidated: false });
  }
}
