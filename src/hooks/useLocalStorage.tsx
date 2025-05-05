"use client";

import { useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
  const [state, setState] = useState<null | string | number>(null);

  useEffect(() => {
    if (typeof window != undefined) {
      setState(localStorage.getItem(key) ?? null);
    }
  }, []);

  return { state };
};
