import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  // Using Poppins font as per new design direction, if available via tailwind.
  // If not, it will fall back to system sans-serif.
  // Exact font matching might require ensuring Poppins is loaded and applied correctly.
  return (
    <svg viewBox="0 0 150 30" width="150" height="30" xmlns="http://www.w3.org/2000/svg" {...props}>
      <text x="0" y="22" fontFamily="Poppins, sans-serif" fontSize="22" fontWeight="500" fill="currentColor">
        Coffee Shop
      </text>
    </svg>
  );
}
