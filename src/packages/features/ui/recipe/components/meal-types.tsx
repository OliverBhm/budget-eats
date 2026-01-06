import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { capitalize } from "@/packages/features/formatting/util/text";
import { Check } from "lucide-react";

interface MealTypesProps {
  selectedMealTypes?: string[];
  onChange?: (mealTypes: string[]) => void;
  className?: string;
}

function Mealtypes({ selectedMealTypes, onChange, className }: MealTypesProps) {
  const mealTypes = ["breakfest", "lunch", "dinner", "snack", "afternoon tea"];
  return (
    <ToggleGroup
      className={cn(className)}
      type="multiple"
      variant={"outline"}
      spacing={2}
    >
      {mealTypes.map((mealType) => (
        <ToggleGroupItem key={mealType} value={mealType} iconSVG="highlight">
          {capitalize(mealType)} <Check />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export { Mealtypes };
