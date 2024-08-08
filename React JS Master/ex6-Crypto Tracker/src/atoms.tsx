import { atom, useRecoilState } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

export const useThemeMode = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const toggleMode = () => setIsDark((prev) => !prev);
  return { isDark, toggleMode };
};
