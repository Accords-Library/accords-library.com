import { GetStaticProps } from "next";
import { useCallback, useRef, useState } from "react";
import TurndownService from "turndown";
import { atomWithStorage } from "jotai/utils";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Button } from "components/Inputs/Button";
import { getTocFromMarkdawn, Markdawn, TableOfContents } from "components/Markdown/Markdawn";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { Popup } from "components/Containers/Popup";
import { ToolTip } from "components/ToolTip";
import { getOpenGraph } from "helpers/openGraph";
import { getFormat } from "helpers/i18n";
import { isDefined } from "helpers/asserts";
import { atomPairing, useAtomPair } from "helpers/atoms";
import { ButtonGroup } from "components/Inputs/ButtonGroup";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

const markdownAtom = atomPairing(atomWithStorage("editorState", ""));

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const Editor = (props: Props): JSX.Element => {
  const [converterOpened, setConverterOpened] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [markdown, setMarkdown] = useAtomPair(markdownAtom);

  const transformationWrapper = useCallback(
    (
      transformation: (
        value: string,
        selectionStart: number,
        selectedEnd: number
      ) => { prependLength: number; selectionLength?: number; transformedValue: string }
    ) => {
      if (textAreaRef.current) {
        const { value, selectionStart, selectionEnd } = textAreaRef.current;

        const {
          prependLength,
          transformedValue,
          selectionLength = selectionEnd - selectionStart,
        } = transformation(value, selectionStart, selectionEnd);

        textAreaRef.current.value = transformedValue;
        setMarkdown(textAreaRef.current.value);

        textAreaRef.current.focus();
        textAreaRef.current.selectionStart = selectionStart + prependLength;
        textAreaRef.current.selectionEnd = selectionStart + selectionLength + prependLength;
      }
    },
    [setMarkdown]
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
    (openingWrapper: string, closingWrapper: string) => {
      transformationWrapper((value, selectionStart, selectionEnd) => {
        let newValue = "";
        newValue += value.slice(0, selectionStart - openingWrapper.length);
        newValue += value.slice(selectionStart, selectionEnd);
        newValue += value.slice(closingWrapper.length + selectionEnd);
        return { prependLength: -openingWrapper.length, transformedValue: newValue };
      });
    },
    [transformationWrapper]
  );

  const toggleWrap = useCallback(
    (wrapper: string, properties?: Record<string, string>, addInnerNewLines?: boolean) => {
      if (textAreaRef.current) {
        const { value, selectionStart, selectionEnd } = textAreaRef.current;

        const openingWrapper =
          properties && Object.keys(properties).length === 0 ? `<${wrapper}>` : wrapper;
        const closingWrapper =
          properties && Object.keys(properties).length === 0 ? `</${wrapper}>` : wrapper;

        if (
          value.slice(selectionStart - openingWrapper.length, selectionStart) === openingWrapper &&
          value.slice(selectionEnd, selectionEnd + closingWrapper.length) === closingWrapper
        ) {
          unwrap(openingWrapper, closingWrapper);
        } else {
          wrap(wrapper, properties, addInnerNewLines);
        }
      }
    },
    [unwrap, wrap]
  );

  const preline = useCallback(
    (prepend: string) => {
      transformationWrapper((value, selectionStart, selectionEnd) => {
        const lastNewLine = value.slice(0, selectionStart).lastIndexOf("\n") + 1;
        const nextNewLine = value.slice(selectionEnd).indexOf("\n") + selectionEnd;

        const lines = value.slice(lastNewLine, nextNewLine).split("\n");

        const processedLines = lines.map((line) => `${prepend}${line}`);

        let newValue = "";
        newValue += value.slice(0, lastNewLine);
        newValue += processedLines.join("\n");
        newValue += value.slice(nextNewLine);

        return {
          prependLength: prepend.length,
          selectionLength: selectionEnd - selectionStart + (lines.length - 1) * prepend.length,
          transformedValue: newValue,
        };
      });
    },
    [transformationWrapper]
  );

  const unpreline = useCallback(
    (prepend: string) => {
      transformationWrapper((value, selectionStart, selectionEnd) => {
        const lastNewLine = value.slice(0, selectionStart).lastIndexOf("\n") + 1;
        const nextNewLine = value.slice(selectionEnd).indexOf("\n") + selectionEnd;

        const lines = value.slice(lastNewLine, nextNewLine).split("\n");

        const processedLines = lines.map((line) =>
          line.startsWith(prepend) ? line.slice(prepend.length) : line
        );

        let newValue = "";
        newValue += value.slice(0, lastNewLine);
        newValue += processedLines.join("\n");
        newValue += value.slice(nextNewLine);

        return {
          prependLength: -prepend.length,
          selectionLength: selectionEnd - selectionStart + (lines.length - 1) * -prepend.length,
          transformedValue: newValue,
        };
      });
    },
    [transformationWrapper]
  );

  const togglePreline = useCallback(
    (prepend: string) => {
      if (!textAreaRef.current) {
        return;
      }
      const { value, selectionStart, selectionEnd } = textAreaRef.current;

      const lastNewLine = value.slice(0, selectionStart).lastIndexOf("\n") + 1;
      const nextNewLine = value.slice(selectionEnd).indexOf("\n") + selectionEnd;

      const lines = value.slice(lastNewLine, nextNewLine).split("\n");

      if (lines.every((line) => line.startsWith(prepend))) {
        unpreline(prepend);
      } else {
        preline(prepend);
      }
    },
    [preline, unpreline]
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

  const toc = getTocFromMarkdawn(markdown);

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full}>
      <Popup isVisible={converterOpened} onCloseRequest={() => setConverterOpened(false)}>
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
              <Button onClick={() => togglePreline("# ")} text={"H1"} />
              <Button onClick={() => togglePreline("## ")} text={"H2"} />
              <Button onClick={() => togglePreline("### ")} text={"H3"} />
              <Button onClick={() => togglePreline("#### ")} text={"H4"} />
              <Button onClick={() => togglePreline("##### ")} text={"H5"} />
              <Button onClick={() => togglePreline("###### ")} text={"H6"} />
            </div>
          }>
          <Button icon="title" />
        </ToolTip>

        <ButtonGroup
          buttonsProps={[
            {
              onClick: () => toggleWrap("**"),
              tooltip: <h3 className="text-lg">Toggle Bold</h3>,
              tooltipPlacement: "bottom",
              icon: "format_bold",
            },
            {
              onClick: () => toggleWrap("_"),
              tooltip: <h3 className="text-lg">Toggle Italic</h3>,
              tooltipPlacement: "bottom",
              icon: "format_italic",
            },
            {
              onClick: () => toggleWrap("u", {}),
              tooltip: <h3 className="text-lg">Toggle Underline</h3>,
              tooltipPlacement: "bottom",
              icon: "format_underlined",
            },
            {
              onClick: () => toggleWrap("~~"),
              tooltip: <h3 className="text-lg">Toggle Strikethrough</h3>,
              tooltipPlacement: "bottom",
              icon: "strikethrough_s",
            },
          ]}
        />

        <ToolTip placement="bottom" content={<h3 className="text-lg">Highlight</h3>}>
          <Button onClick={() => toggleWrap("==")} icon="format_ink_highlighter" />
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
          <Button onClick={() => toggleWrap("`")} icon="code" />
        </ToolTip>

        <ToolTip placement="bottom" content={<h3 className="text-lg">Toggle Angelic/Celestial</h3>}>
          <Button
            onClick={() => toggleWrap("Angelic", {})}
            text="m"
            className="w-14 font-angelic font-bold"
          />
        </ToolTip>

        <ButtonGroup
          buttonsProps={[
            {
              onClick: () => togglePreline("- "),
              icon: "format_list_bulleted",
              tooltip: <h3 className="text-lg">Bulleted List</h3>,
              tooltipPlacement: "bottom",
            },
            {
              onClick: () => togglePreline("1. "),
              icon: "format_list_numbered",
              tooltip: <h3 className="text-lg">Numbered List</h3>,
              tooltipPlacement: "bottom",
            },
          ]}
        />

        <ButtonGroup
          buttonsProps={[
            {
              onClick: () => preline("\t"),
              icon: "format_indent_increase",
              tooltip: <h3 className="text-lg">Increase Indent</h3>,
              tooltipPlacement: "bottom",
            },
            {
              onClick: () => unpreline("\t"),
              icon: "format_indent_decrease",
              tooltip: <h3 className="text-lg">Decrease Indent</h3>,
              tooltipPlacement: "bottom",
            },
          ]}
        />

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
            icon="superscript"
          />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={
            <>
              <h3 className="text-lg">Transcripts</h3>
              <p>
                Use this to create dialogues and transcripts. Start by adding a container, then add
                transcript speech line within.
              </p>
              <div className="grid gap-2">
                <ToolTip
                  placement="right"
                  content={
                    <>
                      <h3 className="text-lg">Transcript container</h3>
                    </>
                  }>
                  <Button onClick={() => wrap("Transcript", {}, true)} icon="add_box" />
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
                    icon="record_voice_over"
                  />
                </ToolTip>
              </div>
            </>
          }>
          <Button icon="record_voice_over" />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={
            <>
              <h3 className="text-lg">Layouts</h3>
              <div className="grid gap-2">
                <Button
                  onClick={() => wrap("InsetBox", {}, true)}
                  icon="check_box_outline_blank"
                  text="InsetBox"
                />
                <Button onClick={() => togglePreline("> ")} icon="format_quote" text="Blockquote" />
                <Button
                  onClick={() => toggleWrap("blockquote", { cite: "From X" })}
                  icon="format_quote"
                  text="Blockquote with source"
                />
              </div>
            </>
          }>
          <Button icon="dashboard" />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={
            <>
              <h3 className="text-lg">Videos</h3>
              <div className="grid gap-2">
                <Button
                  onClick={() => insert(`<Video id="XXXXXXXXX" />`)}
                  icon="movie"
                  text="Video"
                />
                <Button
                  onClick={() => insert(`<Video id="XXXXXXXXX" title="My Title" />`)}
                  icon="movie"
                  text="Video + title"
                />
              </div>
            </>
          }>
          <Button icon="movie" />
        </ToolTip>
        <ToolTip placement="bottom" content={<h3 className="text-lg">Scene break</h3>}>
          <Button onClick={() => insert("\n* * *\n")} icon="more_horiz" />
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
                  icon="link"
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
                <Button onClick={() => wrap("IntraLink", {})} icon="link" text={"Internal"} />
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
                  icon="link"
                  text="Internal (w/ target)"
                />
              </ToolTip>
            </div>
          }>
          <Button icon="link" />
        </ToolTip>

        <ToolTip
          placement="bottom"
          content={<h3 className="text-lg">Player&rsquo;s name placeholder</h3>}>
          <Button onClick={() => insert("@player")} icon="person" />
        </ToolTip>

        <ToolTip placement="bottom" content={<h3 className="text-lg">Open HTML Converter</h3>}>
          <Button
            onClick={() => {
              setConverterOpened(true);
            }}
            icon="html"
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
              setMarkdown(textarea.value);
            }}
            className="h-[70vh] w-full rounded-xl bg-mid/40 p-8
              font-mono text-black outline-none"
            value={markdown}
            title="Input textarea"
          />
        </div>
        <div>
          <h2>Preview</h2>
          <div className="h-[70vh] overflow-scroll rounded-xl bg-mid/40 p-8">
            <Markdawn className="w-full" text={markdown} />
          </div>
        </div>
      </div>

      {isDefined(toc) && (
        <div className="mt-8">
          <TableOfContents toc={toc} />
        </div>
      )}
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} {...props} />;
};
export default Editor;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, "Markdawn Editor"),
  };
  return {
    props: props,
  };
};
