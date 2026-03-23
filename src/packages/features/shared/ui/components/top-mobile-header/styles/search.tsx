import { cn } from "@/lib/utils";

const TRANSITION = "transition-all duration-300 ease-in-out";

const HIDDEN = "opacity-0 invisible";
const VISIBLE_ON_SEARCH =
  "group-focus-within/search:opacity-100 group-focus-within/search:visible";

const POINTER_EVENTS_ON_SEARCH =
  "group-focus-within/search:pointer-events-auto";

const COLLAPSE_ON_SEARCH =
  "group-focus-within/search:max-w-0 group-focus-within/search:scale-95 group-focus-within/search:opacity-0";

const BUTTON_STYLES = cn(
  TRANSITION,
  "max-w-11 rounded-full bg-surface-container-lowest text-foreground shadow-[0_18px_36px_-28px_rgba(28,28,24,0.18)] hover:bg-surface-container-low",
  COLLAPSE_ON_SEARCH
);

const POPOVER_STYLES = cn(
  TRANSITION,
  HIDDEN,
  VISIBLE_ON_SEARCH,
  "agrarian-panel absolute top-14 left-0 z-50 w-full rounded-[1.5rem] bg-popover px-4 py-4 shadow-[0_32px_64px_-36px_rgba(28,28,24,0.16)]"
);

const BACKDROP_STYLES = cn(
  TRANSITION,
  HIDDEN,
  VISIBLE_ON_SEARCH,
  "fixed inset-0 z-30 bg-[rgba(252,249,242,0.45)] backdrop-blur-md pointer-events-none",
  POINTER_EVENTS_ON_SEARCH
);

export { BUTTON_STYLES, POPOVER_STYLES, BACKDROP_STYLES };
