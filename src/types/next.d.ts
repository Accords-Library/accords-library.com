export {};

declare global {
  type Params = Record<string, string>;
  type SearchParams = Record<string, string>;

  type Layout = (props: { children: React.ReactNode; params: Params }) => JSX.Element;
  type Template = Layout;

  type Page = (props: { params: Params; searchParams: SearchParams }) => JSX.Element;

  type Loading = () => JSX.Element;
  type NotFound = () => Loading;

  type Head = (props: { params: Params }) => JSX.Element;

  type Error = (props: { error: Error; reset: () => void }) => JSX.Element;

  type GenerateStaticParams = () => Record<string, string[] | string>[];
}
