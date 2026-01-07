import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimateFadeInProps {
  side?: "left" | "right" | "top" | "bottom";
  duration?: number;
  className?: string;
  viewportThreshold?: number;
  children: React.ReactNode;
}

const offsetMap = {
  left: { x: -75 },
  right: { x: 75 },
  top: { y: -75 },
  bottom: { y: 75 },
};

function AnimateFadeIn({
  side = "left",
  duration = 0.25,
  className,
  viewportThreshold = 0.3,
  children,
}: AnimateFadeInProps) {
  const offset = offsetMap[side];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0, ...offset },
        visible: { opacity: 1, x: 0, y: 0 },
      }}
      transition={{ duration, ease: "easeOut" }}
      viewport={{ once: true, amount: viewportThreshold }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export { AnimateFadeIn };
