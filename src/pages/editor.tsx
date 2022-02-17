import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { getWebsiteInterface } from "graphql/operations";
import { GetStaticProps } from "next";
import { GetWebsiteInterfaceQuery } from "graphql/operations-types";
import AppLayout from "components/AppLayout";
import { useCallback, useState } from "react";
import Markdawn from "components/Markdown/Markdawn";
import Script from "next/script";

type EditorProps = {
  langui: GetWebsiteInterfaceQuery;
};

export default function Editor(props: EditorProps): JSX.Element {
  const langui = props.langui.websiteInterfaces.data[0].attributes;

  const handleInput = useCallback((e) => {
    setMarkdown(e.target.value);
  }, []);

  const [markdown, setMarkdown] = useState("");

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <Script
        id="autoFitTextArea"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          const el = document.querySelector("#editorTextArea")
          el.addEventListener('input', function() {
            this.style.height = (this.scrollHeight) + 'px';
          });
          `,
        }}
      />

      <div className="grid grid-cols-2 gap-4 h-96">
        <div>
          <h2>Editor</h2>
          <textarea
            id="editorTextArea"
            onInput={handleInput}
            onPaste={(event) => {
              event.preventDefault();
              let paste = event.clipboardData.getData("text/html");
              paste = paste.replaceAll("<html>", "");
              paste = paste.replaceAll("<body>", "");
              paste = paste.replaceAll("</body>", "");
              paste = paste.replaceAll("</html>", "");
              paste = paste.replaceAll("<!--StartFragment-->", "");
              paste = paste.replaceAll("<!--EndFragment-->", "");
              event.target.value = paste;
            }}
            className="bg-mid rounded-xl p-8 w-full "
            value={markdown}
          />
        </div>
        <div>
          <h2>Preview</h2>
          <div className="bg-mid rounded-xl p-8">
            <Markdawn className="max-w-full" text={markdown} />
          </div>
        </div>
      </div>
    </ContentPanel>
  );
  return <AppLayout title="404" langui={langui} contentPanel={contentPanel} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale) {
    const props: EditorProps = {
      langui: await getWebsiteInterface({
        language_code: context.locale,
      }),
    };
    return {
      props: props,
    };
  }
  return { props: {} };
};
