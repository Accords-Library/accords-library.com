import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { GetStaticProps } from "next";
import AppLayout from "components/AppLayout";
import { useCallback, useState } from "react";
import Markdawn from "components/Markdown/Markdawn";
import Script from "next/script";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { useRouter } from "next/router";

interface EditorProps extends AppStaticProps {}

export default function Editor(props: EditorProps): JSX.Element {
  const { langui } = props;
  const router = useRouter();

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

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2>Editor</h2>
          <textarea
            id="editorTextArea"
            onInput={handleInput}
            className="bg-mid rounded-xl p-8 w-full font-monospace"
            value={markdown}
            title="Input textarea"
          />

          <h2 className="mt-4">Convert text to markdown</h2>
          <textarea
            readOnly
            id="htmlMdTextArea"
            title="Ouput textarea"
            onPaste={(event) => {
              const TurndownService = require("turndown").default;
              const turndownService = new TurndownService({
                headingStyle: "atx",
                codeBlockStyle: "fenced",
                bulletListMarker: "-",
                emDelimiter: "*",
                strongDelimiter: "**",
              });

              let paste = event.clipboardData.getData("text/html");
              paste = paste.replace(/<\!--.*?-->/g, "");
              paste = turndownService.turndown(paste);
              paste = paste.replace(/<\!--.*?-->/g, "");

              const target = event.target as HTMLTextAreaElement;
              target.value = paste;
              target.select();
              event.preventDefault();
            }}
            className="font-monospace"
          />
        </div>
        <div>
          <h2>Preview</h2>
          <div className="bg-mid rounded-xl p-8">
            <Markdawn router={router} className="max-w-full" text={markdown} />
          </div>
        </div>
      </div>
    </ContentPanel>
  );
  return (
    <AppLayout
      navTitle="Markdawn Editor"
      contentPanel={contentPanel}
      {...props}
    />
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const props: EditorProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
};
