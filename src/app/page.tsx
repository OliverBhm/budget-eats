import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	EditorialEyebrow,
	EditorialIntro,
	EditorialIntroDescription,
	EditorialIntroTitle,
  EditorialSection,
	EditorialStat,
	EditorialStatDescription,
	EditorialStatLabel,
	EditorialStatValue,
} from "@/components/ui/editorial-layout";
import { Headline } from "@/components/ui/headline";
import { Paragraph } from "@/components/ui/paragraph";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
import { RecipeData } from "@/packages/features/api/recipe/model/recipe";
import {
	mockApplePeanutButterSnackResponse,
	mockFriedRiceRecipeResponse,
	mockOvernightOatsRecipeResponse,
} from "@/packages/features/api/recipe/mocks/recipe";
import { Clock3, Leaf, PiggyBank, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const recipes = [
	mockFriedRiceRecipeResponse.data,
	mockOvernightOatsRecipeResponse.data,
	mockApplePeanutButterSnackResponse.data,
].filter((recipe) => recipe !== null);

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

function FeaturedRecipeCard({ recipe }: { recipe: RecipeData }) {
	return (
		<Card variant="surface" spacing="compact" className="relative md:mt-8">
			<div className="absolute -left-3 top-6 z-10">
				<Card variant="spotlight" spacing="flush" className="min-w-0">
					<CardContent className="px-4 py-2">
						<Paragraph size="label-sm" variant="spotlight">
							Editor&apos;s pick
						</Paragraph>
					</CardContent>
				</Card>
			</div>
			<div className="relative overflow-hidden rounded-[1.75rem]">
				<Image
					src={recipe.image_url}
					alt={recipe.title}
					width={900}
					height={1100}
					className="aspect-[4/5] w-full object-cover"
				/>
			</div>
			<CardContent className="space-y-4 px-5 py-1">
				<div className="flex items-center justify-between gap-4">
					<div>
						<Paragraph size="label-sm" variant="muted">
							Featured tonight
						</Paragraph>
						<Headline as="h2" level="h4" className="type-headline-md mt-2 text-foreground">
							{recipe.title}
						</Headline>
					</div>
					<EditorialStat className="min-w-[10rem]">
						<EditorialStatLabel>Est. cost</EditorialStatLabel>
						<EditorialStatValue className="text-tertiary text-3xl">
							{currencyFormatter.format(getRecipeCost(recipe.ingredients))}
						</EditorialStatValue>
					</EditorialStat>
				</div>
				<Paragraph size="lg" variant="muted">{recipe.description}</Paragraph>
			</CardContent>
		</Card>
	);
}

function RecipeMarketCard({
	recipe,
	index,
}: {
	recipe: RecipeData;
	index: number;
}) {
	const recipeCost = getRecipeCost(recipe.ingredients);

	return (
		<Link
			key={recipe.id}
			href={`/recipe/${recipe.id}`}
			className={`group block ${index === 1 ? "md:translate-y-8" : ""} ${
				index === 2 ? "md:-translate-y-4" : ""
			}`}
		>
			<Card variant="nested" spacing="flush" className="overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
				<div className="relative">
					<Image
						src={recipe.image_url}
						alt={recipe.title}
						width={720}
						height={480}
						className="aspect-[4/3] w-full object-cover"
					/>
					<div className="absolute left-4 top-4">
						<Badge variant="secondary" className="px-4 py-2 normal-case tracking-[0.04em]">
							Save {currencyFormatter.format(5.5 - Math.min(recipeCost, 4.25))}
						</Badge>
					</div>
				</div>
				<CardContent className="space-y-4 px-5 py-5">
					<div className="flex items-start justify-between gap-4">
						<div>
								<Paragraph size="label-sm" variant="muted">
									Recipe
								</Paragraph>
							<Headline as="h3" level="h4" className="mt-2 text-foreground">
								{recipe.title}
							</Headline>
						</div>
						<div className="text-right">
								<Paragraph size="label-sm" variant="muted">
									Cost
								</Paragraph>
								<Paragraph as="div" className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-tertiary">
								{currencyFormatter.format(recipeCost)}
								</Paragraph>
						</div>
					</div>
						<Paragraph size="sm" variant="muted">
						{recipe.description}
						</Paragraph>
					<div className="flex items-center justify-between text-sm text-muted-foreground">
							<Paragraph as="span" size="sm" variant="muted" className="inline-flex items-center gap-2">
							<Clock3 className="size-4" /> {recipe.time.total_minutes} min
							</Paragraph>
							<Paragraph as="span" size="label-sm">{recipe.difficulty}</Paragraph>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

export default function Discover() {
	const activeGroup = GROUPS_MOCK[0];
	const featuredRecipe = recipes[0];

	if (!activeGroup || !featuredRecipe) {
		return null;
	}

	const weeklySavings = 45;
	const averageCookTime = Math.round(
		recipes.reduce((sum, recipe) => sum + recipe.time.total_minutes, 0) /
			recipes.length
	);

	return (
		<div className="space-y-8 pb-6 md:space-y-12">
			<section className="grid gap-6 md:grid-cols-12 md:gap-8">
				<EditorialSection variant="low" spacing="roomy" className="md:col-span-7">
					<EditorialIntro>
						<EditorialEyebrow>{`Curated for ${activeGroup.name}`}</EditorialEyebrow>
						<EditorialIntroTitle as="h2" scale="headline" className="max-w-[10ch]">
							Cook smarter. Spend softer.
						</EditorialIntroTitle>
						<EditorialIntroDescription className="mt-6">
							A weekly market edit of recipes, pantry wins, and low-cost meals that feel deliberate instead of improvised.
						</EditorialIntroDescription>
					</EditorialIntro>

					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild size="lg">
							<Link href={`/recipe/${featuredRecipe.id}`}>Open featured recipe</Link>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/cooking">Review meal plan</Link>
						</Button>
					</div>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						<EditorialStat>
							<EditorialStatLabel>This Week</EditorialStatLabel>
							<EditorialStatValue className="text-primary">
								{currencyFormatter.format(weeklySavings)}
							</EditorialStatValue>
							<EditorialStatDescription>
								Estimated savings versus takeout.
							</EditorialStatDescription>
						</EditorialStat>
						<EditorialStat offset="down">
							<EditorialStatLabel>Average Cook</EditorialStatLabel>
							<EditorialStatValue>{`${averageCookTime}m`}</EditorialStatValue>
							<EditorialStatDescription>
								Quick enough for weekday energy.
							</EditorialStatDescription>
						</EditorialStat>
						<EditorialStat tone="accent" offset="up">
							<EditorialStatLabel tone="accent">Shared Pantry</EditorialStatLabel>
							<EditorialStatValue tone="accent">
								{activeGroup.members.length}
							</EditorialStatValue>
							<EditorialStatDescription tone="accent">
								People shaping the grocery basket.
							</EditorialStatDescription>
						</EditorialStat>
					</div>
				</EditorialSection>

				<div className="md:col-span-5">
					<FeaturedRecipeCard recipe={featuredRecipe} />
				</div>
			</section>

			<EditorialSection
				variant="low"
				className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]"
			>
				<div>
					<EditorialIntro>
						<EditorialEyebrow>Information anchors</EditorialEyebrow>
						<EditorialIntroTitle className="max-w-[12ch]">
							Sustainability that reads like a benefit, not a lecture.
						</EditorialIntroTitle>
					</EditorialIntro>
				</div>
				<div className="flex flex-wrap items-start gap-3 md:justify-end">
					<Badge className="px-4 py-2" variant="default">
						<Leaf className="size-3.5" /> Low waste pantry
					</Badge>
					<Badge className="px-4 py-2" variant="default">
						<PiggyBank className="size-3.5" /> Cost-first planning
					</Badge>
					<Badge className="px-4 py-2" variant="default">
						<Sparkles className="size-3.5" /> Editorial curation
					</Badge>
				</div>
			</EditorialSection>

			<section className="space-y-5">
				<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<EditorialIntro>
						<EditorialEyebrow>Weekly market edit</EditorialEyebrow>
						<EditorialIntroTitle>Recipes worth repeating</EditorialIntroTitle>
					</EditorialIntro>
					<Paragraph size="sm" variant="muted" className="max-w-xl md:text-right">
						Staggered cards, soft layers, and pricing that surfaces the real win.
					</Paragraph>
				</div>

				<div className="grid gap-5 md:grid-cols-3">
					{recipes.map((recipe, index) => (
						<RecipeMarketCard key={recipe.id} recipe={recipe} index={index} />
					))}
				</div>
			</section>
		</div>
	);
}
