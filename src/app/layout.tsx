'use server';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Nav } from '@/modules/nav';
import { Sidebar } from '@/modules/sidebar';
import { ThemeProvider } from '@/components/provider/theme-provider'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <body className='m-0'>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <header className='container mx-auto'>
            <Nav/>
          </header>
          <main className='container mx-auto flex'>
            <Sidebar/>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}