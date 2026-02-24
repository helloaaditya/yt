import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for YT Growth Academy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-4 text-[var(--foreground)]/80">
        We collect your email and name for order processing and account management. Payment details (UTR) are used
        only for verification. We do not sell your data. Data is stored securely via Supabase. You may request
        deletion of your account and data by contacting us.
      </p>
    </div>
  );
}
