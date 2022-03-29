import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

export type RequestProps =
  | HookRangedContent
  | HookPostContent
  | HookLibraryItem
  | HookChronology
  | HookContent
  | HookCustom;

export type HookRangedContent = {
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

export type HookCustom = {
  model: "custom";
  url: string;
};

export type HookContent = {
  model: "content";
  entry: {
    slug: string;
  };
};

export type HookPostContent = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: "post";
  entry: {
    slug: string;
  };
};

export type HookLibraryItem = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: "library-item";
  entry: {
    slug: string;
  };
};

export type HookChronology = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: "chronology-era" | "chronology-item";
};

export type ResponseMailProps = {
  message: string;
  revalidated: boolean;
};

export default async function Mail(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMailProps>
) {
  console.log(req.body);
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

  console.table(paths);

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
