// components/LoadingSpinner.tsx

import React from "react";

type SpinnerVariant = "spinner" | "dots" | "bars" | "pulse" | "ring";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: SpinnerVariant;
  color?: string; // e.g., 'blue-600', 'green-500', 'gray-400'
  text?: string; // Optional loading text
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  variant = "spinner",
  color = "blue-600",
  text,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const textSizeClasses = {
    sm: "text-sm mt-3",
    md: "text-base mt-4",
    lg: "text-lg mt-5",
  };

  const baseTextClass = "text-gray-600 font-medium";

  // Variant implementations (pure Tailwind, no extra deps)
  const variants: Record<SpinnerVariant, React.ReactNode> = {
    spinner: (
      <div
        className={`rounded-full border-4 border-solid border-t-transparent animate-spin ${sizeClasses[size]} border-${color} ${className}`}
        role="status"
        aria-label="Loading"
      />
    ),

    dots: (
      <div className="flex items-center justify-center space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-${color} animate-bounce ${sizeClasses[size]} `}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    ),

    bars: (
      <div className="flex h-8 items-end space-x-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`bg-${color} rounded-full animate-stretch`}
            style={{
              animationDelay: `${i * 0.1}s`,
              width: size === "sm" ? "4px" : size === "md" ? "6px" : "8px",
              height: size === "lg" ? "32px" : size === "md" ? "28px" : "20px",
            }}
          />
        ))}
      </div>
    ),

    pulse: (
      <div
        className={`rounded-full bg-${color} animate-pulse ${sizeClasses[size]} ${className}`}
      />
    ),

    ring: (
      <div className={`relative ${sizeClasses[size]}`}>
        <div
          className={`absolute inset-0 rounded-full border-4 border-${color} opacity-20`}
        />
        <div
          className={`rounded-full border-4 border-t-${color} border-solid animate-spin`}
        />
      </div>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {variants[variant]}
      {text && (
        <p className={`${textSizeClasses[size]} ${baseTextClass}`}>{text}</p>
      )}
      {/* Screen reader fallback */}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
