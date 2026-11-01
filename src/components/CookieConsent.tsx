import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "proton-cookie-consent";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  decidedAt: string;
};

export const getCookiePreferences = (): CookiePreferences | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePreferences) : null;
  } catch {
    return null;
  }
};

const CATEGORIES = [
  {
    key: "necessary" as const,
    title: "Strictly necessary",
    description: "Required for the site to work, such as remembering this choice and keeping forms secure. Always on.",
  },
  {
    key: "analytics" as const,
    title: "Analytics",
    description: "Help us understand how visitors use the site (pages viewed, time on page) so we can improve it.",
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    description: "Used to measure our campaigns and show relevant Proton Security content on other platforms.",
  },
];

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (getCookiePreferences()) return;
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const save = (prefs: { analytics: boolean; marketing: boolean }) => {
    const value: CookiePreferences = { necessary: true, ...prefs, decidedAt: new Date().toISOString() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Storage blocked (private mode): just close for this visit.
    }
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6 pointer-events-none">
      <div
        role="dialog"
        aria-labelledby="cookie-title"
        className="cookie-pop pointer-events-auto mx-auto max-w-3xl rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 sm:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex w-12 h-12 flex-shrink-0 rounded-xl bg-primary items-center justify-center">
            <Cookie size={24} className="text-highlight" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <h2 id="cookie-title" className="text-xl font-bold text-primary">
                We value your privacy
              </h2>
              <button
                onClick={() => save({ analytics: false, marketing: false })}
                aria-label="Close and reject optional cookies"
                className="text-gray-400 hover:text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              We use cookies to keep this site working, understand how it's used, and improve your experience.
              You can accept all, reject optional cookies, or choose what to allow. Read our{" "}
              <Link to="/policy" className="text-primary font-semibold underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>

            {showSettings && (
              <div className="mt-5 space-y-3">
                {CATEGORIES.map((c) => {
                  const checked = c.key === "necessary" ? true : c.key === "analytics" ? analytics : marketing;
                  return (
                    <div key={c.key} className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 p-4">
                      <div>
                        <div className="font-semibold text-primary text-sm">{c.title}</div>
                        <div className="text-xs text-gray-600 mt-1 leading-relaxed">{c.description}</div>
                      </div>
                      <Switch
                        checked={checked}
                        disabled={c.key === "necessary"}
                        onCheckedChange={(v) => (c.key === "analytics" ? setAnalytics(v) : setMarketing(v))}
                        aria-label={c.title}
                      />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => save({ analytics: true, marketing: true })}
                className="flex-1 rounded-lg bg-primary text-white font-semibold px-5 py-3 hover:bg-primary/90 transition-colors"
              >
                Accept all
              </button>
              <button
                onClick={() => save({ analytics: false, marketing: false })}
                className="flex-1 rounded-lg border-2 border-primary text-primary font-semibold px-5 py-3 hover:bg-primary/5 transition-colors"
              >
                Reject all
              </button>
              {showSettings ? (
                <button
                  onClick={() => save({ analytics, marketing })}
                  className="flex-1 rounded-lg bg-highlight text-primary font-semibold px-5 py-3 hover:bg-highlight/90 transition-colors"
                >
                  Save choices
                </button>
              ) : (
                <button
                  onClick={() => setShowSettings(true)}
                  className="flex-1 rounded-lg text-primary font-semibold px-5 py-3 hover:bg-gray-100 transition-colors"
                >
                  Cookie settings
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
