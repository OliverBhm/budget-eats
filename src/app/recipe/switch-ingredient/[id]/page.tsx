import { Button } from "@/components/ui/button";
import { ItemGroup } from "@/components/ui/item";
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from "@/components/ui/page-header";
import { IngredientItems } from "@/packages/features/ingredients/ui/components/ingredient-items";
import { mockFriedRiceRecipeResponse } from "@/packages/features/recipe/api/mocks/recipe";
import { ArrowLeft } from "lucide-react";

export default function SwitchIngredient() {
    const ingredients = mockFriedRiceRecipeResponse.data?.ingredients
    return (
      <section className="space-y-4">
        <PageHeader>
          <PageHeaderTitle>Switch Ingredient</PageHeaderTitle>
          <PageHeaderDescription>
            Find a cheaper or more fitting ingredient that suits your needs
            better.
          </PageHeaderDescription>
        </PageHeader>
        <ItemGroup variant={"muted"}>
          <IngredientItems {...{ ingredients }} />
        </ItemGroup>
        
          <Button className="w-full" size={'lg'} variant={"secondary"}>
            <ArrowLeft />
            Keep Ingredient
          </Button>

      </section>
    );
}