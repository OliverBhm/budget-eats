"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HighlightedText } from "@/components/ui/highlighted-text";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IngredientItems } from "@/packages/features/ui/ingredient/components/ingredient-items";
import { mockFriedRiceRecipeResponse } from "@/packages/features/recipe/api/mocks/recipe";
import {
  RecipeIngredient,
  RecipeStep,
  RecipeTag,
} from "@/packages/features/recipe/api/model/recipe";
import {
  ArrowLeftRight,
  ChevronDown,
  Heart,
  Minus,
  Plus,
  Regex,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const { data: recipe } = mockFriedRiceRecipeResponse;

// replace with feature flag later
const hasNutritionTab = false;

function RecipeImageOverlay({ tags }: { tags: RecipeTag[] }) {
  return (
    <div className="relative w-full">
      <div className="absolute flex">
        <RecipeBadges tags={tags} />
      </div>
      <RecipeActions />
    </div>
  );
}

function RecipeActions() {
  return (
    <menu
      className="absolute rounded-tr-md right-0 z-50 flex space-x-2 bg-secondary/80 p-2"
      role="group"
      aria-label="Card actions"
    >
      <Button variant={"ghost"} aria-label="Share">
        <Share2 />
      </Button>
      <Button
        onClick={() => toast(`Added ${recipe?.title || ""} to favorites`)}
        variant={"ghost"}
        aria-label="Add to favorites"
      >
        <Heart />
      </Button>
    </menu>
  );
}

function RecipeBadges({ tags }: { tags: RecipeTag[] }) {
  return (
    <ul className="flex flex-wrap gap-2 p-2" aria-label="Food badges">
      {tags?.map(({ id, variant, label }) => (
        <li key={id}>
          <Badge variant={variant}>{label}</Badge>
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
      <li className="grid gap-4 grid-cols-5">
        <CollapsibleTrigger asChild>
          <Button className="col-span-1" size={"sm"} variant={"secondary"}>
            {i + 1}
            <ChevronDown />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="col-span-4">
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
    <div className="flex items-center justify-center gap-4 mt-2">
      <Button onClick={() => setServings(Math.max(1, servings - 1))}>
        <Minus />
      </Button>
      <Input
        onChange={({ target: { value } }) => setServings(Number(value))}
        value={servings}
        type="number"
        className="w-50"
      />
      <Button onClick={() => setServings(servings + 1)}>
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

  const { title, tags, image_url, ingredients } = recipe;

  return (
    <section className="space-y-4" id="recipe">
      <h2 className="text-2xl font-bold text-center">{title}</h2>

      <RecipeImageOverlay tags={tags} />

      <Image
        src={image_url}
        alt={title}
        width={896}
        height={300}
        className="rounded-md"
      />

      <Tabs defaultValue="instructions">
        <TabsList className="flex w-full">
          <TabsTrigger value="instructions">Instructions</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          {hasNutritionTab && (
            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="instructions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How to prepare:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
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
          <Card>
            <CardHeader>
              <CardTitle>What you will need:</CardTitle>
            </CardHeader>
            <CardContent>
              <ItemGroup>
                <IngredientItems {...{ ingredients, servings }} />
              </ItemGroup>
            </CardContent>
          </Card>
        </TabsContent>
        {hasNutritionTab && <TabsContent value="nutrition"></TabsContent>}
      </Tabs>
    </section>
  );
}
