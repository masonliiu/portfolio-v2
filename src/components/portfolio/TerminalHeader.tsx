"use client";

import { Link as TransitionLink } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ImmersiveLaunchButton from "./ImmersiveLaunchButton";

const homeItems = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Signal", href: "/#signal", id: "signal" },
  { label: "Contact", href: "/#contact", id: "contact" },
];

const innerItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Photography", href: "/photography" },
  { label: "Resume", href: "/resume.pdf", external: true },
];

export default function TerminalHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const navItems = isHome ? homeItems : innerItems;
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isHome) return;

    const sections = homeItems
      .map((item) => item.id)
      .filter((id): id is string => Boolean(id));
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const updateActive = (next: string) => {
      if (activeRef.current === next) return;
      activeRef.current = next;
      setActiveId(next);
    };

    const hash = window.location.hash.replace("#", "");
    if (hash && sections.includes(hash)) {
      updateActive(hash);
    } else {
      updateActive(sections[0]);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const next = visible[0].target.id;
        if (next) updateActive(next);
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.15, 0.45, 0.75],
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
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
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="nav-link"
                data-magnet
                data-cursor={item.label}
              >
                {item.label}
              </a>
            ) : (
              <TransitionLink
                key={item.label}
                href={item.href}
                className={`nav-link${
                  isHome && item.id && activeId === item.id
                    ? " nav-link--active"
                    : ""
                }`}
                data-magnet
                data-cursor={item.label}
                aria-current={
                  isHome && item.id && activeId === item.id
                    ? "location"
                    : undefined
                }
              >
                {item.label}
              </TransitionLink>
            )
          )}
          <ImmersiveLaunchButton
            className="nav-link nav-link--accent"
            data-magnet
            data-cursor="Enter"
            aria-label="Immersive"
          >
            Immersive
          </ImmersiveLaunchButton>
        </nav>
      </div>
    </header>
  );
}
