import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for YT Growth Academy",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="mt-4 text-[var(--foreground)]/80">
        By using YT Growth Academy you agree to purchase digital products (courses and services) for personal use.
        Payments are processed via UPI/bank transfer; order completion is subject to UTR verification. Refund policy
        is as stated at the time of purchase. We reserve the right to update these terms.
      </p>
    </div>
  );
}
