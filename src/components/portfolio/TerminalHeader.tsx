"use client";

import { Link as TransitionLink } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About", href: "/#about", ids: ["about"] },
  {
    label: "Projects",
    href: "/#projects",
    ids: ["projects"],
    match: "/projects",
  },
  { label: "Experience", href: "/#experience", ids: ["experience"] },
  { label: "Contact", href: "/#contact", ids: ["contact"] },
];

export default function TerminalHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sectionEntries = navItems.flatMap((item) =>
      (item.ids ?? []).map((id) => {
        const element =
          document.getElementById(id) ??
          document.querySelector<HTMLElement>(`[data-nav-section="${id}"]`);
        return { navId: item.ids?.[0] ?? id, element };
      })
    );
    const elements = sectionEntries.filter(
      (entry): entry is { navId: string; element: HTMLElement } =>
        Boolean(entry.element)
    );
    if (!elements.length) return;

    const updateActive = (next: string) => {
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActiveId(next);
    };

    const pickActive = () => {
      const viewportTop = 0;
      const viewportBottom = window.innerHeight;
      const viewportMiddle = window.innerHeight * 0.45;

      let next = navItems[0]?.ids?.[0] ?? "about";
      let maxVisible = -1;

      elements.forEach(({ navId, element }) => {
        const rect = element.getBoundingClientRect();
        const visible =
          Math.min(rect.bottom, viewportBottom) - Math.max(rect.top, viewportTop);

        if (visible > maxVisible) {
          maxVisible = visible;
          next = navId;
        }
      });

      elements.forEach(({ navId, element }) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
          next = navId;
        }
      });

      updateActive(next);
    };

    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);

    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, [isHome]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <TransitionLink
          className="brand-mark"
          href="/"
          data-magnet
          data-cursor="Home"
          aria-label="Home"
        >
          ML
        </TransitionLink>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <TransitionLink
              key={item.label}
              href={item.href}
              className={`nav-link${
                (isHome && item.ids?.[0] && activeId === item.ids[0]) ||
                (!isHome && item.match && pathname.startsWith(item.match))
                  ? " nav-link--active"
                  : ""
              }`}
              data-magnet
              data-cursor={item.label}
              aria-current={
                (isHome && item.ids?.[0] && activeId === item.ids[0]) ||
                (!isHome && item.match && pathname.startsWith(item.match))
                  ? "location"
                  : undefined
              }
            >
              {item.label}
            </TransitionLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
