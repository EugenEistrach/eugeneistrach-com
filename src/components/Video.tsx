import type { PropsWithChildren } from "react";

interface VideoProps extends PropsWithChildren {
  src: string;
  className?: string;
}

export function Video({ src, className = "" }: VideoProps) {
  return (
    <video className={`w-full rounded-lg ${className}`} controls playsInline>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
