"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { RecipeIngredient } from "@/packages/features/recipe/api/model/recipe";
import {
  ArrowLeftRight,
  Info,
  List,
  ListCheck,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IngredientItemsProps {
  ingredients?: RecipeIngredient[];
  servings?: number;
  switchButtonFn?: string;
}

const ingredientMoreActions = [
  {
    title: "Show details",
    icon: <Info />,
    action: () => {},
  },
  {
    title: "Add to shopping list",
    icon: <ListCheck />,
    action: () => {},
  },
  {
    title: "Add to pantry",
    icon: <List />,
    action: () => {},
  },
];

function IngredientItems({ ingredients, servings }: IngredientItemsProps) {
  servings ||= 1;

  return (
    <>
      {ingredients?.map(
        ({ id, image_url, name, price_per_unit, base_amount, unit }, i) => (
          <div key={id}>
            <Item variant={i % 2 ? "default" : "muted"}>
              <ItemMedia className="relative">
                <p className="absolute text-md bg-background/80 rounded-b-md 0 w-full text-center bottom-0 left-0 right-0">
                  ${(price_per_unit * base_amount * servings).toFixed(2)}
                </p>
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
                <Link href={`/recipe/switch-ingredient/${id}`}>
                  <Button variant={"secondary"} size={"sm"}>
                    <ArrowLeftRight />
                  </Button>
                </Link>

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
                          onClick={action}
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
