import type { PropsWithChildren } from "react";

interface NoteProps extends PropsWithChildren {
  title?: string;
  href?: string;
}

export function Note({ children, title, href }: NoteProps) {
  const isLink = !!href;

  const Content = () => (
    <div
      className={`
        my-6 rounded-xl border p-5 transition-all
        ${
          isLink
            ? "border-blue-200/50 bg-blue-50/30 hover:border-blue-300/70 hover:bg-blue-50/50 hover:shadow-sm"
            : "border-amber-200/50 bg-amber-50/30"
        }
      `}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {isLink ? (
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <div
              className={`font-medium mb-1.5 ${
                isLink ? "text-blue-900" : "text-amber-900"
              }`}
            >
              {title}
            </div>
          )}
          <div
            className={`text-sm leading-relaxed [&>p]:mt-0 [&>p]:mb-0 ${
              isLink ? "text-blue-800/90" : "text-amber-800/90"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLink) {
    return (
      <a
        href={href}
        className="block no-underline hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Content />
      </a>
    );
  }

  return <Content />;
}
