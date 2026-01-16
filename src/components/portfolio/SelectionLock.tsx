"use client";

import { useEffect } from "react";

export default function SelectionLock() {
  useEffect(() => {
    const preventDefault = (event: Event) => event.preventDefault();
    const preventKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "a") {
        event.preventDefault();
      }
    };

    document.addEventListener("selectstart", preventDefault, true);
    document.addEventListener("dragstart", preventDefault, true);
    document.addEventListener("copy", preventDefault, true);
    document.addEventListener("cut", preventDefault, true);
    document.addEventListener("contextmenu", preventDefault, true);
    document.addEventListener("keydown", preventKey, true);

    return () => {
      document.removeEventListener("selectstart", preventDefault, true);
      document.removeEventListener("dragstart", preventDefault, true);
      document.removeEventListener("copy", preventDefault, true);
      document.removeEventListener("cut", preventDefault, true);
      document.removeEventListener("contextmenu", preventDefault, true);
      document.removeEventListener("keydown", preventKey, true);
    };
  }, []);

  return null;
}
