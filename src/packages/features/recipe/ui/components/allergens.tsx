import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { capitalize } from "@/packages/features/formatting/util/text";
import { Value } from "@radix-ui/react-select";
import { Check } from "lucide-react";
import { useState } from "react";

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
  const allergens = [
    "gluten",
    "crustaceans",
    "eggs",
    "fish",
    "peanuts",
    "soybeans",
    "milk",
    "nuts",
    "celery",
    "mustard",
    "sesame seeds",
    "sulphur dioxide",
    "lupin",
    "molluscs",
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredAllergens = allergens.filter((allergen) =>
    allergen.includes(searchQuery)
  );

  return (
    <>
      <Input
        value={searchQuery}
        onChange={({ target: { value } }) => handleSearch(value)}
        placeholder="Search allergens..."
        className="mb-2"
      />
      <ToggleGroup
        type="multiple"
        variant="outline"
        spacing={2}
        className={className}
        onValueChange={onChange}
        value={selectedAllergens}
      >
        {filteredAllergens.map((allergen) => (
          <ToggleGroupItem key={allergen} value={allergen} highlightSvg={true}>
            {capitalize(allergen)}
            <Check className="" />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}
