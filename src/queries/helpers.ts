export const queryGraphQL = async (query: string, variables?: string) => {
  const res = await fetch(process.env.URL_GRAPHQL, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: variables
    }),
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + process.env.ACCESS_TOKEN,
    },
  });
  return (await res.json()).data;
};

export function getAssetURL(url: string): string {
  return process.env.NEXT_PUBLIC_URL_CMS + url;
}

export type Source = {
  data: {
    attributes: {
      name: string;
    };
  };
};

export type UploadImage = {
  data: {
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      url: string;
    };
  };
};

export type BasicPrice = {
  amount: number;
  currency: BasicCurrency;
};

export type BasicCurrency = {
  data: {
    attributes: {
      symbol: string;
      code: string;
    };
  };
};

export type BasicSize = {
  width: number;
  height: number;
  thickness: number;
};

export type BasicDate = {
  year: number;
  month: number;
  day: number;
};
