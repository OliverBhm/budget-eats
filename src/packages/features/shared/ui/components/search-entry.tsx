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
import { cn } from "@/lib/utils";
import { SearchIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import {
  BACKDROP_STYLES,
  BUTTON_STYLES,
  POPOVER_STYLES,
} from "./top-mobile-header/styles/search";

const mockImg = "/essen.jpeg";
const ingredientThumbnailSize = 100;

type SearchEntryProps = {
  className?: string;
  inputClassName?: string;
  popoverClassName?: string;
  showBackdrop?: boolean;
};

function SearchEntry({
  className,
  inputClassName,
  popoverClassName,
  showBackdrop = true,
}: SearchEntryProps) {
  const [query, setQuery] = useState("");

  return (
    <form className={cn("relative flex items-center", className)}>
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
        aria-label="Search recipes, products or discounts"
        className={cn(
          "relative z-50 w-full rounded-full bg-surface-container-lowest pr-12",
          inputClassName
        )}
      />

      {showBackdrop ? <div className={BACKDROP_STYLES} aria-hidden /> : null}

      <div className={cn(POPOVER_STYLES, popoverClassName)}>
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
                width={ingredientThumbnailSize}
                height={ingredientThumbnailSize}
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

export { BUTTON_STYLES, SearchEntry };