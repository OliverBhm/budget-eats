"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import BottomMobileHeader from "@/packages/features/shared/ui/components/bottom-mobile-header";
import NavSidebar from "@/packages/features/shared/ui/components/nav-sidebar";
import TopMobileHeader from "@/packages/features/shared/ui/components/top-mobile-header/top-mobile-header";
import { GroupsSwitcher } from "@/packages/features/ui/groups/components/group-switcher";
import { Settings, Timer } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultOpen = true; //cookieStore.get("sidebar-open")?.value === "true";

  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <NavSidebar />
            <SidebarInset>
              <TopMobileHeader />
              <main className="flex-1 m-3 mt-6 pb-15">{children}</main>
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
