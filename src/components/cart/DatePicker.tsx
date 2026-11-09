"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";

type DatePickerProps = {
  /** Fecha elegida en formato yyyy-mm-dd, o "" si no hay ninguna. */
  value: string;
  onChange: (value: string) => void;
  /** Primera fecha que se puede elegir, en formato yyyy-mm-dd. */
  min: string;
  labelledBy?: string;
};

const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const WEEKDAY_NAMES = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const monthTitle = new Intl.DateTimeFormat("es-CO", { month: "long", year: "numeric" });
const dayLabel = new Intl.DateTimeFormat("es-CO", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function toIso(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromIso(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Lunes = 0 … domingo = 6. */
function weekdayIndex(date: Date) {
  return (date.getDay() + 6) % 7;
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function DatePicker({ value, onChange, min, labelledBy }: DatePickerProps) {
  const minDate = fromIso(min);
  const initial = value ? fromIso(value) : minDate;
  const [view, setView] = useState({ year: initial.getFullYear(), month: initial.getMonth() });
  const [focused, setFocused] = useState(value || min);
  const grid = useRef<HTMLDivElement>(null);
  const shouldFocus = useRef(false);
  const today = toIso(new Date());

  useEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)?.focus();
  }, [focused, view]);

  const first = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const leading = weekdayIndex(first);
  const canGoBack =
    view.year > minDate.getFullYear() ||
    (view.year === minDate.getFullYear() && view.month > minDate.getMonth());

  function changeMonth(delta: number) {
    const next = new Date(view.year, view.month + delta, 1);
    setView({ year: next.getFullYear(), month: next.getMonth() });
  }

  function moveFocus(target: Date) {
    const iso = toIso(target < minDate ? minDate : target);
    const date = fromIso(iso);
    shouldFocus.current = true;
    setFocused(iso);
    if (date.getFullYear() !== view.year || date.getMonth() !== view.month) {
      setView({ year: date.getFullYear(), month: date.getMonth() });
    }
  }

  function handleKeyDown(event: KeyboardEvent, date: Date) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in moves) {
      event.preventDefault();
      moveFocus(addDays(date, moves[event.key]));
    } else if (event.key === "Home") {
      event.preventDefault();
      moveFocus(addDays(date, -weekdayIndex(date)));
    } else if (event.key === "End") {
      event.preventDefault();
      moveFocus(addDays(date, 6 - weekdayIndex(date)));
    }
  }

  const cells: (Date | null)[] = [
    ...Array.from({ length: leading }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.year, view.month, i + 1)),
  ];
  // El día enfocable debe estar en el mes visible; si no, el primero disponible.
  const visibleFocus = cells.some((d) => d && toIso(d) === focused && d >= minDate)
    ? focused
    : toIso(cells.find((d) => d && d >= minDate) ?? first);

  return (
    <div className="rounded-3xl bg-cream p-4 ring-1 ring-leaf/10">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          disabled={!canGoBack}
          aria-label="Mes anterior"
          className="flex h-9 w-9 items-center justify-center rounded-full text-leaf transition-colors hover:bg-lilac disabled:pointer-events-none disabled:opacity-25"
        >
          <Chevron direction="left" />
        </button>
        <p className="font-display text-base text-leaf" aria-live="polite">
          {capitalize(monthTitle.format(first))}
        </p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          aria-label="Mes siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-full text-leaf transition-colors hover:bg-lilac"
        >
          <Chevron direction="right" />
        </button>
      </div>

      <div role="grid" aria-labelledby={labelledBy} ref={grid} className="mt-3">
        <div role="row" className="grid grid-cols-7">
          {WEEKDAYS.map((day, index) => (
            <span
              key={WEEKDAY_NAMES[index]}
              role="columnheader"
              aria-label={WEEKDAY_NAMES[index]}
              className="pb-1 text-center text-[11px] font-semibold text-muted"
            >
              {day}
            </span>
          ))}
        </div>
        {Array.from({ length: Math.ceil(cells.length / 7) }, (_, week) => (
          <div role="row" key={week} className="grid grid-cols-7">
            {cells.slice(week * 7, week * 7 + 7).map((date, index) => {
              if (!date) return <span key={`empty-${index}`} role="gridcell" />;
              const iso = toIso(date);
              const disabled = date < minDate;
              const selected = iso === value;
              const isToday = iso === today;
              return (
                <span key={iso} role="gridcell" className="flex justify-center py-0.5">
                  <button
                    type="button"
                    data-date={iso}
                    disabled={disabled}
                    tabIndex={iso === visibleFocus ? 0 : -1}
                    aria-pressed={selected}
                    aria-label={`${dayLabel.format(date)}${disabled ? ", no disponible" : ""}`}
                    onClick={() => {
                      setFocused(iso);
                      onChange(iso);
                    }}
                    onKeyDown={(event) => handleKeyDown(event, date)}
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm transition-[background-color,color,transform] duration-150 active:scale-95 motion-reduce:transition-none ${
                      selected
                        ? "bg-leaf font-semibold text-white"
                        : disabled
                          ? "text-ink/25"
                          : "text-ink hover:bg-lilac"
                    } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage`}
                  >
                    {date.getDate()}
                    {isToday && !selected && (
                      <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-sage" aria-hidden="true" />
                    )}
                  </button>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="h-4 w-4">
      <path
        d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
