import { clsx, type ClassValue } from "clsx";
import * as Color from "color-bits";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): Promise<string> => {
  if (typeof window === "undefined") return Promise.resolve(fallback);
  if (!cssColor) return Promise.resolve(fallback);

  return new Promise((resolve) => {
    // Small delay to ensure theme changes have propagated
    setTimeout(() => {
      try {
        // Handle CSS variables
        if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
          // Create a temporary element to resolve the CSS variable
          const element = document.createElement("div");
          element.style.color = cssColor;
          element.style.position = "absolute";
          element.style.visibility = "hidden";
          element.style.pointerEvents = "none";
          
          // Append to document.documentElement to ensure proper inheritance
          document.documentElement.appendChild(element);
          
          // Force a style recalculation
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          element.offsetHeight;
          
          // Get the computed color (browser will convert oklch to rgb)
          const computedColor = window.getComputedStyle(element).color;
          
          // Clean up
          document.documentElement.removeChild(element);
          
          // Convert the RGB color to RGBA format
          resolve(Color.formatRGBA(Color.parse(computedColor)));
          return;
        }

        resolve(Color.formatRGBA(Color.parse(cssColor)));
      } catch (e) {
        console.error("Color parsing failed:", e);
        resolve(fallback);
      }
    }, 10);
  });
};

// Helper function to add opacity to an RGB color string
export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];
