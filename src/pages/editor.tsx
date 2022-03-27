import AppLayout from "components/AppLayout";
import Markdawn from "components/Markdown/Markdawn";
import ContentPanel, {
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Script from "next/script";
import { AppStaticProps, getAppStaticProps } from "queries/getAppStaticProps";
import { useCallback, useState } from "react";
import { default as TurndownService } from "turndown";

interface EditorProps extends AppStaticProps {}

export default function Editor(props: EditorProps): JSX.Element {
  const router = useRouter();

  const handleInput = useCallback((event) => {
    setMarkdown(event.target.value);
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
              const turndownService = new TurndownService({
                headingStyle: "atx",
                codeBlockStyle: "fenced",
                bulletListMarker: "-",
                emDelimiter: "*",
                strongDelimiter: "**",
              });

              let paste = event.clipboardData.getData("text/html");
              paste = paste.replace(/<!--.*?-->/u, "");
              paste = turndownService.turndown(paste);
              paste = paste.replace(/<!--.*?-->/u, "");

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

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<{ props: EditorProps }> {
  const props: EditorProps = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
