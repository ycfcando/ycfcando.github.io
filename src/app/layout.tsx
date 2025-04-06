import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/modules/header";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { RouteProvider } from "@/components/provider/route-provider";
import { getDocumentRoutesData } from "@/lib/file";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routesData = await getDocumentRoutesData();
  
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className="m-0">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <RouteProvider data={routesData}>
            <Header />
            <main className="container mx-auto mt-[48px] relative grid grid-cols-6 gap-1">
              {children}
            </main>
          </RouteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
