import { useCallback, useEffect, useState } from "react";

export function SlideDeck({ slides }) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const go = useCallback(
    (delta) => {
      setIndex((current) => {
        const next = current + delta;
        if (next < 0) return 0;
        if (next > total - 1) return total - 1;
        return next;
      });
    },
    [total],
  );

  useEffect(() => {
    function onKey(event) {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(-1);
      } else if (event.key === "Home") {
        setIndex(0);
      } else if (event.key === "End") {
        setIndex(total - 1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  const progressLabel = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  const progressWidth = `${((index + 1) / total) * 100}%`;

  return (
    <div className="deck">
      {slides.map((Slide, slideIndex) => {
        const state = slideIndex === index ? "active" : slideIndex < index ? "prev" : "";
        return <Slide key={slideIndex} state={state} />;
      })}

      <div className="footer-tag">Skill · vercel-react-best-practices</div>
      <div className="progress">{progressLabel}</div>
      <div className="progress-track" style={{ width: progressWidth }} />
    </div>
  );
}
