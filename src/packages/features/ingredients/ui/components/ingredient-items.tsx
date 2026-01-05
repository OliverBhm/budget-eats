"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Paragraph } from "@/components/ui/paragraph";
import { RecipeIngredient } from "@/packages/features/recipe/api/model/recipe";
import {
  ArrowLeftRight,
  Info,
  List,
  ListCheck,
  ListChecks,
  MoreHorizontal,
} from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

interface IngredientItemsProps {
  ingredients?: RecipeIngredient[];
  servings?: number;
  switchButtonFn?: string;
}

const ingredientMoreActions = [
  {
    title: "Switch ingredient",
    icon: <ArrowLeftRight />,
    action: (id: string) => {},
  },
  {
    title: "Show details",
    icon: <Info />,
    action: (id: string, router: AppRouterInstance) =>
      router.push("/ingredients/" + id),
  },
  {
    title: "Add to shopping list",
    icon: <ListCheck />,
    action: (id: string) => {},
  },
  {
    title: "Add to pantry",
    icon: <ListChecks />,
    action: (id: string) => {},
  },
];

function IngredientItems({ ingredients, servings }: IngredientItemsProps) {
  servings ||= 1;
  const router = useRouter();

  return (
    <>
      {ingredients?.map(
        ({ id, image_url, name, price_per_unit, base_amount, unit }, i) => (
          <div key={id}>
            <Item variant={i % 2 ? "default" : "muted"}>
              <ItemMedia className="relative">
                <Paragraph
                  size="md"
                  variant="muted"
                  className="absolute rounded-b-md 0 w-full text-center bottom-0 left-0 right-0"
                >
                  ${(price_per_unit * base_amount * servings).toFixed(2)}
                </Paragraph>
                <Image
                  src={image_url}
                  alt={name}
                  width={70}
                  height={70}
                  className="rounded-md"
                />
              </ItemMedia>
              <ItemContent className="flex-col">
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>
                  {(base_amount * servings).toFixed(1).replace(/\.0$/, "")}{" "}
                  {unit}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Drawer>
                  <DrawerTrigger>
                    <MoreHorizontal />
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Ingredient actions</DrawerTitle>
                      <DrawerDescription>
                        What would you like to do with this ingredient?
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      {ingredientMoreActions.map(({ title, icon, action }) => (
                        <Button
                          key={title}
                          variant="secondary"
                          onClick={() => action(id, router)}
                        >
                          <span>{title}</span>
                          {icon}
                        </Button>
                      ))}
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </ItemActions>
            </Item>
            {i < ingredients.length - 1 && <ItemSeparator />}
          </div>
        )
      )}
    </>
  );
}

export { IngredientItems };
