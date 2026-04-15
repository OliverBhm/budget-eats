"use client";

import { Button } from "@/components/ui/button";
import { Headline } from "@/components/ui/headline";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Paragraph } from "@/components/ui/paragraph";
import { ChevronLeftCircle, Newspaper, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
    <Button className={BUTTON_STYLES} size="icon-lg" variant="ghost">
      <Newspaper />
    </Button>
  );
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <form className="relative flex flex-1 items-center">
      {query.length > 0 ? (
        <Button
          type="button"
          className="absolute right-1 z-50"
          onClick={() => setQuery("")}
          variant="ghost"
          size="sm"
        >
          <X />
        </Button>
      ) : (
        <Button
          type="submit"
          className="absolute right-1 z-50"
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
        className="relative z-50 w-full rounded-full pr-12"
      />

      <div className={POPOVER_STYLES}>
        <Paragraph size="label-sm" variant="muted">
          4 Search results
        </Paragraph>
        <Headline as="h4" level="h5" className="mt-2 text-foreground">
          Tonight&apos;s best shortcuts
        </Headline>
        <ItemGroup className="mt-4 gap-3">
          <Item variant="muted" className="rounded-[1.25rem] px-3 py-3">
            <ItemMedia variant="image">
              <Image
                src={mockImg}
                alt="Food"
                width={ingredientThumbailSize}
                height={ingredientThumbailSize}
              />
            </ItemMedia>
            <ItemContent>
              <div>
                <ItemTitle className="font-display text-lg tracking-[-0.04em]">
                  Pasta Alfredo
                </ItemTitle>
                <ItemDescription>Weeknight pantry favorite</ItemDescription>
              </div>
              <ItemDescription className="font-display text-xl text-tertiary">
                $7.99
              </ItemDescription>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </form>
  );
}

function BackNavigationButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className={BUTTON_STYLES}
      size="icon-sm"
      variant="ghost"
    >
      <ChevronLeftCircle />
    </Button>
  );
}

export default function TopMobileHeader() {
  const pathname = usePathname();
  const isOnChildpage = pathname.split("/").filter(Boolean).length > 1;

  return (
    <header className="sticky top-0 z-50 md:hidden">
      <nav className="bg-muted group/search relative flex items-center gap-3 rounded-lg px-3 py-3 shadow-[0_24px_48px_-30px_rgba(28,28,24,0.18)]">
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
