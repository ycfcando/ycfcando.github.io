"use server";

import { join } from "node:path";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/modules/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { getFolderNames } from "@/lib/file";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navData = await getFolderNames(join(process.cwd(), "mdx")).then(
    (dirnames) =>
      dirnames?.map((dirname) => ({ path: `/${dirname}`, text: dirname }))
  );

  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className="m-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header navData={navData} />
          <main className="container mx-auto mt-[48px] relative grid grid-cols-6 gap-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
