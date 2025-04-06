export interface FrontmatterInterface {
  title: string;
  authors: string;
  date: string;
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
