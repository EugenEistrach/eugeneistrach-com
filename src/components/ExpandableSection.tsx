import { useState, useEffect, useRef, useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import type { BadgeItem } from "./Badge";
import { Badge } from "./Badge";

const pulsateAnimation = {
  scale: [1, 1.03, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const expandedContainerVariants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
  visible: (height: number) => ({
    opacity: 1,
    height,
    transition: {
      height: {
        duration: Math.max(0.3, (height / 100) * 0.2),
        ease: "easeInOut",
      },
      opacity: { duration: 0.2 },
      staggerChildren: 0.05,
    },
  }),
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.3 },
      opacity: { duration: 0.2 },
    },
  },
};

const expandedItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      opacity: { duration: 0.2 },
      y: { duration: 0.2 },
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      opacity: { duration: 0.2 },
      y: { duration: 0.2 },
    },
  },
};

function useMeasure<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  const updateHeight = () => {
    if (ref.current) {
      setHeight(ref.current.offsetHeight);
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect();
  }, []);

  return [ref, { height }, updateHeight] as const;
}

interface ExpandableSectionProps {
  label: string;
  textColor: string;
  items: BadgeItem[];
}

export function ExpandableSection({
  label,
  textColor,
  items,
}: ExpandableSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ref, { height }, updateHeight] = useMeasure<HTMLDivElement>();
  const id = useId();

  // Update height when expanded state changes
  useEffect(() => {
    if (isExpanded) {
      // Use RAF to ensure DOM has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(updateHeight);
      });
    }
  }, [isExpanded, updateHeight]);

  return (
    <>
      <motion.span
        className={`relative inline-block cursor-pointer font-bold ${textColor}`}
        animate={pulsateAnimation}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {label}{" "}
        <ChevronRight
          className="inline h-5 w-5"
          style={{
            transform: `rotate(${isExpanded ? "90deg" : "0deg"})`,
            transition: "transform 0.3s",
          }}
        />
      </motion.span>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            layoutId={id}
            custom={height || 0}
            variants={expandedContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div ref={ref} className="flex flex-wrap gap-2 pt-4">
              {items.map((item) => (
                <motion.div key={item.label} variants={expandedItemVariants}>
                  <Badge
                    label={item.label}
                    color={item.color}
                    Icon={item.Icon}
                    description={item.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
