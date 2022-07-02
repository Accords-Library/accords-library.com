import { AppLayout } from "components/AppLayout";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import {
  ContentPanel,
  ContentPanelWidthSizes,
} from "components/Panels/ContentPanel";
import { ToolTip } from "components/ToolTip";
import { AppStaticProps, getAppStaticProps } from "graphql/getAppStaticProps";
import { GetStaticPropsContext } from "next";
import { useCallback, useMemo, useRef, useState } from "react";

interface Props extends AppStaticProps {}

const SIZE_MULTIPLIER = 1000;

function replaceSelection(
  text: string,
  selectionStart: number,
  selectionEnd: number,
  newSelectedText: string
) {
  return (
    text.substring(0, selectionStart) +
    newSelectedText +
    text.substring(selectionEnd)
  );
}

function swapChar(char: string, swaps: string[]): string {
  for (let index = 0; index < swaps.length; index++) {
    if (char === swaps[index]) {
      console.log(
        "found it",
        char,
        " returning",
        swaps[(index + 1) % swaps.length]
      );
      return swaps[(index + 1) % swaps.length];
    }
  }
  return char;
}

export default function Transcript(props: Props): JSX.Element {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(1);
  const [xOffset, setXOffset] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const updateDisplayedText = useCallback(() => {
    if (textAreaRef.current) {
      setText(textAreaRef.current.value);
    }
  }, []);

  const updateLineIndex = useCallback(() => {
    if (textAreaRef.current) {
      const subText = textAreaRef.current.value.substring(
        0,
        textAreaRef.current.selectionStart
      );
      setLineIndex(subText.split("\n").length - 1);
    }
  }, []);

  const convertPunctuation = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.value
        .replaceAll("...", "⋯")
        .replaceAll("…", "⋯")
        .replaceAll(":::", "⋯⋯")
        .replaceAll(".", "。")
        .replaceAll(",", "、")
        .replaceAll("?", "？")
        .replaceAll("!", "！");
      updateDisplayedText();
    }
  }, [updateDisplayedText]);

  const toggleDakuten = useCallback(() => {
    if (textAreaRef.current) {
      const selectionStart = Math.min(
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionEnd
      );
      const selectionEnd = Math.max(
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionEnd
      );
      const selection = textAreaRef.current.value.substring(
        selectionStart,
        selectionEnd
      );
      if (selection.length === 1) {
        let newSelection = selection;

        /*
         * Hiragana
         * a
         */
        newSelection = swapChar(newSelection, ["か", "が"]);
        newSelection = swapChar(newSelection, ["さ", "ざ"]);
        newSelection = swapChar(newSelection, ["た", "だ"]);
        newSelection = swapChar(newSelection, ["は", "ば", "ぱ"]);
        // i
        newSelection = swapChar(newSelection, ["き", "ぎ"]);
        newSelection = swapChar(newSelection, ["し", "じ"]);
        newSelection = swapChar(newSelection, ["ち", "ぢ"]);
        newSelection = swapChar(newSelection, ["ひ", "び", "ぴ"]);
        // u
        newSelection = swapChar(newSelection, ["く", "ぐ"]);
        newSelection = swapChar(newSelection, ["す", "ず"]);
        newSelection = swapChar(newSelection, ["つ", "づ"]);
        newSelection = swapChar(newSelection, ["ふ", "ぶ", "ぷ"]);
        // e
        newSelection = swapChar(newSelection, ["け", "げ"]);
        newSelection = swapChar(newSelection, ["せ", "ぜ"]);
        newSelection = swapChar(newSelection, ["て", "で"]);
        newSelection = swapChar(newSelection, ["へ", "べ", "ぺ"]);
        // o
        newSelection = swapChar(newSelection, ["こ", "ご"]);
        newSelection = swapChar(newSelection, ["そ", "ぞ"]);
        newSelection = swapChar(newSelection, ["と", "ど"]);
        newSelection = swapChar(newSelection, ["ほ", "ぼ", "ぽ"]);
        // others
        newSelection = swapChar(newSelection, ["う", "ゔ"]);
        newSelection = swapChar(newSelection, ["ゝ", "ゞ"]);

        /*
         * Katakana
         * a
         */
        newSelection = swapChar(newSelection, ["カ", "ガ"]);
        newSelection = swapChar(newSelection, ["サ", "ザ"]);
        newSelection = swapChar(newSelection, ["タ", "ダ"]);
        newSelection = swapChar(newSelection, ["ハ", "バ", "パ"]);
        // i
        newSelection = swapChar(newSelection, ["キ", "ギ"]);
        newSelection = swapChar(newSelection, ["シ", "ジ"]);
        newSelection = swapChar(newSelection, ["チ", "ヂ"]);
        newSelection = swapChar(newSelection, ["ヒ", "ビ", "ピ"]);
        // u
        newSelection = swapChar(newSelection, ["ク", "グ"]);
        newSelection = swapChar(newSelection, ["ス", "ズ"]);
        newSelection = swapChar(newSelection, ["ツ", "ヅ"]);
        newSelection = swapChar(newSelection, ["フ", "ブ", "プ"]);
        // e
        newSelection = swapChar(newSelection, ["ケ", "ゲ"]);
        newSelection = swapChar(newSelection, ["セ", "ゼ"]);
        newSelection = swapChar(newSelection, ["テ", "デ"]);
        newSelection = swapChar(newSelection, ["ヘ", "ベ", "ペ"]);
        // o
        newSelection = swapChar(newSelection, ["コ", "ゴ"]);
        newSelection = swapChar(newSelection, ["ソ", "ゾ"]);
        newSelection = swapChar(newSelection, ["ト", "ド"]);
        newSelection = swapChar(newSelection, ["ホ", "ボ", "ポ"]);
        // others
        newSelection = swapChar(newSelection, ["ゥ", "ヴ"]);
        newSelection = swapChar(newSelection, ["ヽ", "ヾ"]);

        if (newSelection !== selection) {
          textAreaRef.current.value = replaceSelection(
            textAreaRef.current.value,
            selectionStart,
            selectionEnd,
            newSelection
          );

          textAreaRef.current.selectionStart = selectionStart;
          textAreaRef.current.selectionEnd = selectionEnd;
          textAreaRef.current.focus();

          updateDisplayedText();
        }
      }
    }
  }, [updateDisplayedText]);

  const toggleSmallForm = useCallback(() => {
    if (textAreaRef.current) {
      const selectionStart = Math.min(
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionEnd
      );
      const selectionEnd = Math.max(
        textAreaRef.current.selectionStart,
        textAreaRef.current.selectionEnd
      );
      const selection = textAreaRef.current.value.substring(
        selectionStart,
        selectionEnd
      );
      if (selection.length === 1) {
        let newSelection = selection;

        // Hiragana
        newSelection = swapChar(newSelection, ["あ", "ぁ"]);
        newSelection = swapChar(newSelection, ["い", "ぃ"]);
        newSelection = swapChar(newSelection, ["う", "ぅ"]);
        newSelection = swapChar(newSelection, ["え", "ぇ"]);
        newSelection = swapChar(newSelection, ["お", "ぉ"]);
        newSelection = swapChar(newSelection, ["か", "ゕ"]);
        newSelection = swapChar(newSelection, ["け", "ゖ"]);
        newSelection = swapChar(newSelection, ["つ", "っ"]);
        newSelection = swapChar(newSelection, ["や", "ゃ"]);
        newSelection = swapChar(newSelection, ["ゆ", "ゅ"]);
        newSelection = swapChar(newSelection, ["よ", "ょ"]);
        newSelection = swapChar(newSelection, ["わ", "ゎ"]);
        // Katakana
        newSelection = swapChar(newSelection, ["ア", "ァ"]);
        newSelection = swapChar(newSelection, ["イ", "ィ"]);
        newSelection = swapChar(newSelection, ["ウ", "ゥ"]);
        newSelection = swapChar(newSelection, ["エ", "ェ"]);
        newSelection = swapChar(newSelection, ["オ", "ォ"]);
        newSelection = swapChar(newSelection, ["ツ", "ッ"]);
        newSelection = swapChar(newSelection, ["ヤ", "ャ"]);
        newSelection = swapChar(newSelection, ["ユ", "ュ"]);
        newSelection = swapChar(newSelection, ["ヨ", "ョ"]);

        if (newSelection !== selection) {
          textAreaRef.current.value = replaceSelection(
            textAreaRef.current.value,
            selectionStart,
            selectionEnd,
            newSelection
          );

          textAreaRef.current.selectionStart = selectionStart;
          textAreaRef.current.selectionEnd = selectionEnd;
          textAreaRef.current.focus();

          updateDisplayedText();
        }
      }
    }
  }, [updateDisplayedText]);

  const insert = useCallback(
    (insertedText: string) => {
      if (textAreaRef.current) {
        const selectionEnd = Math.max(
          textAreaRef.current.selectionStart,
          textAreaRef.current.selectionEnd
        );
        textAreaRef.current.value = replaceSelection(
          textAreaRef.current.value,
          selectionEnd,
          selectionEnd,
          insertedText
        );

        textAreaRef.current.selectionStart = selectionEnd;
        textAreaRef.current.selectionEnd = selectionEnd + insertedText.length;
        textAreaRef.current.focus();

        updateDisplayedText();
      }
    },
    [updateDisplayedText]
  );

  const contentPanel = useMemo(
    () => (
      <ContentPanel
        width={ContentPanelWidthSizes.Full}
        className="overflow-hidden !pr-0 !pt-4"
      >
        <div className="grid grid-flow-col grid-cols-[1fr_5rem]">
          <textarea
            ref={textAreaRef}
            onChange={updateDisplayedText}
            onClick={updateLineIndex}
            onKeyUp={updateLineIndex}
            title="Input textarea"
            className="whitespace-pre"
          ></textarea>

          <p
            className="h-[80vh] whitespace-nowrap font-[initial] font-bold
          [writing-mode:vertical-rl] [transform-origin:top_right]"
            style={{
              transform: `scale(${fontSize}) translateX(${
                fontSize * xOffset
              }px)`,
            }}
          >
            {text.split("\n")[lineIndex]}
          </p>
        </div>

        <div className="flex flex-wrap place-items-center gap-4 pr-24">
          <div className="grid place-items-center">
            <p>Text offset: {xOffset}px</p>
            <input
              title="Font size multiplier"
              type="range"
              min="0"
              max="100"
              value={xOffset * 10}
              onChange={(event) =>
                setXOffset(parseInt(event.target.value, 10) / 10)
              }
            ></input>
          </div>

          <div className="grid place-items-center">
            <p>Font size: {fontSize}x</p>
            <input
              title="Font size multiplier"
              type="range"
              min="1000"
              max="3000"
              value={fontSize * SIZE_MULTIPLIER}
              onChange={(event) =>
                setFontSize(parseInt(event.target.value, 10) / SIZE_MULTIPLIER)
              }
            ></input>
          </div>
          <ToolTip content="Automatically convert punctuations">
            <Button icon={Icon.QuestionMark} onClick={convertPunctuation} />
          </ToolTip>
          <Button text={"か ⟺ が"} onClick={toggleDakuten} />
          <Button text={"つ ⟺ っ"} onClick={toggleSmallForm} />
          <Button text={"。"} onClick={() => insert("。")} />
          <Button text={"？"} onClick={() => insert("？")} />
          <Button text={"！"} onClick={() => insert("！")} />
          <ToolTip
            content={
              <div className="grid gap-2">
                <ButtonGroup
                  buttonsProps={[
                    { text: "「", onClick: () => insert("「") },
                    { text: "」", onClick: () => insert("」") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "『", onClick: () => insert("『") },
                    { text: "』", onClick: () => insert("』") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "【", onClick: () => insert("【") },
                    { text: "】", onClick: () => insert("】") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "（", onClick: () => insert("（") },
                    { text: "）", onClick: () => insert("）") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "〝", onClick: () => insert("〝") },
                    { text: "〟", onClick: () => insert("〟") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "〈", onClick: () => insert("〈") },
                    { text: "〉", onClick: () => insert("〉") },
                  ]}
                />
                <ButtonGroup
                  buttonsProps={[
                    { text: "《", onClick: () => insert("《") },
                    { text: "》", onClick: () => insert("》") },
                  ]}
                />
              </div>
            }
          >
            <Button text={"Quotations"} />
          </ToolTip>

          <Button text={"⋯"} onClick={() => insert("⋯")} />
          <Button text={"※"} onClick={() => insert("※")} />
          <Button text={'"　"'} onClick={() => insert("　")} />
        </div>
      </ContentPanel>
    ),
    [
      convertPunctuation,
      fontSize,
      insert,
      lineIndex,
      text,
      toggleDakuten,
      toggleSmallForm,
      updateDisplayedText,
      updateLineIndex,
      xOffset,
    ]
  );

  return (
    <AppLayout
      navTitle="Transcript"
      contentPanel={contentPanel}
      {...props}
      contentPanelScroolbar={false}
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
