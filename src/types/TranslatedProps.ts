export type TranslatedProps<P, K extends keyof P> = Omit<P, K> & {
  translations: (Pick<P, K> & { language: string })[];
  fallback: Pick<P, K>;
};
