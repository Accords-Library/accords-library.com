import type { NextApiRequest, NextApiResponse } from "next";

export type RequestMailProps = {
  event: "entry.update" | "entry.delete" | "entry.create";
  model: string;
  entry: {
    slug: string;
  };
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
  const body = req.body as RequestMailProps;

  // Check for secret to confirm this is a valid request
  if (
    req.headers.authorization !== `Bearer ${process.env.REVALIDATION_TOKEN}`
  ) {
    return res
      .status(401)
      .json({ message: "Invalid token", revalidated: false });
  }

  const uRLsToRevalidate: string[] = [];

  if (body.model === "post") {
    uRLsToRevalidate.push(`/news/${body.entry.slug}`);
  }

  console.table(uRLsToRevalidate);

  try {
    uRLsToRevalidate.map(async (url) => await res.unstable_revalidate(url));
    return res.json({ message: "Success!", revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .send({ message: "Error revalidating", revalidated: false });
  }
}
