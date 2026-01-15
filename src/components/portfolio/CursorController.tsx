"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type BlobState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  targetSize: number;
};

export default function CursorController() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/immersive")) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !finePointer) return;

    let blobTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-blob-target]")
    );
    let blobTexts = Array.from(
      document.querySelectorAll<HTMLElement>(".blob-text")
    );

    const smallSize = 44;
    const largeSize = 460;
    const proximity = 160;

    const state: BlobState = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      targetX: window.innerWidth / 2,
      targetY: window.innerHeight / 2,
      size: smallSize,
      targetSize: smallSize,
    };

    const updateTargets = (x: number, y: number) => {
      state.targetX = x;
      state.targetY = y;
      state.targetSize = smallSize;
      for (const target of blobTargets) {
        const rect = target.getBoundingClientRect();
        const dx = Math.max(rect.left - x, 0, x - rect.right);
        const dy = Math.max(rect.top - y, 0, y - rect.bottom);
        const distance = Math.hypot(dx, dy);
        if (distance < proximity) {
          state.targetSize = largeSize;
          break;
        }
      }
    };

    let pointerX = state.targetX;
    let pointerY = state.targetY;

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      updateTargets(pointerX, pointerY);
    };

    const handleResize = () => {
      blobTargets = Array.from(
        document.querySelectorAll<HTMLElement>("[data-blob-target]")
      );
      blobTexts = Array.from(
        document.querySelectorAll<HTMLElement>(".blob-text")
      );
    };

    let raf = 0;
    const tick = () => {
      updateTargets(pointerX, pointerY);
      state.x = state.targetX;
      state.y = state.targetY;
      state.size += (state.targetSize - state.size) * 0.18;

      if (Math.abs(state.targetSize - state.size) < 0.1) {
        state.size = state.targetSize;
      }

      const root = document.documentElement;
      root.style.setProperty("--blob-x", `${state.x}px`);
      root.style.setProperty("--blob-y", `${state.y}px`);
      root.style.setProperty("--blob-size", `${state.size}px`);

      blobTexts.forEach((element) => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--blob-mask-x", `${state.x - rect.left}px`);
        element.style.setProperty("--blob-mask-y", `${state.y - rect.top}px`);
      });

      raf = requestAnimationFrame(tick);
    };

    updateTargets(state.targetX, state.targetY);
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/immersive")) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !finePointer) return;

    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnet]")
    );
    const cleanups: Array<() => void> = [];

    magnets.forEach((element) => {
      const strength = Number(element.dataset.magnet) || 0.35;
      const handleMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const relX = event.clientX - rect.left - rect.width / 2;
        const relY = event.clientY - rect.top - rect.height / 2;
        gsap.to(element, {
          x: relX * strength,
          y: relY * strength,
          duration: 0.4,
          ease: "power3.out",
        });
      };
      const handleLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      };

      element.style.willChange = "transform";
      element.addEventListener("pointermove", handleMove);
      element.addEventListener("pointerleave", handleLeave);

      cleanups.push(() => {
        element.removeEventListener("pointermove", handleMove);
        element.removeEventListener("pointerleave", handleLeave);
        element.style.removeProperty("will-change");
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [pathname]);

  return null;
}
