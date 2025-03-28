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
      options={{
        bundlerURL: "http://locahost:3000",
        // 或自定义 bundler 地址
        // bundlerURL: "https://your-server.com/sandpack-bundler",
      }}
    >
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default CustomSandpack;
