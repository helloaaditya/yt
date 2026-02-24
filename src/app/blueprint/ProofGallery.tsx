"use client";

import { useState } from "react";

interface ProofGalleryProps {
  folder: string;
  files: string[];
  title: string;
  captions: string[];
  tagline: string;
  aspiration: string;
}

export function ProofGallery({
  folder,
  files,
  title,
  captions,
  tagline,
  aspiration,
}: ProofGalleryProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const fullSrc = (filename: string) =>
    `/assets/${encodeURIComponent(folder)}/${encodeURIComponent(filename)}`;

  return (
    <div className="mt-16 opacity-0-init animate-fade-in-up">
      <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {files.map((filename, i) => (
          <button
            key={filename}
            type="button"
            className="group aspect-video overflow-hidden rounded-xl bg-[var(--muted)] opacity-0-init animate-fade-in-up hover-zoom focus-visible:outline-none"
            style={{ animationFillMode: "forwards", animationDelay: `${Math.min(i, 15) * 0.04}s` }}
            onClick={() => setLightboxSrc(fullSrc(filename))}
          >
            <img
              src={fullSrc(filename)}
              alt=""
              className="h-full w-full object-contain group-hover:scale-[1.02] transition-transform"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {captions.length > 0 && (
        <ul className="mt-4 space-y-1 text-sm text-[var(--foreground)]/80">
          {captions.map((cap) => (
            <li key={cap}>• {cap}</li>
          ))}
        </ul>
      )}
      <p className="mt-4 font-semibold">{tagline}</p>
      <p className="mt-2 text-sm text-[var(--foreground)]/80 italic">{aspiration}</p>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white hover:bg-black/80"
              onClick={() => setLightboxSrc(null)}
            >
              ✕ Close
            </button>
            <div className="max-h-[80vh] overflow-auto rounded-xl bg-black">
              <img
                src={lightboxSrc}
                alt=""
                className="mx-auto h-full max-h-[80vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
