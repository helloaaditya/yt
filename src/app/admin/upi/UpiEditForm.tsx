"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { updateUpiAccount, deleteUpiAccount } from "./actions";
import type { UpiAccount } from "@/lib/supabase/types";

export function UpiEditForm({ account }: { account: UpiAccount }) {
  const router = useRouter();
  const [state, formAction] = useActionState(
    async (_: unknown, formData: FormData) => {
      return await updateUpiAccount(account.id, formData);
    },
    null as { error?: string } | null
  );

  async function handleDelete() {
    if (!confirm("Remove this UPI account? Existing payments are unchanged.")) return;
    const res = await deleteUpiAccount(account.id);
    if (res.error) alert(res.error);
    else router.push("/admin/upi");
  }

  return (
    <form action={formAction} className="mt-6 max-w-md rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="upi_id" className="block text-sm text-[var(--foreground)]/70">
            UPI ID
          </label>
          <input
            id="upi_id"
            name="upi_id"
            type="text"
            defaultValue={account.upi_id}
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
            defaultValue={account.payee_name}
            className="mt-1 w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="is_active"
            name="is_active"
            type="checkbox"
            defaultChecked={account.is_active}
            className="rounded border-[var(--border)]"
          />
          <label htmlFor="is_active" className="text-sm text-[var(--foreground)]/80">
            Active (included in random selection for customers)
          </label>
        </div>
      </div>
      {state?.error && <p className="mt-2 text-sm text-red-500">{state.error}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Save changes
        </button>
        <Link
          href="/admin/upi"
          className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium hover:bg-[var(--muted)]"
        >
          Cancel
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-500/10"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
