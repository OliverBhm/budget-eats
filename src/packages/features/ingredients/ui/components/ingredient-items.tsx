import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RecipeIngredient } from "@/packages/features/recipe/api/model/recipe";
import { ArrowLeftRight, ArrowRightCircle, List, ListCheck, ListChecks, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IngredientItemsProps {
  ingredients?: RecipeIngredient[];
  servings?: number;
  switchButtonFn?: string;
}

function IngredientItems({ ingredients, servings }: IngredientItemsProps) {
  servings ||= 1;

  return (
    <>
      {ingredients?.map(
        ({ id, image_url, name, price_per_unit, base_amount, unit }, i) => (
          <div key={id}>
            <Item variant={i % 2 ? "default" : "muted"}>
              <ItemMedia className="relative">
                <p className="absolute text-md bg-background/80 backdrop-blur-sm rounded-b-md 0 w-full text-center bottom-0 left-0 right-0">
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"secondary"} size={"sm"}>
                      <MoreHorizontal />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <menu className="space-y-2 flex flex-col">
                      <Button variant={"secondary"}>
                        Add to shopping list <List />
                      </Button>
                      <Button variant={"secondary"}>Add to pantry <ListChecks /></Button>
                      <Button variant={"secondary"}>Show details <ArrowRightCircle /></Button>
                    </menu>
                  </PopoverContent>
                </Popover>
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
