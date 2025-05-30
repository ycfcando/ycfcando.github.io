import { ReactNode } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type FrontmatterType = Record<string, ReactNode>;

export interface IMDXSource
  extends MDXRemoteSerializeResult<FrontmatterType, FrontmatterType> {
  headings: Array<IHeadingInterfase>;
}

export interface DocumentRoutesData {
  name: string;
  path: string;
  relativePath: string;
  route: string;
  isMDX: boolean;
  level: number;
  slug: string[];
}

export interface IMenu {
  path: string;
  name: string;
  children?: Array<IMenu>;
}

export interface IHeadingInterfase {
  depth: number;
  text: string;
  id: string;
}
