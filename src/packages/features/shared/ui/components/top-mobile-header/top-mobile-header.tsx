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
import { ChevronLeftCircle, Newspaper, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BACKDROP_STYLES,
  BUTTON_STYLES,
  POPOVER_STYLES,
} from "./styles/search";
import { NotificationBell } from "./notification-bell";

const mockImg = "/essen.jpeg";
const ingredientThumbailSize = 100;

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
          className="absolute right-0 mr-3 z-50"
          onClick={() => setQuery("")}
          variant="ghost"
          size="sm"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="submit"
          className="absolute right-0 mr-3 z-50"
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
        className="w-full bg-background relative z-50"
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
      <nav className="relative flex items-center gap-2 group/search">
        {isOnChildpage ? <BackNavigationButton /> : <DiscountsQuickLink />}
        <div className="relative flex-1">
          <div className={BACKDROP_STYLES} aria-hidden />
          <Search />
        </div>
        <NotificationBell />
      </nav>
    </header>
  );
}
