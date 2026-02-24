import { getSettings } from "./actions";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="mt-1 text-sm text-[var(--foreground)]/70">
        Configure WhatsApp, email, and site settings. These values are used for order emails and support links.
      </p>
      <SettingsForm initialSettings={settings} />
    </div>
  );
}
