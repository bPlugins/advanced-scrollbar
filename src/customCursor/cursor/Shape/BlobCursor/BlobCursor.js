import { useEffect, useRef } from "react";
import "./style.scss";

const trans = (x, y) => `translate3d(${x}px,${y}px,0) translate3d(-50%,-50%,0)`;

export default function BlobCursor({
  blobType = "circle",
  fillColor = "#00f0ff",
  blobSize = 125,
  domEl = null,
  eventEl = typeof window !== "undefined" ? window : null,
  rect = { left: 0, top: 0 },
  isDashboard = false,
}) {
  const trailRefs = [useRef(null), useRef(null), useRef(null)];

  const pos = useRef({ x: 0, y: 0 });

  const trailPos = useRef([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);

  const blobSizes = [
    Math.round(blobSize * 0.4),
    blobSize,
    Math.round(blobSize * 0.6),
  ];

  const eases = [0.25, 0.15, 0.08];

  const handleMove = (e) => {
    let x = e.clientX || (e.touches && e.touches[0].clientX);
    let y = e.clientY || (e.touches && e.touches[0].clientY);

    if (rect && typeof rect.left === "number" && typeof rect.top === "number") {
      x = x - rect.left;
      y = y - rect.top;
    }

    pos.current = { x, y };
  };

  useEffect(() => {
    if (!eventEl) return;
    eventEl.addEventListener("mousemove", handleMove);
    eventEl.addEventListener("touchmove", handleMove);
    return () => {
      eventEl.removeEventListener("mousemove", handleMove);
      eventEl.removeEventListener("touchmove", handleMove);
    };
  }, [eventEl, rect]);

  useEffect(() => {
    let animationId;

    const updateTrail = () => {
      const currentPositions = trailPos.current;

      currentPositions[0].x += (pos.current.x - currentPositions[0].x) * eases[0];
      currentPositions[0].y += (pos.current.y - currentPositions[0].y) * eases[0];

      for (let i = 1; i < 3; i++) {
        currentPositions[i].x += (currentPositions[i - 1].x - currentPositions[i].x) * eases[i];
        currentPositions[i].y += (currentPositions[i - 1].y - currentPositions[i].y) * eases[i];
      }
      trailRefs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.style.transform = trans(
            currentPositions[i].x,
            currentPositions[i].y
          );
        }
      });

      animationId = requestAnimationFrame(updateTrail);
    };

    animationId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="advScrollbar-cursor-blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>
      <div
        className="advScrollbar-blob-cursor-main"
        style={{
          position: isDashboard ? "absolute" : "fixed",
          left: 0,
          top: 0,
          width: rect?.width ? rect.width : "100%",
          height: rect?.height ? rect.height : "100%",
          pointerEvents: "none",
        }}
        ref={domEl}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={trailRefs[index]}
            style={{
              position: "absolute",
              willChange: "transform",
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
              opacity: 0.6,
              width: `${blobSizes[index] || 60}px`,
              height: `${blobSizes[index] || 60}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}