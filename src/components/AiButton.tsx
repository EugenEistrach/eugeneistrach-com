import React from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import * as Tooltip from "@radix-ui/react-tooltip";

const AiButton = React.forwardRef<
  HTMLButtonElement,
  {
    href: string;
    children?: React.ReactNode;
    className?: string;
  }
>(
  (
    { children = "Copy to AI Assistant", className = "", href, ...props },
    ref
  ) => {
    const [hasCopied, setHasCopied] = React.useState(false);
    const [width, setWidth] = React.useState(0);
    const initialTextRef = React.useRef<HTMLSpanElement>(null);

    React.useEffect(() => {
      if (initialTextRef.current) {
        setWidth(initialTextRef.current.offsetWidth);
      }
    }, [children]);

    const copyToClipboard = async () => {
      if (hasCopied) return;

      try {
        await navigator.clipboard.writeText(href);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    };

    const button = (
      <button
        ref={ref}
        onClick={copyToClipboard}
        className={`group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-white p-1.5 px-4 text-center text-sm font-medium ${className}`}
        style={{ "--min-width": `${width}px` } as React.CSSProperties}
        {...props}
      >
        {/* Hidden element to measure initial text width */}
        <span
          ref={initialTextRef}
          aria-hidden="true"
          className="invisible absolute whitespace-nowrap"
        >
          {children}
        </span>

        <div className="relative flex items-center gap-1.5">
          <div
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              hasCopied
                ? "scale-[100] bg-black"
                : "bg-black group-hover:scale-[100]"
            }`}
          />
          <span
            className={`inline-block transition-all duration-300 ${
              hasCopied
                ? "translate-x-12 opacity-0 text-white"
                : "group-hover:translate-x-12 group-hover:opacity-0 group-hover:text-white"
            }`}
            style={{ minWidth: "var(--min-width)" }}
          >
            {children}
          </span>
        </div>
        <div
          className={`absolute inset-0 z-20 flex items-center transition-all duration-300 text-white ${
            hasCopied
              ? "opacity-100"
              : "translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          }`}
        >
          <div className="flex w-full items-center justify-between px-4 -ml-1.5">
            <AnimatePresence mode="wait">
              {hasCopied ? (
                <motion.span
                  key="copied"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-green-500"
                  style={{ minWidth: "var(--min-width)" }}
                >
                  Copied
                </motion.span>
              ) : (
                <motion.span
                  key="children"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ minWidth: "var(--min-width)" }}
                >
                  {children}
                </motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {hasCopied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-green-500 ml-2"
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-2"
                >
                  <Copy className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </button>
    );

    return (
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>{button}</Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="z-50 overflow-hidden rounded-lg bg-white/80 backdrop-blur-lg px-4 py-3 text-sm text-gray-950 shadow-lg max-w-[300px] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              sideOffset={5}
            >
              Copy this link to use in AI-powered IDEs like Cursor. Paste it
              into your agent workflow to instruct the AI to implement the
              guide's concepts.
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }
);

AiButton.displayName = "AiButton";

export default AiButton;
