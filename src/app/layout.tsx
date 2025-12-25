import TopMobileHeader from "@/packages/features/shared/ui/components/top-mobile-header";
import BottomMobileHeader from "@/packages/features/shared/ui/components/bottom-mobile-header";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Settings, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopMobileHeader />
          <main id="content" className="flex-1 m-3 mt-6 pb-15">
            {children}
          </main>
          <Toaster />
          <footer className="fixed bottom-0 right-0 left-0">
            <Sheet>
              <SheetContent>
                <SheetHeader>Group Switcher</SheetHeader>
                <nav>
                  <ul className="">
                    <li>
                      <Button>
                        <Settings /> Settings
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <Timer /> Timers
                      </Button>
                    </li>
                    <li>
                      <Button>
                        <Timer /> Timers
                      </Button>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
              <BottomMobileHeader />
            </Sheet>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
