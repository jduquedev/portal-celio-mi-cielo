type OrnamentProps = { className?: string };

/** Rama de pino en línea fina: el único adorno navideño de la página. */
export function PineSprig({ className }: OrnamentProps) {
  const needles = [18, 34, 50, 66, 82, 98, 114, 130];
  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 150 C 50 110, 100 60, 150 12" />
      {needles.map((n) => {
        const x = n + 6;
        const y = 158 - n - 6;
        const len = 24 - n / 10;
        return (
          <g key={n}>
            <path d={`M${x} ${y} l ${-len * 0.25} ${-len}`} />
            <path d={`M${x} ${y} l ${len} ${len * 0.25}`} />
          </g>
        );
      })}
      <circle cx="42" cy="146" r="3.5" />
      <circle cx="54" cy="150" r="2.5" />
    </svg>
  );
}

export function Star({ className }: OrnamentProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0c.8 7.4 4.6 11.2 12 12-7.4.8-11.2 4.6-12 12-.8-7.4-4.6-11.2-12-12 7.4-.8 11.2-4.6 12-12z" />
    </svg>
  );
}
