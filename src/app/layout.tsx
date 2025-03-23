"use server";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Nav } from "@/modules/nav";
import { ThemeProvider } from "@/components/provider/theme-provider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className="m-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <header className="container mx-auto">
            <Nav />
          </header>
          <main className="container mx-auto mt-[48px] relative grid grid-cols-6 gap-1">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
