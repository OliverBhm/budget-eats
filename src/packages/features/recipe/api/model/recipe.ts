export type SupabaseResponse<T> = {
    data: T | null;
    error: null | { message: string; details: string; code: string };
};

export interface RecipeStep {
    id: string;
    text: string;
    highlights: string[];
}

export interface RecipeIngredient {
    id: string;
    name: string;
    displayName: {
        singular: string
        plural: string;
    };
    image_url: string;
    base_amount: number;
    unit: string;
    price_per_unit: number;
    is_primary: boolean;
}

export interface RecipeTag {
    id: string;
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
}

export interface RecipeData {
    id: string;
    title: string;
    description: string;
    image_url: string;
    default_servings: number;
    created_at: string;
    steps: RecipeStep[];
    ingredients: RecipeIngredient[];
    tags: RecipeTag[];
}