import { cn } from "@/utils/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "primary" | "secondary"
}

export function Loader({ size = "md", variant = "default", className, ...props }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const variantClasses = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary",
  }

  return (
    <div
      className={cn(
        "relative inline-block",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Coffee cup outline */}
      <div
        className={cn(
          "absolute inset-0 rounded-b-[40%] border-2 border-current",
          variantClasses[variant]
        )}
      />

      {/* Steam animation */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "h-2 w-1 rounded-full bg-current animate-steam",
              variantClasses[variant]
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Liquid fill animation */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 rounded-b-[40%] bg-current animate-fill",
          variantClasses[variant]
        )}
        style={{
          opacity: 0.3,
        }}
      />
    </div>
  )
} 