"use client";

import { useEffect, useRef } from "react";

type HeroSwapTextProps = {
  base: string;
  reveal: string;
};

const SMALL_RADIUS = 0;
const LARGE_RADIUS = 260;
const HIT_PADDING = 18;
const VIEWBOX_WIDTH = 1600;
const VIEWBOX_HEIGHT = 360;
const TEXT_X = VIEWBOX_WIDTH / 2;
const TEXT_Y = VIEWBOX_HEIGHT / 2 + 10;
const FONT_SIZE = 190;
const LETTER_SPACING = "0.05em";

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

      const scaleX = VIEWBOX_WIDTH / rect.width;
      const scaleY = VIEWBOX_HEIGHT / rect.height;
      circle.setAttribute("cx", `${(pointerX - rect.left) * scaleX}`);
      circle.setAttribute("cy", `${(pointerY - rect.top) * scaleY}`);
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
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        className="hero-swap-svg__canvas"
        aria-label={base}
        role="img"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="hero-swap-clip" clipPathUnits="userSpaceOnUse">
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
          x={TEXT_X}
          y={TEXT_Y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--ink)"
          fontFamily="var(--font-display)"
          fontSize={FONT_SIZE}
          fontWeight="700"
          letterSpacing={LETTER_SPACING}
          textTransform="uppercase"
        >
          {base}
        </text>

        <g clipPath="url(#hero-swap-clip)">
          <text
            x={TEXT_X}
            y={TEXT_Y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--accent)"
            fontFamily="var(--font-display)"
            fontSize={FONT_SIZE}
            fontWeight="700"
            letterSpacing={LETTER_SPACING}
            textTransform="uppercase"
          >
            {base}
          </text>
          <text
            x={TEXT_X}
            y={TEXT_Y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--blob-ink)"
            fontFamily="var(--font-display)"
            fontSize={FONT_SIZE}
            fontWeight="700"
            letterSpacing={LETTER_SPACING}
            textTransform="uppercase"
          >
            {reveal}
          </text>
        </g>
      </svg>
    </span>
  );
}
