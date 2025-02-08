import { useEffect, useState, useRef } from "react";
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from "./Drawer";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const [mobileScrollState, setMobileScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });
  const [desktopScrollState, setDesktopScrollState] = useState({
    canScrollUp: false,
    canScrollDown: false,
  });

  const mobileNavRef = useRef<HTMLElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);

  const updateMobileScrollIndicators = () => {
    const nav = mobileNavRef.current;
    if (nav) {
      const canScrollUp = nav.scrollTop > 0;
      const canScrollDown = nav.scrollTop < nav.scrollHeight - nav.clientHeight;
      setMobileScrollState({ canScrollUp, canScrollDown });
    }
  };

  const updateDesktopScrollIndicators = () => {
    const nav = desktopNavRef.current;
    if (nav) {
      const canScrollUp = nav.scrollTop > 0;
      const canScrollDown = nav.scrollTop < nav.scrollHeight - nav.clientHeight;
      setDesktopScrollState({ canScrollUp, canScrollDown });
    }
  };

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3, h4"));
    const items = elements.map((element) => ({
      id: element.id,
      text: element.textContent || "",
      level: Number(element.tagName.charAt(1)),
    }));
    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        );

        if (intersectingEntries.length > 0) {
          const topEntry = intersectingEntries.reduce((prev, curr) => {
            return prev.boundingClientRect.top < curr.boundingClientRect.top
              ? prev
              : curr;
          });

          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0.5,
      }
    );

    elements.forEach((elem) => observer.observe(elem));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    updateDesktopScrollIndicators();
  }, [headings]);

  useEffect(() => {
    if (isOpen) {
      updateMobileScrollIndicators();
    }
  }, [isOpen]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setIsOpen(false);
      setTimeout(() => {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  if (headings.length === 0) return <div />;

  return (
    <div className="">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <button className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-lg hover:bg-gray-50 ring-1 ring-gray-900/5 transition-colors 2xl:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            Table of Contents
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerTitle className="sticky top-0 z-20 bg-white px-3 py-3 border-b rounded-t-lg">
            <p className="font-medium text-gray-900">Table of Contents</p>
          </DrawerTitle>
          <div className="relative">
            <div
              className={`absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none transition-opacity ${
                mobileScrollState.canScrollUp ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none transition-opacity ${
                mobileScrollState.canScrollDown ? "opacity-100" : "opacity-0"
              }`}
            />
            <nav
              ref={mobileNavRef}
              onScroll={updateMobileScrollIndicators}
              className="max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300"
            >
              <div className="space-y-1 px-3 py-2">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => handleClick(heading.id)}
                    className={`group flex w-full items-center py-2.5 text-left text-sm transition-colors ${
                      activeId === heading.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`mr-2 h-4 w-0.5 shrink-0 bg-blue-500 opacity-0 transition-opacity ${
                        activeId === heading.id
                          ? "opacity-100"
                          : "group-hover:opacity-50"
                      }`}
                    />
                    <span
                      style={{
                        marginLeft: `${(heading.level - 2) * 1}rem`,
                      }}
                    >
                      {heading.text}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Desktop Sidebar */}
      <div
        className="fixed w-80 hidden 2xl:block"
        style={{
          top: "4rem",
          right: "calc(50% + 28rem)",
        }}
      >
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
          <div className="sticky top-0 z-20 bg-white px-3 py-3 border-b rounded-t-xl">
            <p className="font-medium text-gray-900">Table of Contents</p>
          </div>
          <div className="relative">
            <div
              className={`absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none transition-opacity ${
                desktopScrollState.canScrollUp ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none transition-opacity ${
                desktopScrollState.canScrollDown ? "opacity-100" : "opacity-0"
              }`}
            />
            <nav
              ref={desktopNavRef}
              onScroll={updateDesktopScrollIndicators}
              className="max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300"
            >
              <div className="space-y-1 px-3 py-2">
                {headings.map((heading) => (
                  <button
                    key={heading.id}
                    onClick={() => handleClick(heading.id)}
                    className={`group flex w-full items-center py-2.5 text-left text-sm transition-colors ${
                      activeId === heading.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`mr-2 h-4 w-0.5 shrink-0 bg-blue-500 opacity-0 transition-opacity ${
                        activeId === heading.id
                          ? "opacity-100"
                          : "group-hover:opacity-50"
                      }`}
                    />
                    <span
                      style={{ marginLeft: `${(heading.level - 2) * 1}rem` }}
                    >
                      {heading.text}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
