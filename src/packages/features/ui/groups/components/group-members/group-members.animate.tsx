import type { MotionProps, Transition, Variants } from "framer-motion";

/* -------------------------------------------------
 * Transitions
 * ------------------------------------------------- */

export const LIST_TRANSITION: Transition = {
  duration: 0.1,
  ease: "easeOut",
};

export const ITEM_TRANSITION: Transition = {
  duration: 0.15,
  ease: "easeOut",
};

/* -------------------------------------------------
 * Variants
 * ------------------------------------------------- */

export const LIST_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, height: 0, transition: { ease: "easeOut" } },
};

export const ITEM_VARIANTS: Variants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
};
