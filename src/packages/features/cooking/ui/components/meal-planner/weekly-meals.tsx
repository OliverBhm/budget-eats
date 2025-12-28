import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ItemGroup } from "@/components/ui/item";
import { IngredientItems } from "@/packages/features/ingredients/ui/components/ingredient-items";
import {
  mockApplePeanutButterSnackResponse,
  mockFriedRiceRecipeResponse,
  mockOvernightOatsRecipeResponse,
} from "@/packages/features/recipe/api/mocks/recipe";
import {
  RecipeData,
  RecipeIngredient,
} from "@/packages/features/recipe/api/model/recipe";
import {
  ArrowLeftRight,
  ArrowRightCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
} from "lucide-react";
import Link from "next/link";

function IngredientsList({ ingredients }: { ingredients: RecipeIngredient[] }) {
  if (!ingredients?.length) return null;

  return (
    <ItemGroup variant={"muted"}>
      <IngredientItems {...{ ingredients }} />
    </ItemGroup>
  );
}

type MealType = "snack" | "breakfest" | "lunch" | "dinner";

interface RecipePreviewCardProps {
  meal: Partial<RecipeData> | null;
  mealType: MealType;
  className?: string;
  variant?: "detailed" | "simple";
}

// Todo rework fix for type conflicts
export function RecipePreviewCard({
  meal,
  mealType,
  className,
  variant = "detailed",
}: RecipePreviewCardProps) {
  if (!meal) {
    return null;
  }

  const { id, title, description, ingredients, time, nutrition, difficulty } =
    meal;

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex">
            <div>
              <p className="text-sm text-muted-foreground">{mealType}</p>
              <CardTitle>{title}</CardTitle>
              <CardDescription className="space-y-2">
                <p>{description}</p>
                <ul className="flex gap-2 items-center">
                  {time && (
                    <li className="flex gap-1 items-center">
                      <Clock className="w-3 h-3" />
                      <p>{time.total_minutes}</p>
                    </li>
                  )}
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  {nutrition && <li>{nutrition.calories} kcal</li>}
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  {difficulty && (
                    <li>
                      <Badge>{difficulty}</Badge>
                    </li>
                  )}
                </ul>
              </CardDescription>
            </div>
            <Link href={`/recipe/${id}`}>
              <Button size={"lg"} variant={"secondary"}>
                View
                <ArrowRightCircle />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {ingredients?.length && (
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
          )}
        </CardContent>
      </Card>
    </>
  );
}

const MEALS: { id: string; mealType: MealType; recipe: RecipeData | null }[] = [
  {
    id: "dskaöd-12312-dad-42-123-dsf",
    mealType: "breakfest",
    recipe: mockOvernightOatsRecipeResponse.data!,
  },
  {
    id: "dskaöd-12312-dad-42-123-asd",
    mealType: "lunch",
    recipe: mockFriedRiceRecipeResponse.data!,
  },
  {
    id: "dskaöd-12312-dad-42-123-asdd",
    mealType: "dinner",
    recipe: mockApplePeanutButterSnackResponse.data!,
  },
];

function getTotalPriceFromIngredients() {
  return (
    [
      ...MEALS.map(
        (meal) =>
          meal.recipe?.ingredients?.map(
            ({ price_per_unit }) => price_per_unit
          ) ?? 0
      ).flat(),
    ].reduce((acc, curr) => (curr += acc || 0), 0) * 4
  );
}

export default function WeeklyMeals() {
  const meals = MEALS;
  return (
    <div className="flex flex-col gap-4 mt-6">
      <h3 className="text-2xl font-bold">
        Todays menu - ${getTotalPriceFromIngredients().toFixed(2)}
      </h3>
      {meals?.map(({ id, recipe: meal, mealType }) => (
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
