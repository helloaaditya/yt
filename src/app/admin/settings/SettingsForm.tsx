"use client";

import { useState } from "react";
import { updateSetting } from "./actions";

export function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, { type: "success" | "error"; text: string }>>({});

  async function handleSave(key: string, value: string) {
    setLoading((l) => ({ ...l, [key]: true }));
    setMessages((m) => ({ ...m, [key]: undefined as any }));
    const result = await updateSetting(key, value);
    setLoading((l) => ({ ...l, [key]: false }));
    if (result.error) {
      setMessages((m) => ({ ...m, [key]: { type: "error", text: result.error! } }));
    } else {
      setMessages((m) => ({ ...m, [key]: { type: "success", text: "Saved!" } }));
      setTimeout(() => setMessages((m) => ({ ...m, [key]: undefined as any })), 2000);
    }
  }

  const fields = [
    {
      key: "whatsapp_number",
      label: "WhatsApp number",
      placeholder: "9198xxxxxx00",
      description: "Support WhatsApp number (digits only, no + or spaces). Used in order emails.",
      type: "text" as const,
    },
    {
      key: "email_from",
      label: "From email",
      placeholder: "support@yourdomain.com",
      description: "Email address used as sender for transactional emails (verified emails, reminders).",
      type: "email" as const,
    },
    {
      key: "email_api_key",
      label: "Email API key",
      placeholder: "re_xxxxxxxxxxxx",
      description: "Resend API key for sending emails. Get it from resend.com/api-keys",
      type: "password" as const,
    },
    {
      key: "site_url",
      label: "Site URL",
      placeholder: "https://yourdomain.com",
      description: "Your site URL (used in email links to thank-you and payment pages).",
      type: "url" as const,
    },
  ];

  return (
    <div className="mt-6 space-y-6">
      {fields.map((field) => (
        <div key={field.key} className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <label htmlFor={field.key} className="block text-sm font-medium">
            {field.label}
          </label>
          <p className="mt-1 text-xs text-[var(--foreground)]/60">{field.description}</p>
          <div className="mt-3 flex gap-3">
            <input
              id={field.key}
              type={field.type}
              value={settings[field.key] || ""}
              onChange={(e) => setSettings((s) => ({ ...s, [field.key]: e.target.value }))}
              placeholder={field.placeholder}
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => handleSave(field.key, settings[field.key] || "")}
              disabled={loading[field.key]}
              className="rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading[field.key] ? "Saving…" : "Save"}
            </button>
          </div>
          {messages[field.key] && (
            <p
              className={`mt-2 text-xs ${
                messages[field.key].type === "success" ? "text-[var(--accent)]" : "text-red-400"
              }`}
            >
              {messages[field.key].text}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
