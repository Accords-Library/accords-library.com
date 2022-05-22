import { AppLayout } from "components/AppLayout";
import { Button } from "components/Inputs/Button";
import { Markdawn } from "components/Markdown/Markdawn";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { Popup } from "components/Popup";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { Immutable } from "helpers/types";
import { GetStaticPropsContext } from "next";
import { useCallback, useState } from "react";
import TurndownService from "turndown";
import { Ico, Icon } from "components/Ico";

interface Props extends AppStaticProps {}

export default function Editor(props: Immutable<Props>): JSX.Element {
  const handleInput = useCallback((text: string) => {
    setMarkdown(text);
  }, []);

  const [markdown, setMarkdown] = useState("");
  const [converterOpened, setConverterOpened] = useState(false);

  function insert(
    text: string,
    prepend: string,
    append: string,
    selectionStart: number,
    selectionEnd: number
  ): string {
    let newText = text.slice(0, selectionStart);
    newText += prepend;
    newText += text.slice(selectionStart, selectionEnd);
    newText += append;
    newText += text.slice(selectionEnd);
    return newText;
  }

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.large}>
      <Popup setState={setConverterOpened} state={converterOpened}>
        <div className="text-center">
          <h2 className="mt-4">Convert HTML to markdown</h2>
          <p>
            Copy and paste any HTML content (content from web pages) here.{" "}
            <br />
            The text will immediatly be converted to valid Markdown.
            <br />
            You can then copy the converted text and paste it anywhere you want
            in the editor
          </p>
        </div>
        <textarea
          readOnly
          id="htmlMdTextArea"
          title="Ouput textarea"
          onPaste={(event) => {
            const turndownService = new TurndownService({
              headingStyle: "atx",
              codeBlockStyle: "fenced",
              bulletListMarker: "-",
              emDelimiter: "_",
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
          className="h-[50vh] w-[50vw] font-monospace mobile:w-[75vw]"
        />
      </Popup>
      <div className="mb-4 flex flex-row gap-2">
        <ToolTip
          placement="bottom"
          content={
            <>
              <h3 className="text-lg">Transcript container</h3>
              <p>
                Use this to create dialogues and transcripts. You can then add
                transcript speech line within (
                <Ico className="text-xs" icon={Icon.RecordVoiceOver} />)
              </p>
            </>
          }
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;
              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                "\n<Transcript>\n",
                "\n</Transcript>\n",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.QuestionAnswer}
          />
        </ToolTip>
        <ToolTip
          placement="bottom"
          content={
            <>
              <h3 className="text-lg">Transcript speech line</h3>
              <p>
                Use to add a dialogue/transcript line. Change the{" "}
                <kbd>name</kbd> property to chang the name of the speaker
              </p>
            </>
          }
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;

              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                '<Line name="speaker">',
                "</Line>\n",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.RecordVoiceOver}
          />
        </ToolTip>
        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Vertical spacer</h3>}
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;
              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                "<Sep />",
                "",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.DensityLarge}
          />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Inset box</h3>}
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;
              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                "\n<InsetBox>\n",
                "\n</InsetBox>\n",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.CheckBoxOutlineBlank}
          />
        </ToolTip>
        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Scene break</h3>}
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;
              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                "\n\n<SceneBreak />\n\n",
                "",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.MoreHoriz}
          />
        </ToolTip>
        <ToolTip
          content={
            <div className="flex flex-col place-items-center gap-2">
              <h3 className="text-lg">Intralink</h3>
              <ToolTip
                placement="right"
                content={
                  <>
                    <h3 className="text-lg">Intralink</h3>
                    <p className="text-xs">
                      Interlinks are used to add links to a header within the
                      same document
                    </p>
                  </>
                }
              >
                <Button
                  onClick={() => {
                    const textarea = document.querySelector(
                      "#editorTextArea"
                    ) as HTMLTextAreaElement;
                    const { value, selectionStart, selectionEnd } = textarea;
                    textarea.value = insert(
                      value,
                      "<IntraLink>",
                      "</IntraLink>",
                      selectionStart,
                      selectionEnd
                    );
                    handleInput(textarea.value);
                  }}
                  icon={Icon.Link}
                />
              </ToolTip>
              <ToolTip
                placement="right"
                content={
                  <>
                    <h3 className="text-lg">Intralink (with target)</h3>{" "}
                    <p className="text-xs">
                      Use this one if you want the intralink text to be
                      different from the target header&rsquo;s name.
                    </p>
                  </>
                }
              >
                <Button
                  onClick={() => {
                    const textarea = document.querySelector(
                      "#editorTextArea"
                    ) as HTMLTextAreaElement;
                    const { value, selectionStart, selectionEnd } = textarea;
                    textarea.value = insert(
                      value,
                      '<IntraLink target="target">',
                      "</IntraLink>",
                      selectionStart,
                      selectionEnd
                    );
                    handleInput(textarea.value);
                  }}
                  icon={Icon.Link}
                  text="+ target"
                />
              </ToolTip>
            </div>
          }
        >
          <Button icon={Icon.Link} />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Player&rsquo;s name placeholder</h3>}
        >
          <Button
            onClick={() => {
              const textarea = document.querySelector(
                "#editorTextArea"
              ) as HTMLTextAreaElement;
              const { value, selectionStart, selectionEnd } = textarea;
              textarea.value = insert(
                value,
                "<player>",
                "",
                selectionStart,
                selectionEnd
              );
              handleInput(textarea.value);
            }}
            icon={Icon.Person}
          />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Open HTML Converter</h3>}
        >
          <Button
            onClick={() => {
              setConverterOpened(true);
            }}
            icon={Icon.Html}
          />
        </ToolTip>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2>Editor</h2>
          <textarea
            id="editorTextArea"
            onInput={(event) => {
              const textarea = event.target as HTMLTextAreaElement;
              handleInput(textarea.value);
            }}
            className="h-[70vh] w-full rounded-xl
            bg-mid !bg-opacity-40 p-8 font-monospace text-black outline-none"
            value={markdown}
            title="Input textarea"
          />
        </div>
        <div>
          <h2>Preview</h2>
          <div className="h-[70vh] overflow-scroll rounded-xl bg-mid bg-opacity-40 p-8">
            <Markdawn className="w-full" text={markdown} />
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
): Promise<{ notFound: boolean } | { props: Props }> {
  const props: Props = {
    ...(await getAppStaticProps(context)),
  };
  return {
    props: props,
  };
}
