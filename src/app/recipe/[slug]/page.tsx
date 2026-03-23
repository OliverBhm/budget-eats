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
import { HighlightedText } from "@/components/ui/highlighted-text";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientItems } from "@/packages/features/ui/ingredient/components/ingredient-items";
import { mockFriedRiceRecipeResponse } from "@/packages/features/api/recipe/mocks/recipe";
import {
  RecipeIngredient,
  RecipeStep,
  RecipeTag,
} from "@/packages/features/api/recipe/model/recipe";
import {
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const { data: recipe } = mockFriedRiceRecipeResponse;

// replace with feature flag later
const hasNutritionTab = false;

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function getRecipeCost(
  ingredients: { base_amount: number; price_per_unit: number }[]
) {
  return ingredients.reduce(
    (sum, ingredient) => sum + ingredient.base_amount * ingredient.price_per_unit,
    0
  );
}

function RecipeImageOverlay({ tags }: { tags: RecipeTag[] }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4">
      <div className="pointer-events-auto flex max-w-[70%] flex-wrap gap-2">
        <RecipeBadges tags={tags} />
      </div>
      <RecipeActions />
    </div>
  );
}

function RecipeActions() {
  return (
    <menu
      className="pointer-events-auto flex space-x-2 rounded-full bg-[rgba(252,249,242,0.78)] p-2 shadow-[0_24px_48px_-28px_rgba(28,28,24,0.16)] backdrop-blur-xl"
      role="group"
      aria-label="Card actions"
    >
      <Button variant={"ghost"} size="icon-sm" aria-label="Share">
        <Share2 />
      </Button>
      <Button
        onClick={() => toast(`Added ${recipe?.title || ""} to favorites`)}
        variant={"ghost"}
        size="icon-sm"
        aria-label="Add to favorites"
      >
        <Heart />
      </Button>
    </menu>
  );
}

function RecipeBadges({ tags }: { tags: RecipeTag[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Food badges">
      {tags?.map(({ id, variant, label }) => (
        <li key={id}>
          <Badge variant={variant} className="px-4 py-2 normal-case tracking-[0.05em]">
            {label}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface RecipeStepItemProps extends RecipeStep {
  i: number;
}

function RecipeStepDescription({
  id,
  text,
  highlights,
  i,
}: RecipeStepItemProps) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} key={id}>
      <li className="grid grid-cols-[auto_1fr] gap-4 rounded-[1.5rem] bg-surface-container-low px-4 py-4">
        <CollapsibleTrigger asChild>
          <Button className="self-start" size={"sm"} variant={"secondary"}>
            {String(i + 1).padStart(2, "0")}
            <ChevronDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-1 text-sm leading-relaxed text-foreground data-[state=closed]:hidden">
          <HighlightedText text={text} highlights={highlights} />
        </CollapsibleContent>
      </li>
    </Collapsible>
  );
}

function SetServings({
  setServings,
  servings,
}: {
  servings: number;
  setServings: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[1.5rem] bg-surface-container-low px-4 py-4">
      <p className="type-label-sm text-muted-foreground">Servings</p>
      <Button onClick={() => setServings(Math.max(1, servings - 1))} size="icon-sm">
        <Minus />
      </Button>
      <Input
        onChange={({ target: { value } }) => setServings(Number(value))}
        value={servings}
        type="number"
        className="w-20 rounded-full text-center font-display text-xl"
      />
      <Button onClick={() => setServings(servings + 1)} size="icon-sm">
        <Plus />
      </Button>
    </div>
  );
}

function replacePlaceholders(
  step: string,
  ingredients: RecipeIngredient[],
  highlights: string[],
  servings: number
): { text: string; highlights: string[] } {
  let ingredientHilights: string[] = [];
  ingredients.forEach(
    ({ id, base_amount, unit, displayName: { singular, plural } }) => {
      const amount = (base_amount * servings).toString();
      const name = servings < 2 ? singular : plural;
      ingredientHilights = [
        ...ingredientHilights,
        name,
        `${amount}${unit}`,
        amount,
      ];

      step = step
        .replaceAll(`{${id}\}`, name)
        .replaceAll(`{${id}_amount}`, amount)
        .replaceAll(`{${id}_unit}`, unit);
    }
  );

  return { text: step, highlights: [...ingredientHilights] };
}

export default function Recipe() {
  const [servings, setServings] = useState(recipe?.default_servings || 4);

  if (!recipe) {
    return null;
  }

  const { title, tags, image_url, ingredients, description, difficulty, time, nutrition } = recipe;
  const estimatedCost = getRecipeCost(ingredients) * servings;
  const takeoutComparison = estimatedCost + 4.75;
  const savings = takeoutComparison - estimatedCost;

  return (
    <section className="space-y-8 md:space-y-10" id="recipe">
      <div className="grid gap-6 md:grid-cols-12 md:items-start md:gap-8">
        <div className="space-y-6 rounded-[2rem] bg-surface-container-low px-6 py-8 md:col-span-5 md:mt-8 md:px-8">
          <div>
            <p className="type-label-md text-muted-foreground">Recipe dossier</p>
            <h1 className="type-display-sm mt-4 text-foreground">{title}</h1>
            <p className="type-body-md mt-5 max-w-[34ch] text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-[1.5rem] bg-surface-container-lowest px-4 py-4">
              <p className="type-label-sm text-muted-foreground">Est. cost</p>
              <p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-tertiary">
                {currencyFormatter.format(estimatedCost)}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-surface-container-lowest px-4 py-4 sm:translate-y-5 md:translate-y-0 xl:translate-y-5">
              <p className="type-label-sm text-muted-foreground">Time</p>
              <p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-foreground">
                {time.total_minutes}m
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-primary px-4 py-4 text-primary-foreground sm:-translate-y-3 md:translate-y-0 xl:-translate-y-3">
              <p className="type-label-sm text-primary-foreground/70">Saved</p>
              <p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em]">
                {currencyFormatter.format(savings)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] bg-surface-container px-4 py-4">
              <p className="type-label-sm text-muted-foreground">Calories</p>
              <p className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-foreground">
                {nutrition.calories}
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-surface-container px-4 py-4">
              <p className="type-label-sm text-muted-foreground">Difficulty</p>
              <p className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-foreground capitalize">
                {difficulty}
              </p>
            </div>
            <div className="rounded-[1.25rem] bg-surface-container px-4 py-4">
              <p className="type-label-sm text-muted-foreground">Protein</p>
              <p className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-foreground">
                {nutrition.protein.amount}
                {nutrition.protein.unit}
              </p>
            </div>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-surface-container px-4 py-4 md:col-span-7">
          <RecipeImageOverlay tags={tags} />

          <div className="absolute bottom-8 left-8 z-20 rounded-[1.5rem] bg-secondary-container px-5 py-4 shadow-[0_24px_48px_-30px_rgba(102,49,0,0.3)]">
            <p className="type-label-sm text-[color:var(--on-secondary-container)]">Compared to takeout</p>
            <p className="mt-2 font-display text-4xl leading-none tracking-[-0.06em] text-[color:var(--on-secondary-container)]">
              {currencyFormatter.format(takeoutComparison)}
            </p>
          </div>

          <Image
            src={image_url}
            alt={title}
            width={896}
            height={1120}
            className="aspect-[4/5] rounded-[1.75rem] object-cover md:aspect-[5/4]"
          />
        </div>
      </div>

      <Tabs defaultValue="instructions" className="gap-5">
        <TabsList className="w-full justify-start md:w-fit">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          {hasNutritionTab && (
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="instructions" className="space-y-4">
          <Card className="bg-surface-container py-0">
            <CardHeader>
              <CardTitle>How to prepare</CardTitle>
              <CardDescription>
                A paced walkthrough designed for fast weekday cooking.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {recipe.steps.map(({ text, highlights, id }, i) => (
                  <RecipeStepDescription
                    key={id}
                    {...{
                      ...replacePlaceholders(
                        text,
                        ingredients,
                        highlights,
                        servings
                      ),
                      id,
                      i,
                    }}
                  />
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent className="space-y-4" value="ingredients">
          <SetServings {...{ setServings, servings }} />
          <Card className="bg-surface-container py-0">
            <CardHeader>
              <CardTitle>What you will need</CardTitle>
              <CardDescription>
                Pantry-first ingredients scaled to your current serving count.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IngredientItems {...{ ingredients, servings }} />
            </CardContent>
          </Card>
        </TabsContent>
        {hasNutritionTab && <TabsContent value="nutrition"></TabsContent>}
      </Tabs>
    </section>
  );
}
