"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { setTheme } = useTheme();

  const switched = useCallback(() => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }, [setTheme]);

  return (
    <Button variant="ghost" size="icon" onClick={switched}>
      <Sun className="h-4 w-4" />
    </Button>
  );
}
