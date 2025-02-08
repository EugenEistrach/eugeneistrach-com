import { motion } from "motion/react";
import * as Tooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";

export interface BadgeItem {
  label: string;
  color: string;
  Icon?: React.ElementType | string;
  description?: ReactNode;
}

export function Badge({ label, color, Icon, description }: BadgeItem) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const badge = (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      initial={{ scale: 1 }}
      className={`inline-flex items-center gap-2 m-1 px-3 py-1 rounded-full ${
        Icon ? color : `border ${color} bg-white/50 backdrop-blur-sm`
      } ${description ? "cursor-help" : ""}`}
    >
      {Icon &&
        (typeof Icon === "string" ? (
          <img src={Icon} alt="" className="h-4 w-auto" />
        ) : (
          <Icon className="h-4 w-4" />
        ))}
      <span>{label}</span>
    </motion.div>
  );

  if (description) {
    return (
      <Tooltip.Provider delayDuration={0}>
        <Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
          <Tooltip.Trigger
            asChild
            onClick={() => isMobile && setIsOpen(!isOpen)}
          >
            <div>{badge}</div>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="z-50 overflow-hidden rounded-lg bg-white/80 backdrop-blur-lg px-4 py-3 text-sm text-gray-950 shadow-lg max-w-[300px] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={5}
              onPointerDownOutside={() => isMobile && setIsOpen(false)}
            >
              {description}
              <Tooltip.Arrow className="fill-white/80 backdrop-blur-lg" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return badge;
}
