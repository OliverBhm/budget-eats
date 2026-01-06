import { Avatar } from "@radix-ui/react-avatar";
import {
  BarChart,
  Clock,
  CookingPot,
  DollarSign,
  HomeIcon,
  Settings,
  Settings2,
  User,
  UserPlus,
} from "lucide-react";

type NavItem = {
  name: string;
  href: string;
  icon: any;
  children?: NavItem[];
};

const MAIN_NAV_ITEMS: NavItem[] = [
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

const ADDITIONAL_NAV_ITEMS: NavItem[] = [
  {
    name: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    name: "Timers",
    icon: Clock,
    href: "/timers",
  },
];

export { MAIN_NAV_ITEMS, ADDITIONAL_NAV_ITEMS };
