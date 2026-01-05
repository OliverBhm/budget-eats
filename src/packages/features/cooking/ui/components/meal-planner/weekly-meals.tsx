"use client";

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
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ItemGroup } from "@/components/ui/item";
import { Paragraph } from "@/components/ui/paragraph";
import { capitalize } from "@/packages/features/formatting/util/text";
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
  ChevronDown,
  ChevronRight,
  Clock,
  List,
  MoreHorizontal,
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

interface RecipePreviewCardActionsProps {
  id?: string;
}

const recipePreviewCardMoreActions = [
  {
    title: "View recipe",
    icon: <ChevronRight />,
    action: (id: string) => {},
  },
  {
    title: "Switch meal",
    icon: <ArrowLeftRight />,
    action: (id: string) => {},
  },
  {
    title: "Add to shopping list",
    icon: <List />,
    action: (id: string) => {},
  },
];

export function RecipePreviewCardActions({
  id,
}: RecipePreviewCardActionsProps) {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Recipe actions</DrawerTitle>
      </DrawerHeader>
      <DrawerFooter>
        {recipePreviewCardMoreActions.map(({ title, icon, action }) => (
          <Button key={title} variant="secondary" onClick={() => action(id!)}>
            <span className="ml-2">{title}</span>
            {icon}
          </Button>
        ))}
      </DrawerFooter>
    </DrawerContent>
  );
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
        <Link href={`/recipe/${id}`}>
          <CardHeader className="flex gap-1 items-baseline space-y-2">
            <span className="space-y-1">
              <Paragraph variant="muted" size="xs">
                {capitalize(mealType)}
              </Paragraph>
              <CardTitle className="flex">{title}</CardTitle>
              <CardDescription className="space-y-2">
                <p>{description}</p>
                <ul className="flex gap-2 items-center">
                  {time && (
                    <li className="flex gap-1 items-center">
                      <Clock className="w-3 h-3" />
                      <Paragraph>{time.total_minutes} mins</Paragraph>
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
            </span>
            <Drawer>
              <DrawerTrigger asChild>
                <Button size={"sm"} variant={"secondary"}>
                  <MoreHorizontal />
                  <RecipePreviewCardActions id={id} />
                </Button>
              </DrawerTrigger>
            </Drawer>
          </CardHeader>
        </Link>
        <CardContent>
          {ingredients?.length && (
            <Collapsible>
              {variant === "detailed" && ingredients.length > 0 && (
                <CollapsibleTrigger asChild>
                  <Button size="sm" variant="secondary">
                    Ingredients ({ingredients.length})
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </CollapsibleTrigger>
              )}

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

function getTotalPriceFromIngredients(meals = MEALS) {
  return (
    [
      ...meals
        .map(
          (meal) =>
            meal.recipe?.ingredients?.map(
              ({ price_per_unit }) => price_per_unit
            ) ?? 0
        )
        .flat(),
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
