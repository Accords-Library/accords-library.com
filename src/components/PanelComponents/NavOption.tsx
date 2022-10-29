import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import { Ico, Icon } from "components/Ico";
import { ToolTip } from "components/ToolTip";
import { cIf, cJoin } from "helpers/className";
import { isDefinedAndNotEmpty } from "helpers/others";
import { TranslatedProps } from "types/TranslatedProps";
import { useSmartLanguage } from "hooks/useSmartLanguage";
import { DownPressable } from "components/Containers/DownPressable";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

interface Props {
  url: string;
  icon?: Icon;
  title: string | null | undefined;
  subtitle?: string | null | undefined;
  border?: boolean;
  reduced?: boolean;
  active?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

// ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

export const NavOption = ({
  url,
  icon,
  title,
  subtitle,
  border = false,
  reduced = false,
  active = false,
  disabled = false,
  onClick,
}: Props): JSX.Element => {
  const router = useRouter();
  const isActive = useMemo(
    () => active || router.asPath.startsWith(url),
    [active, router.asPath, url]
  );
  const [isFocused, setFocused] = useState(false);

  return (
    <ToolTip
      content={
        <div>
          <h3 className="text-2xl">{title}</h3>
          {isDefinedAndNotEmpty(subtitle) && <p className="col-start-2">{subtitle}</p>}
        </div>
      }
      placement="right"
      className="text-left"
      disabled={!reduced || disabled}>
      <DownPressable
        className={cJoin(
          "grid w-full auto-cols-fr grid-flow-col grid-cols-[auto] justify-center gap-x-5",
          cIf(icon, "text-left", "text-center")
        )}
        href={url}
        border={border}
        onClick={onClick}
        active={isActive}
        disabled={disabled}
        onFocusChanged={setFocused}>
        {icon && (
          <Ico icon={icon} className="mt-[-.1em] !text-2xl" isFilled={isActive || isFocused} />
        )}
        {!reduced && (
          <div>
            <h3 className="text-2xl">{title}</h3>
            {isDefinedAndNotEmpty(subtitle) && <p className="col-start-2">{subtitle}</p>}
          </div>
        )}
      </DownPressable>
    </ToolTip>
  );
};

/*
 *                                    ╭──────────────────────╮
 * ───────────────────────────────────╯  TRANSLATED VARIANT  ╰──────────────────────────────────────
 */

export const TranslatedNavOption = ({
  translations,
  fallback,
  ...otherProps
}: TranslatedProps<Props, "subtitle" | "title">): JSX.Element => {
  const [selectedTranslation] = useSmartLanguage({
    items: translations,
    languageExtractor: useCallback((item: { language: string }): string => item.language, []),
  });
  return (
    <NavOption
      title={selectedTranslation?.title ?? fallback.title}
      subtitle={selectedTranslation?.subtitle ?? fallback.subtitle}
      {...otherProps}
    />
  );
};
