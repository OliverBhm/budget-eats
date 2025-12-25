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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, ChevronLeftCircle, Newspaper, SearchCheck, SearchIcon, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockImg = "/essen.jpeg";
const ingredientThumbailSize = 100;

const SHARED_TRANSITION = "transition-all duration-300 ease-in-out";

const BUTTON_STYLES = cn(
  SHARED_TRANSITION,
  "max-w-[50px] opacity-100",
  "group-focus-within:max-w-0 group-focus-within:opacity-0"
);

const GROUP_FOCUS_WITHIN = cn(
  "group-focus-within:visible group-focus-within:opacity-100"
);

const POPOVER_STYLES = cn(
  "bg-secondary p-4 rounded-b-lg shadow-lg w-full absolute left-0 z-50 top-9",
  SHARED_TRANSITION,
  " invisible opacity-0",
  GROUP_FOCUS_WITHIN
);

const BACKDROP_STYLES = cn(
  "fixed inset-0 z-40 backdrop-blur-xs",
  SHARED_TRANSITION,
  "opacity-0 invisible pointer-events-none",
  GROUP_FOCUS_WITHIN
);

function NotificationBell() {
  const numberOfNotifications = 5;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={BUTTON_STYLES} size={"icon-sm"} variant={"ghost"}>
          <div className="relative">
            <div className="absolute text-white -right-1 -top-1 bg-destructive rounded-full text-[10px] text-secondary h-3 w-3 flex items-center justify-center">
              {numberOfNotifications < 10 ? numberOfNotifications : ""}
            </div>
            <Bell />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-md">
            You have <strong>{numberOfNotifications}</strong> unread messages:
          </h3>
          <Button variant={'secondary'}><Settings /></Button>
        </div>
        <ul className="space-y-2">
          <li className="flex gap-2">
            <Avatar>
              <AvatarFallback>OB</AvatarFallback>
            </Avatar>
            <span>
              <p>Add a new item to the shopping list.</p>
              <p className="text-muted-foreground">
                12/13/25 by <strong>Oliver</strong>
              </p>
            </span>
          </li>
          <li className="flex gap-2">
            <Avatar>
              <AvatarFallback>NM</AvatarFallback>
            </Avatar>
            <span>
              <p>
                Uploaded a new recite from <strong>Rewe</strong>
              </p>
              <p className="text-muted-foreground">
                12/13/25 by <strong>Nastja</strong>
              </p>
            </span>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
}

function DiscountsQuickLink() {
  return (
    <Button className={BUTTON_STYLES} size={"icon-sm"} variant={"ghost"}>
      <Newspaper />
    </Button>
  );
}

function Search() {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form
      id="header-search-group"
      className={`flex-1 relative flex items-center ${SHARED_TRANSITION}`}
    >
      {query.trim().length ? (
        <Button
          className="absolute right-0 mr-3"
          onClick={() => setQuery("")}
          variant={"ghost"}
          size={"sm"}
        >
          <X />
        </Button>
      ) : (
        <Button
          type="submit"
          className="absolute right-0 mr-3"
          variant={"ghost"}
          size={"sm"}
        >
          <SearchIcon />
        </Button>
      )}
      <Input
        id="header-search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find recipes, products or discounts"
        className="overflow-ellipsis w-full bg-background relative z-10"
      />
      <div className={POPOVER_STYLES}>
        <h4 className="font-bold text-xl mb-2">4 Search results</h4>
        <ItemGroup>
          <Item>
            <ItemMedia variant={"image"}>
              <Image
                src={mockImg}
                alt="image of food"
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
    const backLink = pathname.split("/")?.pop()
    return (
      <Link href={backLink || "discover"}>
        <Button className={BUTTON_STYLES} size={"icon-sm"} variant={"ghost"}>
          <ChevronLeftCircle />
        </Button>
      </Link>
    );
}

export default function TopMobileHeader() {
    const pathname = usePathname();
    const isOnChildpage = pathname.split("/").length > 2;

  return (
    <header className="group w-full p-3 w-full shadow-xs bg-accent bg-accent sticky top-0 z-50 w-full">
      <div className={BACKDROP_STYLES} aria-hidden="true" />

      <nav className="relative z-50 flex justify-between w-full items-center gap-2">
        {isOnChildpage}
        {isOnChildpage ? <BackNavigationButton /> : <DiscountsQuickLink />}
        {/*<Search />*/}
        <NotificationBell />
      </nav>
    </header>
  );
}
