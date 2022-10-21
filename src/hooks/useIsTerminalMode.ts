import { useUserSettings } from "contexts/UserSettingsContext";

export const useIsTerminalMode = (): boolean => {
  const { playerName } = useUserSettings();
  return playerName === "root";
};
