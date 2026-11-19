import { type CSSProperties, useId } from "react";

type OrnamentProps = { className?: string };

/** Flor de línea fina inspirada en el sello de la marca. */
export function Flower({ className }: OrnamentProps) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={className}
    >
      {petals.map((angle) => (
        <ellipse key={angle} cx="24" cy="12.5" rx="4" ry="8" transform={`rotate(${angle} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="3" />
    </svg>
  );
}

/** Disco lavanda con la flor, para acompañar el logo. */
export function FlowerBadge({ className }: OrnamentProps) {
  return (
    <span
      className={`flex items-center justify-center rounded-full bg-lavender text-white ${className ?? ""}`}
    >
      <Flower className="h-2/3 w-2/3" />
    </span>
  );
}

/** Rama de pino en línea fina: adorno navideño del hero. */
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

export function Star({ className, style }: OrnamentProps & { style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className} style={style}>
      <path d="M12 0c.8 7.4 4.6 11.2 12 12-7.4.8-11.2 4.6-12 12-.8-7.4-4.6-11.2-12-12 7.4-.8 11.2-4.6 12-12z" />
    </svg>
  );
}

/**
 * Líneas onda del manual de marca (pág. 18): trazos curvos con manchitas, en los
 * colores de la marca o a una tinta (blanco) sobre fondos de color. Opcionalmente,
 * una frase de marca corre sobre la línea verde.
 */
export function WaveLines({
  className,
  tone = "brand",
  phrase,
}: OrnamentProps & { tone?: "brand" | "white"; phrase?: string }) {
  const color = (brand: string) => (tone === "white" ? "#ffffff" : brand);
  const pathId = useId();
  return (
    <svg viewBox="0 0 600 400" fill="none" aria-hidden="true" className={className}>
      <g strokeWidth="7" strokeLinecap="round">
        <path id={pathId} d="M-10 300 C 90 230, 170 330, 260 260 S 420 140, 520 210 S 600 320, 640 280" stroke={color("#6daf98")} />
        <path d="M40 -10 C 10 90, 120 140, 90 230 S 140 380, 230 410" stroke={color("#d1badb")} />
        <path d="M-20 380 C 120 330, 260 400, 360 340 S 470 230, 450 170 S 380 110, 420 60 S 520 30, 610 70" stroke={color("#e8b72b")} />
        <path d="M300 -20 C 280 60, 360 90, 340 150" stroke={color("#bfdad5")} />
      </g>
      <g fill={color("#e8b72b")}>
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse key={i} cx={470 + (i % 3) * 18} cy={300 + Math.floor(i / 3) * 18 + (i % 2) * 6} rx="3" ry="7" transform={`rotate(25 ${470 + (i % 3) * 18} ${300 + Math.floor(i / 3) * 18})`} />
        ))}
      </g>
      <g fill={color("#6daf98")}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse key={i} cx={160 + (i % 2) * 18} cy={90 + Math.floor(i / 2) * 18 + (i % 2) * 6} rx="3" ry="7" transform={`rotate(-30 ${160 + (i % 2) * 18} ${90 + Math.floor(i / 2) * 18})`} />
        ))}
      </g>
      {phrase && (
        <text fill={tone === "white" ? "#ffffff" : "#445854"} fontSize="22" fontWeight="700" letterSpacing="1">
          <textPath href={`#${pathId}`} startOffset="22%" dy="-10">
            {phrase}
          </textPath>
        </text>
      )}
    </svg>
  );
}
