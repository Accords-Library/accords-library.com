import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "components/Ico";
import { Button } from "components/Inputs/Button";
import { ButtonGroup } from "components/Inputs/ButtonGroup";
import { OrderableList } from "components/Inputs/OrderableList";
import { Select } from "components/Inputs/Select";
import { TextInput } from "components/Inputs/TextInput";
import { Popup } from "components/Popup";
import { useAppLayout } from "contexts/AppLayoutContext";
import { useLocalData } from "contexts/LocalDataContext";
import { useUserSettings } from "contexts/UserSettingsContext";
import { sendAnalytics } from "helpers/analytics";
import { cJoin, cIf } from "helpers/className";
import { prettyLanguage } from "helpers/formatters";
import { filterHasAttributes, isDefined } from "helpers/others";
import { useContainerQueries } from "contexts/ContainerQueriesContext";

export const SettingsPopup = (): JSX.Element => {
  const {
    currency,
    darkMode,
    dyslexic,
    fontSize,
    playerName,
    preferredLanguages,
    selectedThemeMode,
    setCurrency,
    setDarkMode,
    setDyslexic,
    setFontSize,
    setPlayerName,
    setPreferredLanguages,
    setSelectedThemeMode,
  } = useUserSettings();

  const { langui, currencies, languages } = useLocalData();
  const { is1ColumnLayout } = useContainerQueries();
  const router = useRouter();
  const { configPanelOpen, setConfigPanelOpen } = useAppLayout();

  const currencyOptions = useMemo(
    () =>
      filterHasAttributes(currencies, ["attributes"] as const).map(
        (currentCurrency) => currentCurrency.attributes.code
      ),
    [currencies]
  );

  const [currencySelect, setCurrencySelect] = useState<number>(-1);

  useEffect(() => {
    if (isDefined(currency)) setCurrencySelect(currencyOptions.indexOf(currency));
  }, [currency, currencyOptions]);

  useEffect(() => {
    if (currencySelect >= 0) setCurrency(currencyOptions[currencySelect]);
  }, [currencyOptions, currencySelect, setCurrency]);

  return (
    <Popup
      isVisible={configPanelOpen}
      onCloseRequest={() => {
        setConfigPanelOpen(false);
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
                    setDarkMode(false);
                    setSelectedThemeMode(true);
                    sendAnalytics("Settings", "Change theme (light)");
                  },
                  active: selectedThemeMode && !darkMode,
                  text: langui.light,
                },
                {
                  onClick: () => {
                    setSelectedThemeMode(false);
                    sendAnalytics("Settings", "Change theme (auto)");
                  },
                  active: !selectedThemeMode,
                  text: langui.auto,
                },
                {
                  onClick: () => {
                    setDarkMode(true);
                    setSelectedThemeMode(true);
                    sendAnalytics("Settings", "Change theme (dark)");
                  },
                  active: selectedThemeMode && darkMode,
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
                  setCurrencySelect(newCurrency);
                  sendAnalytics("Settings", `Change currency (${currencyOptions[newCurrency]})}`);
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
                active={!dyslexic}
                onClick={() => {
                  setDyslexic(false);
                  sendAnalytics("Settings", "Change font (Zen Maru Gothic)");
                }}
                className="font-zenMaruGothic"
                text="Zen Maru Gothic"
              />
              <Button
                active={dyslexic}
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
