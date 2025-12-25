import { Avatar } from "@radix-ui/react-avatar";
import { BarChart, CookingPot, DollarSign, HomeIcon } from "lucide-react";

export type NavItem = {
  name: string;
  href: string;
  icon: any;
};

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    name: "Discover",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Meal Plan",
    icon: CookingPot,
    href: "/cooking",
  },
  {
    name: "Budget",
    icon: DollarSign,
    href: "/budget",
  },
  {
    name: "Health",
    icon: BarChart,
    href: "/nutrition-tracking",
  },
];
