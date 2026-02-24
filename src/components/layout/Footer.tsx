import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] mt-auto">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--primary)] text-white">
                YT
              </span>
              YT Growth Academy
            </Link>
            <p className="mt-3 text-sm text-[var(--foreground)]/70">
              Professional YouTube courses and one-to-one channel setup. Grow your channel with experts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]/60">Products</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/courses" className="text-sm hover:text-[var(--primary)]">Courses</Link></li>
              <li><Link href="/one-to-one" className="text-sm hover:text-[var(--primary)]">One-to-One Setup</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]/60">Support</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dashboard" className="text-sm hover:text-[var(--primary)]">My Orders</Link></li>
              <li><Link href="/payment/verify" className="text-sm hover:text-[var(--primary)]">Verify UTR</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-[var(--foreground)]/60">Legal</h4>
            <ul className="mt-3 space-y-2">
              <li><Link href="/terms" className="text-sm hover:text-[var(--primary)]">Terms</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-[var(--primary)]">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--foreground)]/60">
          © {new Date().getFullYear()} YT Growth Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
