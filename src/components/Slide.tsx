"use client";

import { useEffect, useState } from "react";
import type { Work } from "@/data/works";

type Props = {
  work: Work;
  active: boolean;
};

export default function Slide({ work, active }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <article
        aria-hidden={!active}
        className={active ? "slide active" : "slide"}
        style={{
          position: "absolute",
          inset: 0,
          opacity: active ? 1 : 0,
          transition: "opacity 900ms cubic-bezier(0.42, 0, 0.58, 1)",
          pointerEvents: active ? "auto" : "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "96px 24px 80px",
        }}
      >
        <div
          className="art-wrap"
          style={{
            position: "relative",
            display: "inline-block",
          }}
        >
          {work.image ? (
            <img
              src={work.image}
              alt={work.title}
              style={{
                display: "block",
                maxWidth: "min(100%, 1600px)",
                maxHeight: "calc(100vh - 280px)",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          ) : (
            <div
              style={{
                width: "60%",
                height: "60vh",
                border: "0.5px solid rgba(26,24,20,0.15)",
              }}
            />
          )}

          {work.image && (
            <button
              type="button"
              aria-label={`Expand ${work.title}`}
              className="expand-btn"
              onClick={() => setOpen(true)}
            >
              +
            </button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 4,
            maxWidth: "min(100%, 1600px)",
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(26,24,20,0.55)",
            }}
          >
            {work.year}
          </span>

          <span
            style={{
              fontFamily: "var(--display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 30,
              color: "var(--bone)",
            }}
          >
            {work.title}
          </span>

          <span
            style={{
              fontSize: 11,
              color: "rgba(26,24,20,0.5)",
              letterSpacing: "0.08em",
            }}
          >
            {work.medium}
          </span>
        </div>

        <style jsx>{`
          .art-wrap:hover .expand-btn {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .expand-btn {
            position: absolute;
            top: 18px;
            right: 18px;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.9);
            color: #111;
            font-size: 26px;
            font-weight: 200;
            cursor: pointer;
            opacity: 0;
            transform: translateY(-8px) scale(0.9);
            transition: all 300ms ease;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          }

          .expand-btn:hover {
            transform: scale(1.08);
          }
        `}</style>
      </article>

      {open && work.image && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 999,
            display: "grid",
            placeItems: "center",
            padding: 40,
            cursor: "zoom-out",
          }}
        >
          <button
            aria-label="Close enlarged artwork"
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 30,
              border: "none",
              background: "transparent",
              color: "white",
              fontSize: 34,
              cursor: "pointer",
              opacity: 0.85,
            }}
          >
            ×
          </button>

          <img
            src={work.image}
            alt={work.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              cursor: "default",
            }}
          />
        </div>
      )}
    </>
  );
}