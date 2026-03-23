"use client";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import BottomMobileHeader from "@/packages/features/shared/ui/components/bottom-mobile-header";
import NavSidebar from "@/packages/features/shared/ui/components/nav-sidebar";
import TopMobileHeader from "@/packages/features/shared/ui/components/top-mobile-header/top-mobile-header";
import { GroupsSwitcher } from "@/packages/features/ui/groups/components/group-switcher";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultOpen = true; //cookieStore.get("sidebar-open")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${workSans.variable} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <NavSidebar />
            <SidebarInset>
              <TopMobileHeader />
              <main className="m-4 mt-6 flex-1 pb-20 md:m-6 md:mt-8 md:pb-8">
                {children}
              </main>
            </SidebarInset>
            <Toaster />

            <footer className="fixed bottom-0 right-0 left-0">
              <Sheet>
                <SheetContent>
                  <SheetHeader>
                    <GroupsSwitcher {...{ groups: GROUPS_MOCK }} />
                  </SheetHeader>
                </SheetContent>
                <BottomMobileHeader />
              </Sheet>
            </footer>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
