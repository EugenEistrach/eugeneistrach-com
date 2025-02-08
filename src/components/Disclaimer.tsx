import type { PropsWithChildren } from "react";

export function Disclaimer({ children }: PropsWithChildren) {
  return (
    <div className="my-4 rounded border-l-4 border-l-amber-500 border-t border-r border-b border-amber-200/30 bg-amber-50/5 p-3 dark:bg-amber-950/5">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-3.5 w-3.5 text-amber-500"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Important
        </span>
      </div>
      <div className="mt-1.5 text-gray-600 dark:text-gray-300 text-sm">
        {children}
      </div>
    </div>
  );
}
