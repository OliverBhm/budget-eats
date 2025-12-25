import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ItemGroup
} from "@/components/ui/item";
import { IngredientItems } from "@/packages/features/ingredients/ui/components/ingredient-items";
import { mockFriedRiceRecipeResponse } from "@/packages/features/recipe/api/mocks/recipe";
import {
  RecipeData,
  RecipeIngredient
} from "@/packages/features/recipe/api/model/recipe";
import { ArrowLeftRight, ArrowRightCircle, ChevronDown, Plus } from "lucide-react";
import Link from "next/link";

function IngredientsList({ ingredients }: { ingredients: RecipeIngredient[] }) {
  if (!ingredients?.length) return null;

  return (
    <ItemGroup variant={"muted"}>
      <IngredientItems {...{ ingredients }} />
    </ItemGroup>
  );
}

interface RecipePreviewCardProps {
  meal?: RecipeData | null;
  mealType: "breakfest" | "lunch" | "dinner" | "snack";
  className?: string;
  variant?: "detailed" | "simple";
}

export function RecipePreviewCard({
  meal,
  mealType,
  className,
  variant = "detailed",
}: RecipePreviewCardProps) {
  if(!meal) {
    return null;
  }
  const {id, title, description, ingredients } = meal; 
  const recipeLink = `/recipe/${id}`;

  return (
    <>
      <Card className={className}>
          <CardHeader>
            <div className="flex">
              <div>
                <p className="text-sm text-muted-foreground">{mealType}</p>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
              <Link href={recipeLink}>
                <Button size={"lg"} variant={"secondary"}>
                  View
                  <ArrowRightCircle />
                </Button>
              </Link>
            </div>
          </CardHeader>
        <CardContent>
          <Collapsible>
            <div className="flex items-center text-md pb-2 gap-2">
              {variant === "detailed" && ingredients.length > 0 && (
                <CollapsibleTrigger asChild>
                  <Button size="sm" variant="secondary">
                    Ingredients <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              )}
              <Button size="sm" variant="secondary">
                Change recipe <ArrowLeftRight />
              </Button>
            </div>
            <CollapsibleContent className="mt-4 space-y-2">
              <IngredientsList ingredients={ingredients} />
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    </>
  );
}

const MEALS = [
  {
    id: "dskaöd-12312-dad-42-123-dsf",
    mealType: "breakfest",
    recipe: {
      ...mockFriedRiceRecipeResponse.data,
      title: "Overnight Oats",
      description: "Perfect for the healthy amout of energy in the morning.",
    },
  },
  {
    id: "dskaöd-12312-dad-42-123-asd",
    mealType: "lunch",
    recipe: mockFriedRiceRecipeResponse.data,
  },
  {
    id: "dskaöd-12312-dad-42-123-asdd",
    mealType: "dinner",
    recipe: {
      ...mockFriedRiceRecipeResponse.data,
      title: "Toast",
      description: 'Finish the day with a traditional toast and cheese sandwich.'
    },
  },
];

function getTotalPriceFromIngredients() {
  return [
    ...MEALS.map(
      (meal) =>
        meal.recipe?.ingredients?.map(({ price_per_unit }) => price_per_unit) ??
        0
    ).flat(),
  ].reduce((acc, curr) => (curr += acc || 0), 0);
}

export default function WeeklyMeals() {
  const meals = MEALS;
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h3 className="text-2xl font-bold">
        Todays menu - ${getTotalPriceFromIngredients().toFixed(2)}
      </h3>

      {meals.map(({ id, recipe: meal, mealType }) => (
        <RecipePreviewCard
          key={id}
          {...{ mealType, meal }}
          variant="detailed"
        />
      ))}
      <Button>
        Add another meal
        <Plus />
      </Button>
    </div>
  );
}
