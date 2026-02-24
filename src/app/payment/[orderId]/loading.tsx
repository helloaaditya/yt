export default function PaymentLoading() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center">
      <div className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" aria-hidden />
      <h1 className="mt-6 text-xl font-bold">Preparing your payment</h1>
      <p className="mt-2 text-sm text-[var(--foreground)]/70">
        Your secure payment page is loading. You’ll see the QR code in a moment.
      </p>
    </div>
  );
}
