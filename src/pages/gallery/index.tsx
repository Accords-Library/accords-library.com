import { applyCustomAppProps } from "pages/_app";

applyCustomAppProps(Chronology, {
  useSubPanel: false,
  useContentPanel: true,
});

export default function Chronology(): JSX.Element {
  return (
    <>
    <iframe className="w-full h-screen" src="https://gallery.accords-library.com/posts"></iframe>
    </>
  );
}
