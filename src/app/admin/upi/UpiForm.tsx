"use client";

import { useActionState } from "react";
import { createUpiAccount } from "./actions";

export function UpiForm({ className = "" }: { className?: string }) {
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      return await createUpiAccount(formData);
    },
    null as { error?: string } | null
  );

  return (
    <form action={formAction} className={`rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 ${className}`}>
      <h2 className="font-semibold">Add UPI account</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="upi_id" className="block text-sm text-[var(--foreground)]/70">
            UPI ID
          </label>
          <input
            id="upi_id"
            name="upi_id"
            type="text"
            placeholder="e.g. 8797223004@ptsbi"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="payee_name" className="block text-sm text-[var(--foreground)]/70">
            Payee name
          </label>
          <input
            id="payee_name"
            name="payee_name"
            type="text"
            placeholder="e.g. YT Growth Academy"
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            required
          />
        </div>
      </div>
      {state?.error && <p className="mt-2 text-sm text-red-500">{state.error}</p>}
      <button
        type="submit"
        className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
      >
        Add UPI account
      </button>
    </form>
  );
}
