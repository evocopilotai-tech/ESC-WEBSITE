/**
 * Utility: cn – lightweight class name merger.
 * Combines multiple class strings, filtering out falsy values.
 * Mirrors the shadcn/ui `cn` helper without needing clsx or tailwind-merge.
 */
export function cn(...inputs) {
  return inputs
    .flat()
    .filter(Boolean)
    .join(' ');
}
