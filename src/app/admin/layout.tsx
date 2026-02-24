import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  const { data: profile } = await supabase.from("profiles").select("is_admin").eq("id", user.id).single();
  if (!profile?.is_admin) redirect("/");

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Products" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/upi", label: "UPI" },
    { href: "/admin/settings", label: "Settings" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-8 flex gap-4 border-b border-[var(--border)] pb-4">
        {nav.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--primary)]"
          >
            {label}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
