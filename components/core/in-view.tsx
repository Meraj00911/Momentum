
"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Variant,
  type Transition,
  type UseInViewOptions,
} from "motion/react";

export type InViewProps = {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  as?: keyof typeof motion;
  once?: boolean;
  className?: string;
};

const defaultVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: "easeOut" },
  viewOptions,
  as = "div",
  once = false,
  className,
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);
  const [isViewed, setIsViewed] = useState(false);

  const MotionComponent = motion[as] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView || (once && isViewed) ? "visible" : "hidden"}
      onAnimationComplete={(definition) => {
        if (once && definition === "visible") {
          setIsViewed(true);
        }
      }}
      variants={variants}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}
