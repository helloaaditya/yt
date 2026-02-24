"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blueprint", label: "Blueprint" },
  { href: "/courses", label: "Courses" },
  { href: "/one-to-one", label: "One-to-One" },
];

export function Header() {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user: u } }) => {
      setUser(u ?? null);
      if (u?.id) {
        const { data } = await supabase.from("profiles").select("is_admin").eq("id", u.id).single();
        setIsAdmin(!!data?.is_admin);
      } else {
        setIsAdmin(false);
      }
    });
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded bg-[var(--primary)] text-white">
              YT
            </span>
            YT Growth
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition hover:text-[var(--primary)] ${
                  pathname === href ? "text-[var(--primary)]" : "text-[var(--foreground)]/80"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-medium hover:bg-[var(--border)]"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Admin
                  </Link>
                )}
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--primary)]"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border)] px-3 py-2 text-[var(--foreground)] md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            <span className="text-xs font-medium">Menu</span>
            <span className="relative flex h-4 w-5 items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-200 ${
                  mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="pb-4 md:hidden">
            <nav className="flex flex-col gap-2 border-t border-[var(--border)] pt-3">
              {nav.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-1 transition hover:text-[var(--primary)] ${
                    pathname === href ? "text-[var(--primary)]" : "text-[var(--foreground)]/80"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md bg-[var(--muted)] px-3 py-2 text-sm font-medium hover:bg-[var(--border)]"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Admin
                    </Link>
                  )}
                  <form action="/auth/signout" method="post">
                    <button
                      type="submit"
                      className="text-left text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--primary)]"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
