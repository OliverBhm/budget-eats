import { cn } from "@/lib/utils";

const SHARED_TRANSITION = "transition-all duration-300 ease-in-out";

const BUTTON_STYLES = cn(
  SHARED_TRANSITION,
  "max-w-[50px] opacity-100",
  "group-focus-within/search:max-w-0 group-focus-within/search:opacity-0"
);

const POPOVER_STYLES = cn(
  "bg-secondary p-4 rounded-b-lg shadow-lg w-full absolute left-0 z-50 top-9",
  SHARED_TRANSITION,
  "invisible opacity-0",
  "group-focus-within/search:visible group-focus-within/search:opacity-100"
);

const BACKDROP_STYLES = cn(
  "fixed inset-0 z-40 backdrop-blur-xs",
  SHARED_TRANSITION,
  "opacity-0 invisible pointer-events-none",
  "group-focus-within/search:opacity-100 group-focus-within/search:visible group-focus-within/search:pointer-events-auto"
);

export { BUTTON_STYLES, POPOVER_STYLES, BACKDROP_STYLES };
