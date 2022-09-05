import { useAppLayout } from "contexts/AppLayoutContext";

export const useIsTerminalMode = (): boolean => {
  const { playerName } = useAppLayout();
  return playerName === "root";
};
