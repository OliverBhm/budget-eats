import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Paragraph } from "@/components/ui/paragraph";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { capitalize } from "@/packages/features/formatting/util/text";
import { Value } from "@radix-ui/react-select";
import { Check, Crosshair, StopCircle } from "lucide-react";
import { Fragment, useState } from "react";

interface AllergensProps {
  selectedAllergens?: string[];
  onChange?: (allergens: string[]) => void;
  className?: string;
}

export function Allergens({
  selectedAllergens,
  onChange,
  className,
}: AllergensProps) {
  const allergenOptions: Record<string, { label: string; symbol: string }> = {
    gluten: { label: "Gluten", symbol: "🌾" },
    crustaceans: { label: "Crustaceans", symbol: "🦐" },
    eggs: { label: "Eggs", symbol: "🥚" },
    fish: { label: "Fish", symbol: "🐟" },
    peanuts: { label: "Peanuts", symbol: "🥜" },
    soybeans: { label: "Soybeans", symbol: "🌱" },
    milk: { label: "Milk", symbol: "🥛" },
    nuts: { label: "Nuts", symbol: "🌰" },
    celery: { label: "Celery", symbol: "🌿" },
    mustard: { label: "Mustard", symbol: "🌭" },
    sesameSeeds: { label: "Sesame Seeds", symbol: "🌼" },
    sulphurDioxide: { label: "Sulphur Dioxide", symbol: "💨" },
    lupin: { label: "Lupin", symbol: "🌸" },
    molluscs: { label: "Molluscs", symbol: "🐚" },
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredAllergens = Object.keys(allergenOptions)
    .sort((a, b) =>
      allergenOptions[a].label.localeCompare(allergenOptions[b].label)
    )
    .filter((allergen) =>
      allergenOptions[allergen].label.toLowerCase().includes(searchQuery)
    );
  return (
    <div className="space-y-2">
      <Input
        value={searchQuery}
        onChange={({ target: { value } }) => handleSearch(value)}
        placeholder="Search allergens..."
      />
      <ToggleGroup
        type="multiple"
        variant="outline"
        className={cn(`w-full`, className)}
        spacing={2}
        onValueChange={onChange}
        value={selectedAllergens}
      >
        {filteredAllergens.length ? (
          filteredAllergens.map((allergen) => (
            <Fragment key={allergen}>
              <ToggleGroupItem
                key={allergen}
                value={allergen}
                className="flex gap-1"
                iconSVG="grayscale"
              >
                <Paragraph>{allergenOptions[allergen].label}</Paragraph>
                <span data-icon>{allergenOptions[allergen].symbol}</span>
              </ToggleGroupItem>
            </Fragment>
          ))
        ) : (
          <Empty className="bg-muted">
            <EmptyHeader>
              <EmptyDescription>No allergens found</EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </ToggleGroup>
    </div>
  );
}
