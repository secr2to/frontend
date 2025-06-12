import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return {
    baseBackground: isDark ? "#e0e0e0" : "#f7f7f7",
    grayLight: isDark ? "#e6e6e6" : "#d6d6d6",
    selected: isDark ? "#36a97e" : "#36a97e",
    unselected: isDark ? "#808080" : "#808080",
  };
};
