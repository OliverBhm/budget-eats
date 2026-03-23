import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GROUPS_MOCK } from "@/packages/features/api/groups/mocks/group.mock";
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
				<div className="rounded-[2rem] bg-surface-container-low px-6 py-8 md:col-span-7 md:px-8 md:py-10">
					<p className="type-label-md text-muted-foreground">Curated for {activeGroup.name}</p>
					<h1 className="type-display-lg mt-4 max-w-[10ch] text-foreground">
						Cook smarter. Spend softer.
					</h1>
					<p className="type-body-md mt-6 max-w-2xl text-muted-foreground">
						A weekly market edit of recipes, pantry wins, and low-cost meals that
						feel deliberate instead of improvised.
					</p>

					<div className="mt-8 flex flex-wrap gap-3">
						<Button asChild size="lg">
							<Link href={`/recipe/${featuredRecipe.id}`}>Open featured recipe</Link>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/cooking">Review meal plan</Link>
						</Button>
					</div>

					<div className="mt-10 grid gap-4 sm:grid-cols-3">
						<Card className="bg-surface-container-lowest py-0">
							<CardContent className="px-5 py-5">
								<p className="type-label-sm text-muted-foreground">This Week</p>
								<p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-primary">
									{currencyFormatter.format(weeklySavings)}
								</p>
								<p className="mt-2 text-sm text-muted-foreground">Estimated savings versus takeout.</p>
							</CardContent>
						</Card>
						<Card className="bg-surface-container-lowest py-0 sm:translate-y-6">
							<CardContent className="px-5 py-5">
								<p className="type-label-sm text-muted-foreground">Average Cook</p>
								<p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em] text-foreground">
									{averageCookTime}m
								</p>
								<p className="mt-2 text-sm text-muted-foreground">Quick enough for weekday energy.</p>
							</CardContent>
						</Card>
						<Card className="bg-primary py-0 text-primary-foreground sm:-translate-y-5">
							<CardContent className="px-5 py-5">
								<p className="type-label-sm text-primary-foreground/70">Shared Pantry</p>
								<p className="mt-3 font-display text-4xl leading-none tracking-[-0.06em]">
									{activeGroup.members.length}
								</p>
								<p className="mt-2 text-sm text-primary-foreground/80">People shaping the grocery basket.</p>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="relative rounded-[2rem] bg-surface-container px-5 py-5 md:col-span-5 md:mt-8 md:px-6 md:py-6">
					<div className="absolute -left-3 top-6 rounded-[1.5rem] bg-secondary-container px-4 py-2 shadow-[0_20px_40px_-24px_rgba(102,49,0,0.28)]">
						<p className="type-label-sm text-[color:var(--on-secondary-container)]">
							Editor&apos;s pick
						</p>
					</div>
					<div className="relative overflow-hidden rounded-[1.75rem]">
						<Image
							src={featuredRecipe.image_url}
							alt={featuredRecipe.title}
							width={900}
							height={1100}
							className="aspect-[4/5] w-full object-cover"
						/>
					</div>
					<div className="mt-5 flex items-center justify-between gap-4">
						<div>
							<p className="type-label-sm text-muted-foreground">Featured tonight</p>
							<h2 className="type-headline-md mt-2 text-foreground">
								{featuredRecipe.title}
							</h2>
						</div>
						<div className="rounded-[1.25rem] bg-surface-container-lowest px-4 py-3 text-right shadow-[0_20px_40px_-28px_rgba(28,28,24,0.16)]">
							<p className="type-label-sm text-muted-foreground">Est. cost</p>
							<p className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-tertiary">
								{currencyFormatter.format(getRecipeCost(featuredRecipe.ingredients))}
							</p>
						</div>
					</div>
					<p className="mt-4 type-body-md text-muted-foreground">
						{featuredRecipe.description}
					</p>
				</div>
			</section>

			<section className="grid gap-4 rounded-[2rem] bg-surface-container-low px-6 py-6 md:grid-cols-[1.1fr_0.9fr] md:px-8">
				<div>
					<p className="type-label-md text-muted-foreground">Information anchors</p>
					<h2 className="type-display-sm mt-3 max-w-[12ch] text-foreground">
						Sustainability that reads like a benefit, not a lecture.
					</h2>
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
			</section>

			<section className="space-y-5">
				<div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
					<div>
						<p className="type-label-md text-muted-foreground">Weekly market edit</p>
						<h2 className="type-display-sm mt-3 text-foreground">Recipes worth repeating</h2>
					</div>
					<p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-right">
						Staggered cards, soft layers, and pricing that surfaces the real win.
					</p>
				</div>

				<div className="grid gap-5 md:grid-cols-3">
					{recipes.map((recipe, index) => {
						const recipeCost = getRecipeCost(recipe.ingredients);

						return (
							<Link
								key={recipe.id}
								href={`/recipe/${recipe.id}`}
								className={`group block ${index === 1 ? "md:translate-y-8" : ""} ${
									index === 2 ? "md:-translate-y-4" : ""
								}`}
							>
								<article className="overflow-hidden rounded-[2rem] bg-surface-container-low shadow-[0_32px_64px_-36px_rgba(28,28,24,0.12)] transition-transform duration-300 group-hover:-translate-y-1">
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
									<div className="space-y-4 px-5 py-5">
										<div className="flex items-start justify-between gap-4">
											<div>
												<p className="type-label-sm text-muted-foreground">Recipe</p>
												<h3 className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-foreground">
													{recipe.title}
												</h3>
											</div>
											<div className="text-right">
												<p className="type-label-sm text-muted-foreground">Cost</p>
												<p className="mt-2 font-display text-3xl leading-none tracking-[-0.05em] text-tertiary">
													{currencyFormatter.format(recipeCost)}
												</p>
											</div>
										</div>
										<p className="text-sm leading-relaxed text-muted-foreground">
											{recipe.description}
										</p>
										<div className="flex items-center justify-between text-sm text-muted-foreground">
											<span className="inline-flex items-center gap-2">
												<Clock3 className="size-4" /> {recipe.time.total_minutes} min
											</span>
											<span className="type-label-sm">{recipe.difficulty}</span>
										</div>
									</div>
								</article>
							</Link>
						);
					})}
				</div>
			</section>
		</div>
	);
}
