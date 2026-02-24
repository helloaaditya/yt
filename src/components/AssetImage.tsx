"use client";

interface AssetImageProps {
  folder: string;
  /** Full filename including extension, e.g. "screenshot.png". Omit when no image in folder. */
  file?: string;
  alt: string;
  className?: string;
  animate?: boolean;
  hoverZoom?: boolean;
  priority?: boolean;
}

/**
 * Renders an image from public/assets/{folder}/{file}.
 * Use exact filename as you have in the folder (e.g. "IMG_001.jpg", "dashboard.png").
 */
export function AssetImage({
  folder,
  file,
  alt,
  className = "",
  animate = false,
  hoverZoom = false,
  priority = false,
}: AssetImageProps) {
  if (!file) return null;
  const src = `/assets/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;

  return (
    <div
      className={`overflow-hidden rounded-xl ${animate ? "opacity-0-init animate-fade-in-up" : ""} ${hoverZoom ? "hover-zoom" : ""}`}
      style={animate ? { animationFillMode: "forwards" } : undefined}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-contain ${className}`}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
    </div>
  );
}
