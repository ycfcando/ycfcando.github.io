"use client";

import { createContext, PropsWithChildren } from "react";
import { DocumentRoutesData } from "@/types/mdx";

export const RouteContext = createContext<DocumentRoutesData[]>([]);

export function RouteProvider({
  children,
  data,
}: PropsWithChildren<{ data: DocumentRoutesData[] }>) {
  return <RouteContext value={data}>{children}</RouteContext>;
}
