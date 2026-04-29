"use client";

import { useCallback, useEffect, useState } from "react";
import Slide from "./Slide";
import type { Work } from "@/data/works";

type Props = {
  works: Work[];
  initialIndex?: number;
};

export default function Gallery({
  works,
  initialIndex = 0,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const total = works.length;

  useEffect(() => {
    const safeIndex =
      total > 0
        ? Math.max(0, Math.min(initialIndex, total - 1))
        : 0;

    setIndex(safeIndex);
  }, [initialIndex, total]);

  const advance = useCallback(
    (delta: number) => {
      if (!total) return;
      setIndex((i) => (i + delta + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") advance(-1);
      if (e.key === "ArrowRight") advance(1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  if (!total) {
    return (
      <section
        style={{
          height: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--display)",
            fontStyle: "italic",
            fontSize: 22,
            color: "rgba(26,24,20,0.35)",
          }}
        >
          No works yet.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Gallery"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {works.map((work, i) => (
        <Slide key={work.id} work={work} active={i === index} />
      ))}

      <button
        aria-label="Previous artwork"
        onClick={() => advance(-1)}
        className="gallery-arrow gallery-arrow-left"
      >
        ←
      </button>

      <button
        aria-label="Next artwork"
        onClick={() => advance(1)}
        className="gallery-arrow gallery-arrow-right"
      >
        →
      </button>

      <style jsx>{`
        .gallery-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 30;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: clamp(24px, 2vw, 34px);
          font-weight: 300;
          color: rgba(26, 24, 20, 0.45);
          transition:
            color 300ms ease,
            transform 300ms ease;
          user-select: none;
        }

        .gallery-arrow:hover {
          color: rgba(26, 24, 20, 0.9);
          transform: translateY(-50%) scale(1.08);
        }

        .gallery-arrow-left {
          left: 42px;
        }

        .gallery-arrow-right {
          right: 42px;
        }

        @media (max-width: 768px) {
          .gallery-arrow-left {
            left: 18px;
          }

          .gallery-arrow-right {
            right: 18px;
          }

          .gallery-arrow {
            font-size: 26px;
          }
        }
      `}</style>
    </section>
  );
}