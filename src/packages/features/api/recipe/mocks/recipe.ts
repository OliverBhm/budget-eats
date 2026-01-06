import { RecipeData, SupabaseResponse } from "../model/recipe";

export const mockFriedRiceRecipeResponse: SupabaseResponse<RecipeData> = {
    error: null,
    data: {
        id: "123e4567-e89b-12d3-a456-426614174000",
        title: "Egg Fried Rice",
        description: "A classic, quick, and delicious meal perfect for leftover rice.",
        image_url: "/essen.jpeg",
        default_servings: 1,
        time: {
            prep_minutes: 10,
            cook_minutes: 10,
            total_minutes: 20,
        },
        nutrition: {
            calories: 360,
            protein: {
                amount: 12,
                unit: "g",
            },
            carbs: {
                amount: 45,
                unit: "g",
            },
            fat: {
                amount: 12,
                unit: "g",
            },
        },
        difficulty: "medium",
        created_at: "2023-10-25T12:00:00Z",
        tags: [
            { id: "t1", label: "Fast & Cheap", variant: "secondary" },
            { id: "t2", label: "Vegetarian", variant: "default" },
            { id: "t3", label: "Low Carb", variant: "destructive" },
        ],
        steps: [
            {
                id: "s1",
                text: "Cook {i2_amount}{i2_unit} {i2} in advance and let it cool completely. Cold, day-old {i2} works best because the grains stay separate.",
                highlights: ["Cook rice"],
            },
            {
                id: "s2",

                text: "Crack {i1_amount} {i1} into a bowl, add a small pinch of salt, and beat until just combined.",
                highlights: ["pinch of salt", "beat"],
            },
            {
                id: "s3",

                text: "Heat a wok or large pan over high heat until very hot, then add {i6} and swirl to coat the surface.",
                highlights: ["wok", "large pan", "high heat", "cooking oil"],
            },
            {
                id: "s4",
                text: "Pour in the beaten {i1} and stir quickly until softly scrambled, then remove them from the pan and set aside.",
                highlights: ["softly scrambled", "remove", "set aside"],
            },
            {
                id: "s5",

                text: "Add a little more oil to the hot pan, then add the cold {i2}. Break up any clumps and spread the {i2} evenly.",
                highlights: ["cold rice", "break up clumps", "evenly", "oil"],
            },
            {
                id: "s6",

                text: "Stir-fry the {i2} for a few minutes, letting it toast slightly. Keep the {i2} moving so it does not burn.",
                highlights: ["stir-fry", "toast", "keep moving"],
            },
            {
                id: "s7",
                text: "Return the scrambled {i1} to the pan and mix them thoroughly with the {i2}.",
                highlights: ["scrambled {i1}", "mix thoroughly"],
            },
            {
                id: "s8",
                text: "Season with salt and a small splash of {i4}, adding just enough to flavor without darkening the {i2} too much.",
                highlights: ["salt", "small splash"],
            },
            {
                id: "s9",
                text: "Continue stir-frying for another minute, tasting and adjusting seasoning if needed.",
                highlights: ["taste", "adjust seasoning"],
            },
            {
                id: "s10",
                text: "Remove from heat and serve immediately while hot.",
                highlights: ["serve immediately", "hot"],
            },
        ],
        ingredients: [
            {
                id: "i1",
                name: "Egg",
                image_url: "/ingredient.png",
                displayName: {
                    singular: 'egg',
                    plural: 'eggs'
                },
                base_amount: 1,
                unit: "pcs",
                price_per_unit: 0.5,
                is_primary: true,
            },
            {
                id: "i2",
                name: "Jasmine Rice",
                displayName: {
                    singular: 'rice',
                    plural: 'rice'
                },
                image_url: "/ingredient.png",
                base_amount: 100,
                unit: "g",
                price_per_unit: 0.02,
                is_primary: true,
            },
            {
                id: "i3",
                name: "Spring Onions",
                displayName: {
                    singular: 'spring onion',
                    plural: 'spring onions'
                },
                image_url: "/ingredient.png",
                base_amount: 1,
                unit: "stalk",
                price_per_unit: 0.3,
                is_primary: false,
            },
            {
                id: "i4",
                name: "Light Soy Sauce",
                displayName: {
                    singular: 'light soy sauce',
                    plural: 'light soy sauce'
                },
                image_url: "/ingredient.png",
                base_amount: 10,
                unit: "ml",
                price_per_unit: 0.1,
                is_primary: false,
            },
            {
                id: "i5",
                name: "Sesame Oil",
                displayName: {
                    singular: 'sesame oil',
                    plural: 'sesame oil'
                },
                image_url: "/ingredient.png",
                base_amount: 5,
                unit: "ml",
                price_per_unit: 0.4,
                is_primary: false,
            },
            {
                id: "i6",
                name: "Peanut Oil",
                displayName: {
                    singular: 'peanut oil',
                    plural: 'peanut oil'
                },
                image_url: "/ingredient.png",
                base_amount: 1,
                unit: "tps",
                price_per_unit: 0.05,
                is_primary: false,
            },
        ],
    },
};

export const mockOvernightOatsRecipeResponse: SupabaseResponse<RecipeData> = {
    error: null,
    data: {
        id: "223e4567-e89b-12d3-a456-426614174001",
        title: "Overnight Oats",
        description: "A simple, healthy breakfast prepared the night before.",
        image_url: "/overnight-oats.jpeg",
        default_servings: 1,
        time: {
            prep_minutes: 5,
            cook_minutes: 0,
            total_minutes: 5,
        },
        nutrition: {
            calories: 420,
            protein: { amount: 18, unit: "g" },
            carbs: { amount: 52, unit: "g" },
            fat: { amount: 14, unit: "g" },
        },
        difficulty: "easy",
        created_at: "2023-10-26T08:00:00Z",
        tags: [
            { id: "t1", label: "Meal Prep", variant: "secondary" },
            { id: "t2", label: "Vegetarian", variant: "default" },
            { id: "t3", label: "Healthy", variant: "secondary" },
        ],
        steps: [
            {
                id: "s1",
                text: "Add {i1_amount}{i1_unit} {i1} to a jar or bowl.",
                highlights: ["rolled oats"],
            },
            {
                id: "s2",
                text: "Pour in {i2_amount}{i2_unit} {i2} and stir until well combined.",
                highlights: ["milk", "stir"],
            },
            {
                id: "s3",
                text: "Mix in {i3_amount}{i3_unit} {i3} for sweetness.",
                highlights: ["honey"],
            },
            {
                id: "s4",
                text: "Cover and refrigerate overnight or for at least 4 hours.",
                highlights: ["refrigerate overnight"],
            },
            {
                id: "s5",
                text: "Before serving, top with sliced {i4}.",
                highlights: ["banana", "serve"],
            },
        ],
        ingredients: [
            {
                id: "i1",
                name: "Rolled Oats",
                displayName: { singular: "rolled oats", plural: "rolled oats" },
                image_url: "/ingredient.png",
                base_amount: 50,
                unit: "g",
                price_per_unit: 0.02,
                is_primary: true,
            },
            {
                id: "i2",
                name: "Milk",
                displayName: { singular: "milk", plural: "milk" },
                image_url: "/ingredient.png",
                base_amount: 150,
                unit: "ml",
                price_per_unit: 0.01,
                is_primary: true,
            },
            {
                id: "i3",
                name: "Honey",
                displayName: { singular: "honey", plural: "honey" },
                image_url: "/ingredient.png",
                base_amount: 1,
                unit: "tbsp",
                price_per_unit: 0.2,
                is_primary: false,
            },
            {
                id: "i4",
                name: "Banana",
                displayName: { singular: "banana", plural: "bananas" },
                image_url: "/ingredient.png",
                base_amount: 0.5,
                unit: "pcs",
                price_per_unit: 0.3,
                is_primary: false,
            },
        ],
    },
};

export const mockApplePeanutButterSnackResponse: SupabaseResponse<RecipeData> = {
    error: null,
    data: {
        id: "323e4567-e89b-12d3-a456-426614174002",
        title: "Apple with Peanut Butter",
        description: "A quick, filling snack with natural sweetness and protein.",
        image_url: "/apple-peanut-butter.jpeg",
        default_servings: 1,
        time: {
            prep_minutes: 3,
            cook_minutes: 0,
            total_minutes: 3,
        },
        nutrition: {
            calories: 250,
            protein: { amount: 7, unit: "g" },
            carbs: { amount: 28, unit: "g" },
            fat: { amount: 14, unit: "g" },
        },
        difficulty: "easy",
        created_at: "2023-10-26T12:00:00Z",
        tags: [
            { id: "t1", label: "Snack", variant: "secondary" },
            { id: "t2", label: "Fast & Cheap", variant: "secondary" },
            { id: "t3", label: "Vegetarian", variant: "default" },
        ],
        steps: [
            {
                id: "s1",
                text: "Wash and slice the {i1} into wedges.",
                highlights: ["slice apple"],
            },
            {
                id: "s2",
                text: "Serve with {i2_amount}{i2_unit} {i2} for dipping.",
                highlights: ["peanut butter", "dip"],
            },
        ],
        ingredients: [
            {
                id: "i1",
                name: "Apple",
                displayName: { singular: "apple", plural: "apples" },
                image_url: "/ingredient.png",
                base_amount: 1,
                unit: "pcs",
                price_per_unit: 0.4,
                is_primary: true,
            },
            {
                id: "i2",
                name: "Peanut Butter",
                displayName: { singular: "peanut butter", plural: "peanut butter" },
                image_url: "/ingredient.png",
                base_amount: 1,
                unit: "tbsp",
                price_per_unit: 0.25,
                is_primary: true,
            },
        ],
    },
};

