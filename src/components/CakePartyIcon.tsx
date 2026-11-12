/** Íconos de línea para lo que incluye el Cake Party (mismo orden que cakeParty.includes). */
export function IncludeIcon({ index }: { index: number }) {
  const paths = [
    // Mini cake
    <path key="a" d="M5 11h14v8H5zM5 14c2 1.5 4 1.5 7 0s5-1.5 7 0M12 4v4M10.5 6.5c0-1 1.5-2.5 1.5-2.5s1.5 1.5 1.5 2.5a1.5 1.5 0 0 1-3 0z" />,
    // Crema
    <path key="b" d="M7 20h10l-1-7H8zM8 13c0-3 2-5 4-8 2 3 4 5 4 8" />,
    // Relleno
    <path key="c" d="M4 9h16M4 14h16M5 9c0-2 3-4 7-4s7 2 7 4M5 14v4h14v-4" />,
    // Mangas
    <path key="d" d="M5 4l14 6-5 2-2 5zM12 17l-1 3" />,
    // Utensilios
    <path key="e" d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M16 3c-2 2-2 6 0 8v10" />,
    // Colorantes
    <path key="f" d="M9 3h6M10 3v4l-4 9a3 3 0 0 0 3 4h6a3 3 0 0 0 3-4l-4-9V3M7.5 14h9" />,
  ];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
      {paths[index]}
    </svg>
  );
}
