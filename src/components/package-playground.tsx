import { ArrowUpRight, BellRing, Github, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "#/components/ui/button";
import { portfolio } from "#/content/portfolio";

const digits = Array.from({ length: 10 }, (_, digit) => digit);
const numberTargets = [20_000, 32_547, 150_000, 10_600];
const tickerItems = [
  "GME +4.82%",
  "NVDA +2.31%",
  "BTC +1.09%",
  "AAPL +0.74%",
  "TSLA −1.21%",
  "ETH +2.04%",
];

function RollingNumber({ value }: { value: number }) {
  const characters = value.toLocaleString("en-US").split("");

  return (
    <output aria-label={value.toLocaleString("en-US")} className="rolling-number">
      {characters.map((character, position) =>
        character === "," ? (
          <span className="number-separator" key={`place-${characters.length - position}`}>
            ,
          </span>
        ) : (
          <span className="digit-window" key={`place-${characters.length - position}`}>
            <span
              className="digit-reel"
              style={{ transform: `translate3d(0, -${Number(character)}em, 0)` }}
            >
              {digits.map((digit) => (
                <span key={digit}>{digit}</span>
              ))}
            </span>
          </span>
        ),
      )}
    </output>
  );
}

function KineticMarquee() {
  const viewportRef = useRef<HTMLButtonElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let frame = 0;
    let groupWidth = 0;
    let offset = 0;
    let velocity = -38;
    let dragging = false;
    let lastPointerX = 0;
    let lastPointerTime = 0;
    let lastFrameTime = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function measure() {
      groupWidth = track?.querySelector<HTMLElement>(".marquee-group")?.offsetWidth ?? 0;
    }

    function render() {
      if (!track || !groupWidth) return;
      while (offset <= -groupWidth) offset += groupWidth;
      while (offset > 0) offset -= groupWidth;
      track.style.transform = `translate3d(${offset}px, 0, 0)`;
    }

    function animate(now: number) {
      const elapsed = Math.min((now - lastFrameTime) / 1_000, 0.05);
      lastFrameTime = now;

      if (!dragging && !reducedMotion) {
        velocity += (-38 - velocity) * Math.min(1, elapsed * 1.8);
        offset += velocity * elapsed;
        render();
      }

      frame = requestAnimationFrame(animate);
    }

    function beginDrag(event: PointerEvent) {
      dragging = true;
      lastPointerX = event.clientX;
      lastPointerTime = performance.now();
      viewport?.setPointerCapture(event.pointerId);
      viewport?.setAttribute("data-dragging", "true");
    }

    function drag(event: PointerEvent) {
      if (!dragging) return;
      const now = performance.now();
      const elapsed = Math.max(now - lastPointerTime, 8);
      const distance = event.clientX - lastPointerX;
      offset += distance;
      velocity = Math.max(-1_200, Math.min(1_200, (distance / elapsed) * 1_000));
      lastPointerX = event.clientX;
      lastPointerTime = now;
      render();
    }

    function endDrag(event: PointerEvent) {
      if (!dragging) return;
      dragging = false;
      if (viewport?.hasPointerCapture(event.pointerId))
        viewport.releasePointerCapture(event.pointerId);
      viewport?.setAttribute("data-dragging", "false");
    }

    function accelerate(event: KeyboardEvent) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      velocity += event.key === "ArrowLeft" ? -260 : 260;
    }

    const observer = new ResizeObserver(() => {
      measure();
      render();
    });

    observer.observe(viewport);
    measure();
    viewport.addEventListener("pointerdown", beginDrag);
    viewport.addEventListener("pointermove", drag);
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("keydown", accelerate);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener("pointerdown", beginDrag);
      viewport.removeEventListener("pointermove", drag);
      viewport.removeEventListener("pointerup", endDrag);
      viewport.removeEventListener("pointercancel", endDrag);
      viewport.removeEventListener("keydown", accelerate);
    };
  }, []);

  return (
    <button
      aria-label="Draggable market ticker. Drag left or right, or use the arrow keys."
      className="marquee-window"
      data-dragging="false"
      data-kinetic-marquee
      ref={viewportRef}
      type="button"
    >
      <div className="marquee-content" ref={trackRef}>
        {[0, 1, 2].map((copy) => (
          <div aria-hidden={copy !== 0} className="marquee-group" key={copy}>
            {tickerItems.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        ))}
      </div>
      <span className="marquee-hint">Drag · flick · arrow keys</span>
    </button>
  );
}

export function PackagePlayground() {
  const [numberIndex, setNumberIndex] = useState(0);

  return (
    <div className="playground-list">
      {portfolio.openSource.map((item) => (
        <article className="playground-card" key={item.packageName}>
          <div className="playground-copy">
            <div className="package-meta">
              <span>{item.downloads} downloads</span>
              <span>v{item.version}</span>
            </div>
            <h2>{item.name}</h2>
            <code>{item.packageName}</code>
            <p>{item.description}</p>
            <div className="playground-links">
              <a data-analytics="github_opened" href={item.github} rel="noreferrer" target="_blank">
                <Github aria-hidden="true" /> Source
              </a>
              <a
                data-analytics="npm_package_opened"
                data-analytics-label={item.packageName}
                href={item.npm}
                rel="noreferrer"
                target="_blank"
              >
                npm <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={`package-demo demo-${item.demo}`}>
            {item.demo === "live-activity" ? (
              <div className="live-activity-demo">
                <div>
                  <span className="live-icon">
                    <BellRing aria-hidden="true" />
                  </span>
                  <div>
                    <strong>GameStock</strong>
                    <p>Tournament closes in 02:14</p>
                  </div>
                </div>
                <div className="activity-bar">
                  <span />
                </div>
              </div>
            ) : null}

            {item.demo === "number" ? (
              <div className="number-demo">
                <RollingNumber value={numberTargets[numberIndex] ?? numberTargets[0]} />
                <Button
                  aria-label="Roll to a new number"
                  onClick={() => setNumberIndex((current) => (current + 1) % numberTargets.length)}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <RotateCcw aria-hidden="true" />
                </Button>
              </div>
            ) : null}

            {item.demo === "marquee" ? <KineticMarquee /> : null}
          </div>
        </article>
      ))}
    </div>
  );
}
