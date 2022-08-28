import { GetStaticProps } from "next";
import { useCallback, useMemo, useRef, useState } from "react";
import TurndownService from "turndown";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Button } from "components/Inputs/Button";
import { Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { ContentPanel, ContentPanelWidthSizes } from "components/Panels/ContentPanel";
import { Popup } from "components/Popup";
import { ToolTip } from "components/ToolTip";
import { Icon } from "components/Ico";
import { getOpenGraph } from "helpers/openGraph";
import { getLangui } from "graphql/fetchLocalData";

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Editor = (props: Props): JSX.Element => {
  const handleInput = useCallback((text: string) => {
    setMarkdown(text);
  }, []);

  const [markdown, setMarkdown] = useState("");
  const [converterOpened, setConverterOpened] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const transformationWrapper = useCallback(
    (
      transformation: (
        value: string,
        selectionStart: number,
        selectedEnd: number
      ) => { prependLength: number; transformedValue: string }
    ) => {
      if (textAreaRef.current) {
        const { value, selectionStart, selectionEnd } = textAreaRef.current;

        const { prependLength, transformedValue } = transformation(
          value,
          selectionStart,
          selectionEnd
        );

        textAreaRef.current.value = transformedValue;
        handleInput(textAreaRef.current.value);

        textAreaRef.current.focus();
        textAreaRef.current.selectionStart = selectionStart + prependLength;
        textAreaRef.current.selectionEnd = selectionEnd + prependLength;
      }
    },
    [handleInput]
  );

  const wrap = useCallback(
    (wrapper: string, properties?: Record<string, string>, addInnerNewLines?: boolean) => {
      transformationWrapper((value, selectionStart, selectionEnd) => {
        let prepend = wrapper;
        let append = wrapper;

        if (properties) {
          prepend = `<${wrapper}${Object.entries(properties).map(
            ([propertyName, propertyValue]) => ` ${propertyName}="${propertyValue}"`
          )}>`;
          append = `</${wrapper}>`;
        }

        if (addInnerNewLines === true) {
          prepend = `${prepend}\n`;
          append = `\n${append}`;
        }

        let newValue = "";
        newValue += value.slice(0, selectionStart);
        newValue += prepend;
        newValue += value.slice(selectionStart, selectionEnd);
        newValue += append;
        newValue += value.slice(selectionEnd);
        return { prependLength: prepend.length, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const unwrap = useCallback(
    (wrapper: string) => {
      transformationWrapper((value, selectionStart, selectionEnd) => {
        let newValue = "";
        newValue += value.slice(0, selectionStart - wrapper.length);
        newValue += value.slice(selectionStart, selectionEnd);
        newValue += value.slice(wrapper.length + selectionEnd);
        return { prependLength: -wrapper.length, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const toggleWrap = useCallback(
    (wrapper: string, properties?: Record<string, string>, addInnerNewLines?: boolean) => {
      if (textAreaRef.current) {
        const { value, selectionStart, selectionEnd } = textAreaRef.current;

        if (
          value.slice(selectionStart - wrapper.length, selectionStart) === wrapper &&
          value.slice(selectionEnd, selectionEnd + wrapper.length) === wrapper
        ) {
          unwrap(wrapper);
        } else {
          wrap(wrapper, properties, addInnerNewLines);
        }
      }
    },
    [unwrap, wrap]
  );

  const preline = useCallback(
    (prepend: string) => {
      transformationWrapper((value, selectionStart) => {
        const lastNewLine = value.slice(0, selectionStart).lastIndexOf("\n") + 1;

        let newValue = "";
        newValue += value.slice(0, lastNewLine);
        newValue += prepend;
        newValue += value.slice(lastNewLine);

        return { prependLength: prepend.length, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const insert = useCallback(
    (prepend: string) => {
      transformationWrapper((value, selectionStart) => {
        let newValue = "";
        newValue += value.slice(0, selectionStart);
        newValue += prepend;
        newValue += value.slice(selectionStart);

        return { prependLength: prepend.length, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const appendDoc = useCallback(
    (append: string) => {
      transformationWrapper((value) => {
        const newValue = value + append;
        return { prependLength: 0, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel width={ContentPanelWidthSizes.Full}>
        <Popup onClose={() => setConverterOpened(false)} state={converterOpened}>
          <div className="text-center">
            <h2 className="mt-4">Convert HTML to markdown</h2>
            <p>
              Copy and paste any HTML content (content from web pages) here.
              <br />
              The text will immediatly be converted to valid Markdown.
              <br />
              You can then copy the converted text and paste it anywhere you want in the editor
            </p>
          </div>
          <textarea
            readOnly
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
            className="h-[50vh] w-[50vw]"
          />
        </Popup>

        <div className="mb-4 flex flex-row gap-2">
          <ToolTip
            content={
              <div className="grid gap-2">
                <h3 className="text-lg">Headers</h3>
                <Button onClick={() => preline("# ")} text={"H1"} />
                <Button onClick={() => preline("## ")} text={"H2"} />
                <Button onClick={() => preline("### ")} text={"H3"} />
                <Button onClick={() => preline("#### ")} text={"H4"} />
                <Button onClick={() => preline("##### ")} text={"H5"} />
                <Button onClick={() => preline("###### ")} text={"H6"} />
              </div>
            }>
            <Button icon={Icon.Title} />
          </ToolTip>

          <ToolTip placement="bottom" content={<h3 className="text-lg">Toggle Bold</h3>}>
            <Button onClick={() => toggleWrap("**")} icon={Icon.FormatBold} />
          </ToolTip>

          <ToolTip placement="bottom" content={<h3 className="text-lg">Toggle Italic</h3>}>
            <Button onClick={() => toggleWrap("_")} icon={Icon.FormatItalic} />
          </ToolTip>

          <ToolTip
            placement="bottom"
            content={
              <>
                <h3 className="text-lg">Toggle Inline Code</h3>
                <p>
                  Makes the text monospace (like text from a computer terminal). Usually used for
                  stylistic purposes in transcripts.
                </p>
              </>
            }>
            <Button onClick={() => toggleWrap("`")} icon={Icon.Code} />
          </ToolTip>

          <ToolTip
            placement="bottom"
            content={
              <>
                <h3 className="text-lg">Insert footnote</h3>
                <p>When inserted &ldquo;x&rdquo;</p>
              </>
            }>
            <Button
              onClick={() => {
                insert("[^x]");
                appendDoc("\n\n[^x]: This is a footnote.");
              }}
              icon={Icon.Superscript}
            />
          </ToolTip>

          <ToolTip
            placement="bottom"
            content={
              <>
                <h3 className="text-lg">Transcripts</h3>
                <p>
                  Use this to create dialogues and transcripts. Start by adding a container, then
                  add transcript speech line within.
                </p>
                <div className="grid gap-2">
                  <ToolTip
                    placement="right"
                    content={
                      <>
                        <h3 className="text-lg">Transcript container</h3>
                      </>
                    }>
                    <Button onClick={() => wrap("Transcript", {}, true)} icon={Icon.AddBox} />
                  </ToolTip>
                  <ToolTip
                    placement="right"
                    content={
                      <>
                        <h3 className="text-lg">Transcript speech line</h3>
                        <p>
                          Use to add a dialogue/transcript line. Change the <kbd>name</kbd> property
                          to chang the name of the speaker
                        </p>
                      </>
                    }>
                    <Button
                      onClick={() => wrap("Line", { name: "speaker" })}
                      icon={Icon.RecordVoiceOver}
                    />
                  </ToolTip>
                </div>
              </>
            }>
            <Button icon={Icon.RecordVoiceOver} />
          </ToolTip>

          <ToolTip placement="bottom" content={<h3 className="text-lg">Inset box</h3>}>
            <Button onClick={() => wrap("InsetBox", {}, true)} icon={Icon.CheckBoxOutlineBlank} />
          </ToolTip>
          <ToolTip placement="bottom" content={<h3 className="text-lg">Scene break</h3>}>
            <Button onClick={() => insert("\n* * *\n")} icon={Icon.MoreHoriz} />
          </ToolTip>
          <ToolTip
            content={
              <div className="flex flex-col place-items-center gap-2">
                <h3 className="text-lg">Links</h3>
                <ToolTip
                  placement="right"
                  content={
                    <>
                      <h3 className="text-lg">External Link</h3>
                      <p className="text-xs">Provides a link to another webpage / website</p>
                    </>
                  }>
                  <Button
                    onClick={() => insert("[Link name](https://domain.com)")}
                    icon={Icon.Link}
                    text={"External"}
                  />
                </ToolTip>

                <ToolTip
                  placement="right"
                  content={
                    <>
                      <h3 className="text-lg">Intralink</h3>
                      <p className="text-xs">
                        Interlinks are used to add links to a header within the same document
                      </p>
                    </>
                  }>
                  <Button
                    onClick={() => wrap("IntraLink", {})}
                    icon={Icon.Link}
                    text={"Internal"}
                  />
                </ToolTip>
                <ToolTip
                  placement="right"
                  content={
                    <>
                      <h3 className="text-lg">Intralink (with target)</h3>{" "}
                      <p className="text-xs">
                        Use this one if you want the intralink text to be different from the target
                        header&rsquo;s name.
                      </p>
                    </>
                  }>
                  <Button
                    onClick={() => wrap("IntraLink", { target: "target" })}
                    icon={Icon.Link}
                    text="Internal (w/ target)"
                  />
                </ToolTip>
              </div>
            }>
            <Button icon={Icon.Link} />
          </ToolTip>

          <ToolTip
            placement="bottom"
            content={<h3 className="text-lg">Player&rsquo;s name placeholder</h3>}>
            <Button onClick={() => insert("@player")} icon={Icon.Person} />
          </ToolTip>

          <ToolTip placement="bottom" content={<h3 className="text-lg">Open HTML Converter</h3>}>
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
              ref={textAreaRef}
              onInput={(event) => {
                const textarea = event.target as HTMLTextAreaElement;
                handleInput(textarea.value);
              }}
              className="h-[70vh] w-full rounded-xl bg-mid !bg-opacity-40 p-8
            font-mono text-black outline-none"
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

        <div className="mt-8">
          <TableOfContents text={markdown} />
        </div>
      </ContentPanel>
    ),
    [appendDoc, converterOpened, handleInput, insert, markdown, preline, toggleWrap, wrap]
  );

  return <AppLayout contentPanel={contentPanel} {...props} />;
};
export default Editor;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const langui = getLangui(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(langui, "Markdawn Editor"),
  };
  return {
    props: props,
  };
};
