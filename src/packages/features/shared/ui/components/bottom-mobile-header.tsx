"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { UserAvatar } from "@/packages/features/user/ui/components/user-avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
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
  return (
    <Link
      href={link}
      className={`${
        pathname === link && "bg-secondary/20"
      } flex w-full justify-center`}
    >
      <Button
        variant="ghost"
        className="flex h-auto w-full flex-col gap-1 py-3"
      >
        {icon}
        {name && <span className="text-xs">{name}</span>}
      </Button>
    </Link>
  );
}

export default function BottomMobileHeader() {
  const tabs = [
    {
      name: "Discover",
      icon: <HomeIcon />,
      link: "/discover",
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
      className="w-full rounded-t-xl bg-primary shadow-lg md:hidden text-secondary"
    >
      <div className="grid grid-cols-5 items-end">
        {tabs.map((tab) => (
          <MobileNavItem key={tab.link} {...tab} />
        ))}
        <SheetTrigger asChild>
          <Button variant={"ghost"}>
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
