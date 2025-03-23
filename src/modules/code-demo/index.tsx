"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
} from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

const CustomSandpack = () => {
  const { theme } = useTheme();

  return (
    <SandpackProvider
      template="vanilla"
      theme={theme === "dark" ? "dark" : "light"}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CustomSandpack;
