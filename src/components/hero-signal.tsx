export function HeroSignal() {
  return (
    <div aria-hidden="true" className="hero-signal">
      <svg fill="none" role="presentation" viewBox="0 0 1000 260">
        <path className="signal-grid" d="M0 210H1000M0 145H1000M0 80H1000" />
        <path
          className="signal-path signal-market"
          d="M0 211C74 207 105 186 151 190C197 194 220 133 278 148C337 163 365 109 421 116C479 123 501 75 566 89C628 102 663 54 723 71C784 88 808 36 865 47C919 58 950 19 1000 27"
        />
        <path
          className="signal-path signal-transit"
          d="M0 214H137C177 214 185 174 225 174H381C421 174 431 120 471 120H630C670 120 679 79 719 79H835C875 79 884 37 924 37H1000"
        />
        <path className="signal-path signal-ease" d="M0 215C356 215 324 34 704 34H1000" />
        <g className="signal-stops">
          <circle cx="137" cy="214" r="7" />
          <circle cx="381" cy="174" r="7" />
          <circle cx="630" cy="120" r="7" />
          <circle cx="835" cy="79" r="7" />
          <circle cx="1000" cy="37" r="7" />
        </g>
      </svg>
      <div className="signal-legend">
        <span>Market</span>
        <span>Mobility</span>
        <span>Motion</span>
      </div>
    </div>
  );
}
