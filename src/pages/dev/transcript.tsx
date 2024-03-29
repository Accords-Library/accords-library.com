import "@fontsource/noto-serif-jp";
import { GetStaticProps } from "next";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { atomWithStorage } from "jotai/utils";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { AppLayout, AppLayoutRequired } from "components/AppLayout";
import { Button } from "components/Inputs/Button";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { ContentPanel, ContentPanelWidthSizes } from "components/Containers/ContentPanel";
import { ToolTip } from "components/ToolTip";
import { getOpenGraph } from "helpers/openGraph";
import { getFormat } from "helpers/i18n";
import { atomPairing, useAtomPair } from "helpers/atoms";
import { cIf, cJoin } from "helpers/className";

/*
 *                                         ╭─────────────╮
 * ────────────────────────────────────────╯  CONSTANTS  ╰──────────────────────────────────────────
 */

type Orientation = "horizontal" | "vertical";

const textAtom = atomPairing(atomWithStorage("transcriptText", ""));
const fontSizeAtom = atomPairing(atomWithStorage("transcriptFontSize", 1));
const textOffsetAtom = atomPairing(atomWithStorage("transcriptTextOffset", 0));
const orientationAtom = atomPairing(
  atomWithStorage<Orientation>("transcriptOrientation", "vertical")
);

const SIZE_MULTIPLIER = 1000;

/*
 *                                           ╭────────╮
 * ──────────────────────────────────────────╯  PAGE  ╰─────────────────────────────────────────────
 */

interface Props extends AppLayoutRequired {}

const replaceSelection = (
  text: string,
  selectionStart: number,
  selectionEnd: number,
  newSelectedText: string
) => text.substring(0, selectionStart) + newSelectedText + text.substring(selectionEnd);

const swapChar = (char: string, swaps: string[]): string => {
  for (let index = 0; index < swaps.length; index++) {
    if (char === swaps[index]) {
      return swaps[(index + 1) % swaps.length] ?? char;
    }
  }
  return char;
};

const Transcript = (props: Props): JSX.Element => {
  const [text, setText] = useAtomPair(textAtom);
  const [fontSize, setFontSize] = useAtomPair(fontSizeAtom);
  const [offset, setOffset] = useAtomPair(textOffsetAtom);
  const [orientation, setOrientation] = useAtomPair(orientationAtom);
  const [lineIndex, setLineIndex] = useState(0);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const updateDisplayedText = useCallback(() => {
    if (textAreaRef.current) {
      setText(textAreaRef.current.value);
    }
  }, [setText]);

  const updateLineIndex = useCallback(() => {
    if (textAreaRef.current) {
      const subText = textAreaRef.current.value.substring(0, textAreaRef.current.selectionStart);
      setLineIndex(subText.split("\n").length - 1);
    }
  }, []);

  const convertFullWidth = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.value
        // Numbers
        .replaceAll("0", "０")
        .replaceAll("1", "１")
        .replaceAll("2", "２")
        .replaceAll("3", "３")
        .replaceAll("4", "４")
        .replaceAll("5", "５")
        .replaceAll("6", "６")
        .replaceAll("7", "７")
        .replaceAll("8", "８")
        .replaceAll("9", "９")
        // Uppercase letters
        .replaceAll("A", "Ａ")
        .replaceAll("B", "Ｂ")
        .replaceAll("C", "Ｃ")
        .replaceAll("D", "Ｄ")
        .replaceAll("E", "Ｅ")
        .replaceAll("F", "Ｆ")
        .replaceAll("G", "Ｇ")
        .replaceAll("H", "Ｈ")
        .replaceAll("I", "Ｉ")
        .replaceAll("J", "Ｊ")
        .replaceAll("K", "Ｋ")
        .replaceAll("L", "Ｌ")
        .replaceAll("M", "Ｍ")
        .replaceAll("N", "Ｎ")
        .replaceAll("O", "Ｏ")
        .replaceAll("P", "Ｐ")
        .replaceAll("Q", "Ｑ")
        .replaceAll("R", "Ｒ")
        .replaceAll("S", "Ｓ")
        .replaceAll("T", "Ｔ")
        .replaceAll("U", "Ｕ")
        .replaceAll("V", "Ｖ")
        .replaceAll("W", "Ｗ")
        .replaceAll("X", "Ｘ")
        .replaceAll("Y", "Ｙ")
        .replaceAll("Z", "Ｚ")
        // Lowercase letters
        .replaceAll("a", "ａ")
        .replaceAll("b", "ｂ")
        .replaceAll("c", "ｃ")
        .replaceAll("d", "ｄ")
        .replaceAll("e", "ｅ")
        .replaceAll("f", "ｆ")
        .replaceAll("g", "ｇ")
        .replaceAll("h", "ｈ")
        .replaceAll("i", "ｉ")
        .replaceAll("j", "ｊ")
        .replaceAll("k", "ｋ")
        .replaceAll("l", "ｌ")
        .replaceAll("m", "ｍ")
        .replaceAll("n", "ｎ")
        .replaceAll("o", "ｏ")
        .replaceAll("p", "ｐ")
        .replaceAll("q", "ｑ")
        .replaceAll("r", "ｒ")
        .replaceAll("s", "ｓ")
        .replaceAll("t", "ｔ")
        .replaceAll("u", "ｕ")
        .replaceAll("v", "ｖ")
        .replaceAll("w", "ｗ")
        .replaceAll("x", "ｘ")
        .replaceAll("y", "ｙ")
        .replaceAll("z", "ｚ")
        // Others
        .replaceAll(" ", "　")
        .replaceAll(",", "，")
        .replaceAll(".", "．")
        .replaceAll(":", "：")
        .replaceAll(";", "；")
        .replaceAll("!", "！")
        .replaceAll("?", "？")
        .replaceAll('"', "＂")
        .replaceAll("'", "＇")
        .replaceAll("`", "｀")
        .replaceAll("^", "＾")
        .replaceAll("~", "～")
        .replaceAll("_", "＿")
        .replaceAll("&", "＆")
        .replaceAll("@", "＠")
        .replaceAll("#", "＃")
        .replaceAll("%", "％")
        .replaceAll("+", "＋")
        .replaceAll("-", "－")
        .replaceAll("*", "＊")
        .replaceAll("=", "＝")
        .replaceAll("<", "＜")
        .replaceAll(">", "＞")
        .replaceAll("(", "（")
        .replaceAll(")", "）")
        .replaceAll("[", "［")
        .replaceAll("]", "］")
        .replaceAll("{", "｛")
        .replaceAll("}", "｝")
        .replaceAll("|", "｜")
        .replaceAll("$", "＄")
        .replaceAll("£", "￡")
        .replaceAll("¢", "￠")
        .replaceAll("₩", "￦")
        .replaceAll("¥", "￥");
      updateDisplayedText();
    }
  }, [updateDisplayedText]);

  const convertPunctuation = useCallback(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = textAreaRef.current.value
        .replaceAll("...", "⋯")
        .replaceAll("…", "⋯")
        .replaceAll(":::", "⋯⋯")
        .replaceAll(".", "。")
        .replaceAll(",", "、")
        .replaceAll("?", "？")
        .replaceAll("!", "！")
        .replaceAll(":", "：")
        .replaceAll("~", "～");
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
      const selection = textAreaRef.current.value.substring(selectionStart, selectionEnd);
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
      const selection = textAreaRef.current.value.substring(selectionStart, selectionEnd);
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

  const [image, setImage] = useState<string>();

  const onImageUploaded = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("language", "jpn");
        formData.append("FileType", ".Auto");
        formData.append("scale", "true");
        formData.append("OCREngine", "1");

        type OCRApiResponse = {
          ParsedResults: {
            ParsedText: string;
          }[];
          OCRExitCode: number;
          IsErroredOnProcessing: boolean;
        };

        const response = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          body: formData,
          headers: { apiKey: "d35acb001e88957" },
        });

        const jsonData: OCRApiResponse = await response.json();
        const ocrText = jsonData.ParsedResults[0]?.ParsedText;

        if (ocrText) {
          setText(ocrText);
        }

        setImage(URL.createObjectURL(file));
      }
    },
    [setText]
  );

  const contentPanel = (
    <ContentPanel width={ContentPanelWidthSizes.Full} className="!pt-2">
      <div className="flex flex-wrap items-end  gap-4 pr-24">
        <ButtonGroup
          buttonsProps={[
            {
              active: orientation === "horizontal",
              icon: "text_rotation_none",
              onClick: () => setOrientation("horizontal"),
            },
            {
              active: orientation === "vertical",
              icon: "text_rotate_vertical",
              onClick: () => setOrientation("vertical"),
            },
          ]}
        />

        <div className="grid place-items-center">
          <p>Text offset: {offset}px</p>
          <input
            title="Font size multiplier"
            type="range"
            min="0"
            max="100"
            value={offset * 5}
            onChange={(event) => setOffset(parseInt(event.target.value, 10) / 5)}
          />
        </div>

        <div className="grid place-items-center">
          <p>Font size: {fontSize}x</p>
          <input
            title="Font size multiplier"
            type="range"
            min="1000"
            max="3000"
            value={fontSize * SIZE_MULTIPLIER}
            onChange={(event) => setFontSize(parseInt(event.target.value, 10) / SIZE_MULTIPLIER)}
          />
        </div>
        <ToolTip content="Automatically convert Western punctuations to Japanese ones.">
          <Button text=". ⟹ 。" onClick={convertPunctuation} />
        </ToolTip>
        <ToolTip content="Swap a kana for one of its variant (different diacritics).">
          <Button text="か ⟺ が" onClick={toggleDakuten} />
        </ToolTip>
        <ToolTip content="Toggle a kana's small form">
          <Button text="つ ⟺ っ" onClick={toggleSmallForm} />
        </ToolTip>
        <ToolTip content="Convert standard characters to their full width variant.">
          <Button text="123 ⟹ １２３" onClick={convertFullWidth} />
        </ToolTip>

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
                  { text: "〖", onClick: () => insert("〖") },
                  { text: "〗", onClick: () => insert("〗") },
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
                  { text: "（", onClick: () => insert("（") },
                  { text: "）", onClick: () => insert("）") },
                ]}
              />
              <ButtonGroup
                buttonsProps={[
                  { text: "｟", onClick: () => insert("｟") },
                  { text: "｠", onClick: () => insert("｠") },
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
              <ButtonGroup
                buttonsProps={[
                  { text: "｛", onClick: () => insert("｛") },
                  { text: "｝", onClick: () => insert("｝") },
                ]}
              />
              <ButtonGroup
                buttonsProps={[
                  { text: "［", onClick: () => insert("［") },
                  { text: "］", onClick: () => insert("］") },
                ]}
              />
              <ButtonGroup
                buttonsProps={[
                  { text: "〔", onClick: () => insert("〔") },
                  { text: "〕", onClick: () => insert("〕") },
                ]}
              />
              <ButtonGroup
                buttonsProps={[
                  { text: "〘", onClick: () => insert("〘") },
                  { text: "〙", onClick: () => insert("〙") },
                ]}
              />
            </div>
          }>
          <Button text={"Quotations"} />
        </ToolTip>
        <ToolTip
          content={
            <div className="grid gap-2">
              <Button text={"。"} onClick={() => insert("。")} />
              <Button text={"？"} onClick={() => insert("？")} />
              <Button text={"！"} onClick={() => insert("！")} />
              <Button text={"⋯"} onClick={() => insert("⋯")} />
              <Button text={"※"} onClick={() => insert("※")} />
              <Button text={"♪"} onClick={() => insert("♪")} />
              <Button text={"・"} onClick={() => insert("・")} />
              <Button text={"〇"} onClick={() => insert("〇")} />
              <Button text={'"　"'} onClick={() => insert("　")} />
            </div>
          }>
          <Button text="Insert" />
        </ToolTip>

        <input type="file" accept="image/png, image/jpeg, image/webp" onChange={onImageUploaded} />
      </div>
      <div
        className={cJoin(
          "grid h-[90vh]",
          cIf(
            orientation === "vertical",
            cIf(image, "grid-cols-[1fr_5rem_20rem]", "grid-cols-[1fr_5rem]"),
            cIf(image, "grid-rows-[1fr_5rem_20rem]", "grid-rows-[1fr_5rem]")
          )
        )}>
        <textarea
          ref={textAreaRef}
          onChange={updateDisplayedText}
          onClick={updateLineIndex}
          onKeyUp={updateLineIndex}
          title="Input textarea"
          className="mt-4 whitespace-pre"
          value={text}
        />

        <p
          className={cJoin(
            `z-10 mt-4 whitespace-nowrap
            font-bold [font-family:Noto_Serif_JP]`,
            cIf(
              orientation === "vertical",
              "[transform-origin:top_right] [writing-mode:vertical-rl]",
              "[transform-origin:top_left]"
            )
          )}
          style={{
            transform: `scale(${fontSize}) ${
              orientation === "vertical" ? "translateX" : "translateY"
            }(${fontSize * offset}px)`,
          }}>
          {text.split("\n")[lineIndex]}
        </p>

        {image && (
          <TransformWrapper
            panning={{ velocityDisabled: true }}
            alignmentAnimation={{ disabled: true }}
            wheel={{ step: 0.05 }}
            limitToBounds={false}
            minScale={0.5}>
            <TransformComponent wrapperStyle={{ height: "100%", width: "100%" }}>
              <img src={image} alt="The provided image" className="w-full object-cover" />
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </ContentPanel>
  );

  return <AppLayout contentPanel={contentPanel} {...props} contentPanelScroolbar={false} />;
};
export default Transcript;

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  NEXT DATA FETCHING  ╰──────────────────────────────────────
 */

export const getStaticProps: GetStaticProps = (context) => {
  const { format } = getFormat(context.locale);
  const props: Props = {
    openGraph: getOpenGraph(format, "Japanese Transcription Tool"),
  };
  return {
    props: props,
  };
};
