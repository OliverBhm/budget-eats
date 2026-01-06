import type { MotionProps } from "framer-motion";

/* -------------------------------------------------
 * Transitions
 * ------------------------------------------------- */

export const LIST_TRANSITION = {
  duration: 0.1,
  ease: "easeOut",
};

export const ITEM_TRANSITION = {
  duration: 0.15,
  ease: "easeOut",
};

/* -------------------------------------------------
 * Variants
 * ------------------------------------------------- */

export const LIST_VARIANTS = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, height: 0, transition: { ease: "easeOut" } },
};

export const ITEM_VARIANTS = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -8 },
};
