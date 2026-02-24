"use client";

import { useState } from "react";
import type { ProductFile } from "@/lib/supabase/types";

interface ProductFilesSectionProps {
  productId: string;
  files: ProductFile[];
}

export function ProductFilesSection({ productId, files: initialFiles }: ProductFilesSectionProps) {
  const [files, setFiles] = useState(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are allowed.");
      return;
    }
    setError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`/admin/products/${productId}/files/api`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    e.target.value = "";
    if (!res.ok) {
      setError(data.error || "Upload failed");
      return;
    }
    if (data.file) setFiles((prev) => [...prev, data.file]);
  }

  async function handleDelete(fileId: string) {
    setDeletingId(fileId);
    setError("");
    const res = await fetch(`/admin/products/${productId}/files/${fileId}/api`, { method: "DELETE" });
    setDeletingId(null);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Delete failed");
      return;
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  }

  function formatSize(bytes: number | null) {
    if (bytes == null) return "—";
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return (
    <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <h2 className="font-semibold">Digital files (PDFs)</h2>
      <p className="mt-1 text-sm text-[var(--foreground)]/70">
        Add PDFs for this product. Customers can download them after payment is verified.
      </p>
      {error && (
        <div className="mt-3 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-sm text-red-400">
          {error}
        </div>
      )}
      <div className="mt-4">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--muted)] px-4 py-2 text-sm font-medium hover:bg-[var(--border)]">
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleUpload}
            disabled={uploading}
            className="sr-only"
          />
          {uploading ? "Uploading…" : "Upload PDF"}
        </label>
      </div>
      <ul className="mt-4 space-y-2">
        {files.length === 0 ? (
          <li className="text-sm text-[var(--foreground)]/60">No files yet.</li>
        ) : (
          files.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm"
            >
              <span className="font-medium">{f.file_name}</span>
              <span className="text-[var(--foreground)]/60">{formatSize(f.file_size_bytes)}</span>
              <button
                type="button"
                onClick={() => handleDelete(f.id)}
                disabled={deletingId === f.id}
                className="text-red-400 hover:text-red-300 disabled:opacity-50"
              >
                {deletingId === f.id ? "…" : "Delete"}
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
