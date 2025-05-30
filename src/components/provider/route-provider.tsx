"use client";

import { createContext, PropsWithChildren } from "react";
import { IMenu } from "@/types/mdx";

export const RouteContext = createContext<Array<IMenu>>([]);

export function MenuProvider({
  children,
  data,
}: PropsWithChildren<{ data: Array<IMenu> }>) {
  return <RouteContext value={data}>{children}</RouteContext>;
}
