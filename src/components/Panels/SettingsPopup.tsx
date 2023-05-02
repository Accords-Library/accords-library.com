import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "components/Inputs/Button";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { OrderableList } from "components/Inputs/OrderableList";
import { Select } from "components/Inputs/Select";
import { TextInput } from "components/Inputs/TextInput";
import { Popup } from "components/Containers/Popup";
import { sendAnalytics } from "helpers/analytics";
import { cJoin, cIf } from "helpers/className";
import { prettyLanguage } from "helpers/formatters";
import { filterHasAttributes, isDefined } from "helpers/asserts";
import { atoms } from "contexts/atoms";
import { useAtomGetter, useAtomPair } from "helpers/atoms";
import { ThemeMode } from "contexts/settings";
import { Ico } from "components/Ico";
import { useFormat } from "hooks/useFormat";
import { ToolTip } from "components/ToolTip";

/*
 *                                        ╭─────────────╮
 * ───────────────────────────────────────╯  COMPONENT  ╰───────────────────────────────────────────
 */

export const SettingsPopup = (): JSX.Element => {
  const [preferredLanguages, setPreferredLanguages] = useAtomPair(
    atoms.settings.preferredLanguages
  );
  const [isSettingsOpened, setSettingsOpened] = useAtomPair(atoms.layout.settingsOpened);
  const [currency, setCurrency] = useAtomPair(atoms.settings.currency);
  const [isDyslexic, setDyslexic] = useAtomPair(atoms.settings.dyslexic);
  const [fontSize, setFontSize] = useAtomPair(atoms.settings.fontSize);
  const [playerName, setPlayerName] = useAtomPair(atoms.settings.playerName);
  const [themeMode, setThemeMode] = useAtomPair(atoms.settings.themeMode);

  const languages = useAtomGetter(atoms.localData.languages);
  const { format } = useFormat();
  const currencies = useAtomGetter(atoms.localData.currencies);

  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const router = useRouter();

  const currencyOptions = filterHasAttributes(currencies, ["attributes"]).map(
    (currentCurrency) => currentCurrency.attributes.code
  );

  const [currencySelect, setCurrencySelect] = useState<number>(-1);
  useEffect(() => {
    if (isDefined(currency)) setCurrencySelect(currencyOptions.indexOf(currency));
  }, [currency, currencyOptions]);

  return (
    <Popup
      isVisible={isSettingsOpened}
      onCloseRequest={() => {
        setSettingsOpened(false);
        sendAnalytics("Settings", "Close settings");
      }}>
      <h2 className="inline-flex place-items-center gap-2 text-2xl">
        <Ico icon="discover_tune" isFilled />
        {format("settings")}
      </h2>

      <div
        className={cJoin(
          `mt-4 grid justify-items-center gap-16 text-center`,
          cIf(!is1ColumnLayout, "grid-cols-[auto_auto]")
        )}>
        {router.locales && (
          <div>
            <h3 className="text-xl">{format("language", { count: preferredLanguages.length })}</h3>
            {preferredLanguages.length > 0 && (
              <OrderableList
                items={preferredLanguages.map((locale) => ({
                  code: locale,
                  name: prettyLanguage(locale, languages),
                }))}
                insertLabels={[
                  {
                    insertAt: 0,
                    name: format("primary_language"),
                  },
                  {
                    insertAt: 1,
                    name: format("secondary_language"),
                  },
                ]}
                onChange={(items) => {
                  const newPreferredLanguages = items.map((item) => item.code);
                  setPreferredLanguages(newPreferredLanguages);
                  sendAnalytics("Settings", "Change preferred languages");
                }}
              />
            )}
          </div>
        )}
        <div
          className={cJoin(
            "grid place-items-center gap-8 text-center",
            cIf(!is1ColumnLayout, "grid-cols-2")
          )}>
          <div>
            <div className="flex place-content-center place-items-center gap-1">
              <h3 className="text-xl">{format("theme")}</h3>
              <ToolTip content={format("dark_mode_extension_warning")} placement="top">
                <Ico icon="info" />
              </ToolTip>
            </div>
            <ButtonGroup
              buttonsProps={[
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Light);
                    sendAnalytics("Settings", "Change theme (light)");
                  },
                  active: themeMode === ThemeMode.Light,
                  text: format("light"),
                },
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Auto);
                    sendAnalytics("Settings", "Change theme (auto)");
                  },
                  active: themeMode === ThemeMode.Auto,
                  text: format("auto"),
                },
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Dark);
                    sendAnalytics("Settings", "Change theme (dark)");
                  },
                  active: themeMode === ThemeMode.Dark,
                  text: format("dark"),
                },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl">{format("currency")}</h3>
            <div>
              <Select
                options={currencyOptions}
                value={currencySelect}
                onChange={(newCurrency) => {
                  const newCurrencyName = currencyOptions[newCurrency];
                  if (isDefined(newCurrencyName)) {
                    setCurrency(newCurrencyName);
                    sendAnalytics("Settings", `Change currency (${currencyOptions[newCurrency]})`);
                  }
                }}
                className="w-28"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl">{format("font_size")}</h3>
            <ButtonGroup
              buttonsProps={[
                {
                  onClick: () => {
                    setFontSize((current) => current / 1.05);
                    sendAnalytics(
                      "Settings",
                      `Change font size (${((fontSize / 1.05) * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}%)`
                    );
                  },
                  icon: "text_decrease",
                },
                {
                  onClick: () => {
                    setFontSize(1);
                    sendAnalytics("Settings", "Change font size (100%)");
                  },
                  text: `${(fontSize * 100).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}%`,
                },
                {
                  onClick: () => {
                    setFontSize((current) => current * 1.05);
                    sendAnalytics(
                      "Settings",
                      `Change font size (${(fontSize * 1.05 * 100).toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}%)`
                    );
                  },
                  icon: "text_increase",
                },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl">{format("font")}</h3>
            <div className="grid gap-2">
              <Button
                active={!isDyslexic}
                onClick={() => {
                  setDyslexic(false);
                  sendAnalytics("Settings", "Change font (Zen Maru Gothic)");
                }}
                className="font-zenMaruGothic"
                text="Zen Maru Gothic"
              />
              <Button
                active={isDyslexic}
                onClick={() => {
                  setDyslexic(true);
                  sendAnalytics("Settings", "Change font (OpenDyslexic)");
                }}
                className="font-openDyslexic"
                text="OpenDyslexic"
              />
            </div>
          </div>

          <div>
            <div className="flex place-content-center place-items-center gap-1">
              <h3 className="text-xl">{format("player_name")}</h3>
              <ToolTip content={format("player_name_tooltip")} placement="top">
                <Ico icon="info" />
              </ToolTip>
            </div>
            <TextInput
              placeholder="(player)"
              className="w-48"
              value={playerName}
              onChange={(newName) => {
                setPlayerName(newName);
                sendAnalytics("Settings", "Change username");
              }}
            />
          </div>
        </div>
      </div>
    </Popup>
  );
};
