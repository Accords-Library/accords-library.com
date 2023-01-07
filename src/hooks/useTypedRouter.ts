import { NextRouter, useRouter } from "next/router";
import { useCallback } from "react";
import { z } from "zod";

interface TypeRouter<T extends z.Schema> extends Omit<NextRouter, "query"> {
  query: z.TypeOf<T>;
  updateQuery: (queryParams: z.TypeOf<T>) => void;
}

export const useTypedRouter = <T extends z.Schema>(schema: T): TypeRouter<T> => {
  const { query, ...router } = useRouter();

  const updateQuery = useCallback(
    async (queryParams: z.TypeOf<T>) => {
      Object.keys(queryParams).map((key: keyof typeof queryParams) => {
        if (typeof queryParams[key] === "boolean") {
          queryParams[key] = queryParams[key] ? "true" : undefined;
        }
      });
      await router.replace(
        { pathname: router.pathname, query: { ...query, ...queryParams } },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [router, query]
  );

  return {
    query: schema.parse(query) as z.infer<typeof schema>,
    updateQuery,
    ...router,
  };
};
