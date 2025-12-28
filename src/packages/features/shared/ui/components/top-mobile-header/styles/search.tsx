import { cn } from "@/lib/utils";

const TRANSITION = "transition-all duration-300 ease-in-out";

const HIDDEN = "opacity-0 invisible";
const VISIBLE_ON_SEARCH =
  "group-focus-within/search:opacity-100 group-focus-within/search:visible";

const POINTER_EVENTS_ON_SEARCH =
  "group-focus-within/search:pointer-events-auto";

const COLLAPSE_ON_SEARCH =
  "group-focus-within/search:max-w-0 group-focus-within/search:opacity-0";

const BUTTON_STYLES = cn(
  TRANSITION,
  "max-w-[50px] opacity-100",
  COLLAPSE_ON_SEARCH
);

const POPOVER_STYLES = cn(
  TRANSITION,
  HIDDEN,
  VISIBLE_ON_SEARCH,
  "bg-secondary p-4 rounded-b-lg shadow-lg w-full absolute left-0 top-9 z-50"
);

const BACKDROP_STYLES = cn(
  TRANSITION,
  HIDDEN,
  VISIBLE_ON_SEARCH,
  "fixed inset-0 z-30 backdrop-blur-xs pointer-events-none",
  POINTER_EVENTS_ON_SEARCH
);

export { BUTTON_STYLES, POPOVER_STYLES, BACKDROP_STYLES };
