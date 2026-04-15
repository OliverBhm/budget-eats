"use client";

import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { UserAvatar } from "@/packages/features/ui/user/components/user-avatar";
import { BarChart, CookingPot, DollarSign, HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function MobileNavItem({
  icon,
  name,
  link,
}: {
  icon: ReactNode;
  name: string;
  link: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className="flex min-w-0 w-full justify-center"
    >
      <Button
        variant="ghost"
        size="sm"
        className={`flex h-auto min-w-0 w-full flex-col gap-1 rounded-t-xl px-1.5 py-3 ${
          isActive
            ? "bg-primary text-primary-foreground shadow-[0_24px_48px_-30px_rgba(15,82,56,0.4)]"
            : "text-foreground"
        }`}
      >
        {icon}
        {name && (
          <span className="text-xs font-semibold leading-[1.2] tracking-[0.12em] uppercase">
            {name}
          </span>
        )}
      </Button>
    </Link>
  );
}

export default function BottomMobileHeader() {
  const tabs = [
    {
      name: "Discover",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      name: "Cooking",
      icon: <CookingPot />,
      link: "/cooking",
    },
    {
      name: "Budget",
      icon: <DollarSign />,
      link: "/budget",
    },
    {
      name: "Health",
      icon: <BarChart />,
      link: "/nutrition-tracking",
    },
  ];

  return (
    <nav
      id="bottom-mobile-nav"
      className="rounded-t-lg bg-muted mx-2 py-2 shadow-[0_24px_48px_-30px_rgba(28,28,24,0.2)] md:hidden"
    >
      <div className="grid grid-cols-5 gap-1 items-end">
        {tabs.map((tab) => (
          <MobileNavItem key={tab.link} {...tab} />
        ))}
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="h-auto rounded-[1.25rem] px-1.5 py-3">
            <UserAvatar
              className="h-8 w-8"
              {...{ imgUrl: "", firstname: "Oliver", lastname: "Boehm" }}
            />
          </Button>
        </SheetTrigger>
      </div>
    </nav>
  );
}
