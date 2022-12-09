import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Icon } from "components/Ico";
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
  const langui = useAtomGetter(atoms.localData.langui);
  const currencies = useAtomGetter(atoms.localData.currencies);

  const is1ColumnLayout = useAtomGetter(atoms.containerQueries.is1ColumnLayout);

  const router = useRouter();

  const currencyOptions = filterHasAttributes(currencies, ["attributes"] as const).map(
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
      <h2 className="text-2xl">{langui.settings}</h2>

      <div
        className={cJoin(
          `mt-4 grid justify-items-center gap-16 text-center`,
          cIf(!is1ColumnLayout, "grid-cols-[auto_auto]")
        )}>
        {router.locales && (
          <div>
            <h3 className="text-xl">{langui.languages}</h3>
            {preferredLanguages.length > 0 && (
              <OrderableList
                items={preferredLanguages.map((locale) => ({
                  code: locale,
                  name: prettyLanguage(locale, languages),
                }))}
                insertLabels={[
                  {
                    insertAt: 0,
                    name: langui.primary_language ?? "Primary language",
                  },
                  {
                    insertAt: 1,
                    name: langui.secondary_language ?? "Secondary languages",
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
            <h3 className="text-xl">{langui.theme}</h3>
            <ButtonGroup
              buttonsProps={[
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Light);
                    sendAnalytics("Settings", "Change theme (light)");
                  },
                  active: themeMode === ThemeMode.Light,
                  text: langui.light,
                },
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Auto);
                    sendAnalytics("Settings", "Change theme (auto)");
                  },
                  active: themeMode === ThemeMode.Auto,
                  text: langui.auto,
                },
                {
                  onClick: () => {
                    setThemeMode(ThemeMode.Dark);
                    sendAnalytics("Settings", "Change theme (dark)");
                  },
                  active: themeMode === ThemeMode.Dark,
                  text: langui.dark,
                },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl">{langui.currency}</h3>
            <div>
              <Select
                options={currencyOptions}
                value={currencySelect}
                onChange={(newCurrency) => {
                  const newCurrencyName = currencyOptions[newCurrency];
                  if (isDefined(newCurrencyName)) {
                    setCurrency(newCurrencyName);
                    sendAnalytics("Settings", `Change currency (${currencyOptions[newCurrency]})}`);
                  }
                }}
                className="w-28"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl">{langui.font_size}</h3>
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
                  icon: Icon.TextDecrease,
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
                  icon: Icon.TextIncrease,
                },
              ]}
            />
          </div>

          <div>
            <h3 className="text-xl">{langui.font}</h3>
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
            <h3 className="text-xl">{langui.player_name}</h3>
            <TextInput
              placeholder="<player>"
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
