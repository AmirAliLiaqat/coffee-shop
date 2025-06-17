import { Store } from 'lucide-react';
import type { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'navbar' | 'sidebar';
}

export function Logo({ size = 'md', variant = 'navbar', ...props }: LogoProps) {
  const sizeConfig = {
    sm: { width: 100, height: 20, fontSize: 14 },
    md: { width: 150, height: 30, fontSize: 22 },
    lg: { width: 200, height: 40, fontSize: 30 },
  };

  const colorConfig = {
    navbar: 'text-primary-foreground',
    sidebar: 'text-sidebar-foreground',
  };

  const { width, height, fontSize } = sizeConfig[size];
  const textColor = colorConfig[variant];

  return (
    <>
      <Store className={`h-7 w-7 ${textColor} flex-shrink-0`} />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <text
          x="0"
          y={height * 0.75}
          fontFamily="Poppins, sans-serif"
          fontSize={fontSize}
          fontWeight="500"
          fill="currentColor"
          className={textColor}
        >
          Coffee Shop
        </text>
      </svg>
    </>
  );
}
