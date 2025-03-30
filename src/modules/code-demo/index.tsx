"use client";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import type { SandpackProviderProps } from "@codesandbox/sandpack-react";
import { useTheme } from "next-themes";

const CustomSandpack = ({
  files,
  options,
  ...props
}: SandpackProviderProps) => {
  const { theme } = useTheme();
  return (
    <SandpackProvider
      template="react"
      theme={theme === "dark" ? "dark" : "light"}
      files={files}
      options={{
        bundlerURL: "https://sandpack-bundler.codesandbox.io/latest/bundler.js",
        classes: {
          "sp-tab-container": "custom-tab-container",
          "sp-tabs-scrollable-container": "custom-tabs-scrollable-container",
        },
        ...options,
      }}
      {...props}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CustomSandpack;
