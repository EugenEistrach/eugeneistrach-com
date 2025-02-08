import type { PropsWithChildren } from "react";

interface HintProps extends PropsWithChildren {
  href?: string;
}

export function Hint({ children, href }: HintProps) {
  const Content = () => (
    <div
      className="flex items-center gap-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 py-3 text-sm
    md:text-base text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
    >
      <svg
        className="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="[&>p]:mt-0 [&>p]:mb-0">{children}</div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="group block no-underline hover:no-underline">
        <Content />
      </a>
    );
  }

  return <Content />;
}
