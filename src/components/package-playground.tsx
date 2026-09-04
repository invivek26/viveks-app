import { ArrowUpRight, BellRing, Github, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { portfolio } from "#/content/portfolio";

export function PackagePlayground() {
  const [number, setNumber] = useState(20_000);
  const [speed, setSpeed] = useState(14);

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
                <span aria-live="polite" key={number}>
                  {number.toLocaleString("en-US")}
                </span>
                <Button
                  aria-label="Animate to a new number"
                  onClick={() =>
                    setNumber((current) => (current >= 99_999 ? 20_000 : current + 12_547))
                  }
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <RotateCcw aria-hidden="true" />
                </Button>
              </div>
            ) : null}

            {item.demo === "marquee" ? (
              <div className="marquee-demo">
                <div className="marquee-window">
                  <div
                    className="marquee-content"
                    style={{ "--marquee-speed": `${speed}s` } as React.CSSProperties}
                  >
                    {[0, 1].map((copy) => (
                      <div aria-hidden={copy === 1} className="marquee-group" key={copy}>
                        <span>GME +4.82%</span>
                        <span>NVDA +2.31%</span>
                        <span>BTC +1.09%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <label>
                  <span>Speed</span>
                  <input
                    aria-label="Marquee speed"
                    max="24"
                    min="6"
                    onChange={(event) => setSpeed(Number(event.target.value))}
                    type="range"
                    value={speed}
                  />
                </label>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}
