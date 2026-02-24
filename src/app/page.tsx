import { createClient } from "@/lib/supabase/server";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { getAssetFiles, getAssetFolder, ASSET_KEYS } from "@/lib/assets";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .eq("featured", true)
    .order("sort_order");

  const firstImages = {
    buttons: getAssetFiles(ASSET_KEYS.buttons)[0],
    channelDashboard: getAssetFiles(ASSET_KEYS.channelDashboard)[0],
    revenue: getAssetFiles(ASSET_KEYS.revenue)[0],
  };
  const firstImageFolders = {
    buttons: getAssetFolder(ASSET_KEYS.buttons),
    channelDashboard: getAssetFolder(ASSET_KEYS.channelDashboard),
    revenue: getAssetFolder(ASSET_KEYS.revenue),
  };

  const extraDashboard = getAssetFiles(ASSET_KEYS.channelDashboard).slice(1, 4);
  const extraRevenue = getAssetFiles(ASSET_KEYS.revenue).slice(1, 4);

  return (
    <div>
      <HomeHero firstImages={firstImages} firstImageFolders={firstImageFolders} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>Featured</h2>
        <p className="mt-1 text-[var(--foreground)]/70 opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}>Hand-picked courses and services to get you started.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeaturedGrid products={products ?? []} placeholderFiles={getAssetFiles(ASSET_KEYS.channelDashboard)} placeholderFolder={getAssetFolder(ASSET_KEYS.channelDashboard)} />
        </div>
      </section>

      {/* Extra proof images on home page */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-xl font-bold opacity-0-init animate-fade-in-up" style={{ animationFillMode: "forwards" }}>
          Real dashboards & revenue
        </h2>
        <p
          className="mt-1 text-sm text-[var(--foreground)]/70 opacity-0-init animate-fade-in-up"
          style={{ animationDelay: "0.05s", animationFillMode: "forwards" }}
        >
          A few live snapshots from faceless channels powered by this system.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {extraDashboard.map((file, i) => (
            <div
              key={`dash-${file}-${i}`}
              className="overflow-hidden rounded-xl bg-[var(--muted)] hover-zoom opacity-0-init animate-fade-in-up"
              style={{ animationDelay: `${0.1 + i * 0.05}s`, animationFillMode: "forwards" }}
            >
              <img
                src={`/assets/${encodeURIComponent(getAssetFolder(ASSET_KEYS.channelDashboard))}/${encodeURIComponent(
                  file,
                )}`}
                alt=""
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
          {extraRevenue.map((file, i) => (
            <div
              key={`rev-${file}-${i}`}
              className="overflow-hidden rounded-xl bg-[var(--muted)] hover-zoom opacity-0-init animate-fade-in-up"
              style={{ animationDelay: `${0.1 + (i + extraDashboard.length) * 0.05}s`, animationFillMode: "forwards" }}
            >
              <img
                src={`/assets/${encodeURIComponent(getAssetFolder(ASSET_KEYS.revenue))}/${encodeURIComponent(file)}`}
                alt=""
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-[var(--card)]">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xl font-bold hover-lift">1</div>
              <h3 className="mt-4 font-semibold">Choose a course or service</h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70">Pick the YouTube course or one-to-one setup that fits your goals.</p>
            </div>
            <div className="text-center opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xl font-bold hover-lift">2</div>
              <h3 className="mt-4 font-semibold">Pay via UPI / Bank</h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70">Scan QR or transfer, then enter your UTR number for verification.</p>
            </div>
            <div className="text-center opacity-0-init animate-fade-in-up" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xl font-bold hover-lift">3</div>
              <h3 className="mt-4 font-semibold">Get access</h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70">Once verified, access your course or schedule your one-to-one session.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
