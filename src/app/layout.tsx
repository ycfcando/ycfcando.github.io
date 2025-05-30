import "./globals.css";
import Header from "@/modules/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { MenuProvider } from "@/components/provider/route-provider";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { getMenus } from "@/lib/server/menus";

const myFont = localFont({
  src: "../../public/fonts/font.woff2",
});

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = await getMenus();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-screen", myFont.className)}
    >
      <body className="h-full overflow-hidden relative m-0 bg-[url(./bg.webp)]">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MenuProvider data={menus}>
            <Header />
            <main className="container mx-auto h-[calc(100%-48px)]">
              {children}
            </main>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
