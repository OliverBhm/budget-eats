import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { PageHeader, PageHeaderDescription, PageHeaderTitle } from '@/components/ui/page-header';
import {
  Popover,
  PopoverTrigger
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklyMeals from '@/packages/features/cooking/ui/components/meal-planner/weekly-meals';
import { Calendar, List, ListCheck, ListChecks, Search, Settings2, ShoppingBasket, SortDesc } from 'lucide-react';
import WeekSelector from '../../packages/features/cooking/ui/components/meal-planner/week-selector';

export default function Cooking() {
    const shoppingListItems = []

    return (
      <>
        <PageHeader id="welcome">
          <PageHeaderTitle>Hello there!</PageHeaderTitle>
          <PageHeaderDescription>
            Why dont we finish planning your week? Lets finish that meal plan
            and your shopping list.
          </PageHeaderDescription>
        </PageHeader>
        <Tabs>
          <TabsList defaultValue="planner">
            <TabsTrigger value="planner">
              <Calendar />
              Meal planner
            </TabsTrigger>
            <TabsTrigger value="shopping">
              <List />
              Shopping list
            </TabsTrigger>
            <TabsTrigger value="pantry">
              <ListChecks />
              Pantry
            </TabsTrigger>
          </TabsList>
          <TabsContent value="planner">
            <WeekSelector />
            <WeeklyMeals />
          </TabsContent>
          <TabsContent value="shopping">
            {shoppingListItems.length < 0 && (
              <menu className="relative flex items-center">
                <Popover>
                  <PopoverTrigger className="absolute right-3" asChild>
                    <Button variant={"ghost"} className="absolute right-0">
                      <Settings2 />
                    </Button>
                  </PopoverTrigger>
                  <Input placeholder="Search items"></Input>
                </Popover>
                <Button variant={"ghost"} className="absolute right-8">
                  <SortDesc />
                </Button>
              </menu>
            )}
            {!shoppingListItems.length && (
              <Empty>
                <EmptyHeader>
                  <EmptyTitle>Wow nothing to see here?</EmptyTitle>
                  <EmptyDescription>Lets add something</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <EmptyMedia>
                    <ShoppingBasket className="w-15 h-15 text-muted-foreground" />
                  </EmptyMedia>
                  <Button>
                    Let's find something! <Search />
                  </Button>
                </EmptyContent>
              </Empty>
            )}
          </TabsContent>
          <TabsContent value='pantry'></TabsContent>
        </Tabs>
      </>
    );
}