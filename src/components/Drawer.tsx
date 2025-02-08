import type { ComponentPropsWithRef, HTMLAttributes } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: ComponentPropsWithRef<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof DrawerPrimitive.Overlay>) => (
  <DrawerPrimitive.Overlay
    className={`fixed inset-0 z-50 bg-black/20 ${className ?? ""}`}
    {...props}
  />
);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof DrawerPrimitive.Content>) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      className={`fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-white ${
        className ?? ""
      }`}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-gray-200" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
);
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`grid gap-1.5 p-4 text-center sm:text-left ${className ?? ""}`}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`mt-auto flex flex-col gap-2 p-4 ${className ?? ""}`}
    {...props}
  />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    className={`text-lg font-semibold leading-none tracking-tight ${
      className ?? ""
    }`}
    {...props}
  />
);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    className={`text-sm text-gray-500 ${className ?? ""}`}
    {...props}
  />
);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
