import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { capitalize } from "@/packages/features/formatting/util/text";
import { Check } from "lucide-react";

interface DietTypesProps {
  selectedDietTypes?: string;
  onChange?: (dietTypes: string) => void;
  className?: string;
}

export function DietTypes({
  selectedDietTypes,
  onChange,
  className,
}: DietTypesProps) {
  const dietTypes = ["everthing", "ketogenic", "paleo", "vegan", "vegetarian"];
  const dietTypeIcons: Record<string, string> = {
    vegetarian: "🥕",
    vegan: "🌱",
    everthing: "🍖",
    ketogenic: "🥓",
    paleo: "🍖",
  };

  return (
    <ToggleGroup
      type="single"
      variant={"outline"}
      className={cn(className)}
      spacing={2}
      onValueChange={onChange}
      value={selectedDietTypes}
    >
      {dietTypes.map((dietType) => (
        <ToggleGroupItem
          key={dietType}
          value={dietType}
          className="[&_[data-icon]]:grayscale data-[state=on]:[&_[data-icon]]:grayscale-0"
        >
          {capitalize(dietType)}
          <span className="transition duration-100 ease-in-out" data-icon>
            {dietTypeIcons[dietType]}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
