"use client";

import { useEffect, useRef } from "react";

type HeroSwapTextProps = {
  base: string;
  reveal: string;
};

const SMALL_RADIUS = 0;
const LARGE_RADIUS = 260;
const HIT_PADDING = 18;

export default function HeroSwapText({ base, reveal }: HeroSwapTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReducedMotion || !finePointer) return;

    let raf = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const updateMask = () => {
      const circle = circleRef.current;
      const rect = element.getBoundingClientRect();
      const insideX =
        pointerX >= rect.left - HIT_PADDING && pointerX <= rect.right + HIT_PADDING;
      const insideY =
        pointerY >= rect.top - HIT_PADDING && pointerY <= rect.bottom + HIT_PADDING;
      const radius = insideX && insideY ? LARGE_RADIUS : SMALL_RADIUS;
      if (!circle) return;

      circle.setAttribute("cx", `${pointerX - rect.left}`);
      circle.setAttribute("cy", `${pointerY - rect.top}`);
      circle.setAttribute("r", `${radius}`);
    };

    const tick = () => {
      updateMask();
      raf = requestAnimationFrame(tick);
    };

    const handleMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    window.addEventListener("pointermove", handleMove);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return (
    <span ref={ref} className="hero-swap-svg" data-blob-target>
      <svg
        viewBox="0 0 1400 260"
        className="hero-swap-svg__canvas"
        aria-label={base}
        role="img"
      >
        <defs>
          <clipPath id="hero-swap-clip">
            <circle
              ref={circleRef}
              className="hero-swap-svg__mask-circle"
              cx="0"
              cy="0"
              r="0"
            />
          </clipPath>
        </defs>

        <text
          x="700"
          y="170"
          textAnchor="middle"
          className="hero-swap-svg__text hero-swap-svg__text--base"
        >
          {base}
        </text>

        <g clipPath="url(#hero-swap-clip)">
          <text
            x="700"
            y="170"
            textAnchor="middle"
            className="hero-swap-svg__text hero-swap-svg__text--cover"
          >
            {base}
          </text>
          <text
            x="700"
            y="170"
            textAnchor="middle"
            className="hero-swap-svg__text hero-swap-svg__text--reveal"
          >
            {reveal}
          </text>
        </g>
      </svg>
    </span>
  );
}
