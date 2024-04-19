import { useEffect, useState } from "react";

const useTheme = () => {
  const [mode, setMode] = useState("dark");

  const changedTheme = () => {
    const html = document.documentElement;

    if (mode == "dark") {
      html.classList.remove("dark");
      html.classList.add("light");
      localStorage.setItem("mode", "light");
    } else {
      html.classList.remove("light");
      html.classList.add("dark");
      localStorage.setItem("mode", "dark");
    }
  };

  useEffect(() => {
    const currentMode = localStorage.getItem("mode") || "light";
    if (currentMode) {
      setMode(currentMode);
      document.documentElement.classList.add(currentMode);
    }
  }, []);

  return { mode, changedTheme };
};

export default useTheme;
