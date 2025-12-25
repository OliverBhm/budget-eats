"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Bell,
  ChevronLeftCircle,
  Newspaper,
  SearchIcon,
  Settings,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { mockNotificationsResponse } from "../../../api/mocks/messages";
import NotificationsList from "./notification-bell";

const mockImg = "/essen.jpeg";
const ingredientThumbailSize = 100;

const SHARED_TRANSITION = "transition-all duration-300 ease-in-out";

const BUTTON_STYLES = cn(
  SHARED_TRANSITION,
  "max-w-[50px] opacity-100",
  "group-focus-within/search:max-w-0 group-focus-within/search:opacity-0"
);

const POPOVER_STYLES = cn(
  "bg-secondary p-4 rounded-b-lg shadow-lg w-full absolute left-0 z-50 top-9",
  SHARED_TRANSITION,
  "invisible opacity-0",
  "group-focus-within/search:visible group-focus-within/search:opacity-100"
);

const BACKDROP_STYLES = cn(
  "fixed inset-0 z-40 backdrop-blur-xs",
  SHARED_TRANSITION,
  "opacity-0 invisible pointer-events-none",
  "group-focus-within/search:opacity-100 group-focus-within/search:visible group-focus-within/search:pointer-events-auto"
);

function NotificationBell() {
  const numberOfNotifications = 5;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={BUTTON_STYLES} size="icon-sm" variant="ghost">
          <div className="relative">
            <div className="absolute -right-1 -top-1 bg-destructive rounded-full text-[10px] h-3 w-3 flex items-center justify-center text-white">
              {numberOfNotifications}
            </div>
            <Bell />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[360px] p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-sm font-medium">Notifications</h3>
          <span className="text-xs text-muted-foreground">
            {mockNotificationsResponse.unread} unread
          </span>
        </div>

        <NotificationsList notifications={mockNotificationsResponse.data} />
      </PopoverContent>
    </Popover>
  );
}

function DiscountsQuickLink() {
  return (
    <Button className={BUTTON_STYLES} size="icon-sm" variant="ghost">
      <Newspaper />
    </Button>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <form className="relative flex items-center flex-1">
      {query.length > 0 ? (
        <Button
          type="button"
          className="absolute right-0 mr-3 z-20"
          onClick={() => setQuery("")}
          variant="ghost"
          size="sm"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="submit"
          className="absolute right-0 mr-3 z-20"
          variant="ghost"
          size="sm"
        >
          <SearchIcon />
        </Button>
      )}

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find recipes, products or discounts"
        className="w-full bg-background relative z-10"
      />

      <div className={POPOVER_STYLES}>
        <h4 className="font-bold text-xl mb-2">4 Search results</h4>
        <ItemGroup>
          <Item>
            <ItemMedia variant="image">
              <Image
                src={mockImg}
                alt="Food"
                width={ingredientThumbailSize}
                height={ingredientThumbailSize}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Pasta Alfredo</ItemTitle>
              <ItemDescription>$7.99</ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </form>
  );
}

function BackNavigationButton() {
  const pathname = usePathname();
  const backLink = pathname.split("/").slice(0, -1).join("/") || "/discover";

  return (
    <Link href={backLink}>
      <Button className={BUTTON_STYLES} size="icon-sm" variant="ghost">
        <ChevronLeftCircle />
      </Button>
    </Link>
  );
}

export default function TopMobileHeader() {
  const pathname = usePathname();
  const isOnChildpage = pathname.split("/").length > 2;

  return (
    <header className="w-full p-3 shadow-xs bg-accent sticky top-0 z-50">
      <nav className="relative flex items-center gap-2">
        {isOnChildpage ? <BackNavigationButton /> : <DiscountsQuickLink />}
        <div className="group/search relative flex-1">
          <div className={BACKDROP_STYLES} aria-hidden />
          <Search />
        </div>
        <NotificationBell />
      </nav>
    </header>
  );
}
