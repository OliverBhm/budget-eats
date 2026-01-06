import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimateFadeInProps {
  side?: "left" | "right" | "top" | "bottom";
  duration?: number;
  className?: string;
  children: React.ReactNode;
}

const offsetMap = {
  left: { x: -75 },
  right: { x: 75 },
  top: { y: -75 },
  bottom: { y: 75 },
};

function AnimateFadeIn({
  side = "top",
  duration = 0.25,
  className,
  children,
}: AnimateFadeInProps) {
  const offset = offsetMap[side];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { AnimateFadeIn };
