interface BackgroundEffectsProps {
  variant?: "aurora" | "aurora-soft" | "conic" | "conic-soft" | "dots";
  grain?: boolean;
  className?: string;
}

/**
 * Absolutely-positioned background layer. Drop this as the first child
 * of a `position: relative` section wrapper — it never affects layout
 * or interaction (pointer-events-none throughout).
 *
 * Use the "-soft" variants on white/light sections (low alpha, subtle);
 * use the full-strength variants on dark sections like Hero/Footer.
 */
export function BackgroundEffects({
  variant = "aurora",
  grain = true,
  className = "",
}: BackgroundEffectsProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {variant === "aurora" && <div className="absolute inset-0 bg-aurora" />}
      {variant === "aurora-soft" && (
        <div className="absolute inset-0 bg-aurora-soft" />
      )}
      {variant === "conic" && (
        <div className="absolute inset-0 bg-conic-accent" />
      )}
      {variant === "conic-soft" && (
        <div className="absolute inset-0 bg-conic-soft" />
      )}
      {variant === "dots" && (
        <div className="absolute inset-0 scoreboard-dots opacity-40" />
      )}
      {grain && <div className="absolute inset-0 bg-grain" />}
    </div>
  );
}
