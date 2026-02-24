import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ThankYouUpsell } from "./ThankYouUpsell";

export const dynamic = "force-dynamic";

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order: orderId } = await searchParams;
  if (!orderId) redirect("/dashboard");

  const supabase = await createClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id, order_number, status")
    .eq("id", orderId)
    .single();

  if (!order) redirect("/dashboard");
  const isVerified =
    order.status === "verified" ||
    order.status === "completed" ||
    order.status === "paid";

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Success block */}
        <div className="text-center">
          <p className="text-4xl">✅</p>
          <h1 className="mt-4 text-3xl font-bold">PAYMENT SUCCESSFUL!</h1>
          <p className="mt-4 text-xl text-[var(--foreground)]/90">
            🎉 Welcome to the Faceless YouTube Growth Blueprint.
          </p>
          <p className="mt-2 text-[var(--foreground)]/80">
            Your access has been sent to your email.
          </p>
        </div>

        <div className="my-12 border-t border-[var(--border)] pt-12">
          <p className="text-center text-lg font-semibold">
            Before you leave…
          </p>
          <p className="mt-2 text-center text-xl font-bold">
            This is important.
          </p>
        </div>

        {/* 1:1 Upsell */}
        <ThankYouUpsell />

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-[var(--border)] pt-12">
          <Link
            href="/dashboard"
            className="rounded-lg bg-[var(--muted)] px-6 py-3 text-sm font-medium hover:bg-[var(--border)]"
          >
            Go to my dashboard
          </Link>
          <Link
            href="/"
            className="text-sm text-[var(--foreground)]/70 hover:text-[var(--primary)]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
