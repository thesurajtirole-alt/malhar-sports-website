"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { X } from "lucide-react";
import { getStreak } from "@/lib/gamification";
import { trackEvent } from "@/lib/analytics";

type Mode = "login" | "signup";

export function AuthButton() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    // localStorage doesn't exist during SSR, so this can't be a lazy
    // initial state — it has to sync after mount, same as CustomCursor's
    // capability check.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStreakCount(getStreak().count);
  }, [status]);

  async function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error ?? "Signup fail hua, dobara try karo.");
          setLoading(false);
          return;
        }
      }

      const result = await signIn("phone", {
        phone,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          mode === "login"
            ? "Phone number ya password galat hai."
            : "Login fail hua, dobara try karo."
        );
        setLoading(false);
        return;
      }

      // Refresh so server components (and useSession, on its next poll)
      // pick up the new session, then close the modal.
      trackEvent(mode === "signup" ? "signup_success" : "login_success", {
        method: "phone",
      });
      router.refresh();
      setModalOpen(false);
      setLoading(false);
    } catch {
      setError("Kuch gadbad hui — dobara try karo.");
      setLoading(false);
    }
  }

  if (status === "authenticated" && session?.user) {
    const displayName = session.user.name || session.user.email || "Player";
    return (
      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 rounded-pill bg-surface px-3 py-1.5 text-sm font-semibold text-ink hover:bg-tape"
        >
          <span>🔥 {streakCount}</span>
          <span className="hidden max-w-[100px] truncate sm:inline">
            {displayName}
          </span>
        </button>
        {menuOpen && (
          <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-tape bg-paper p-2 shadow-lg">
            <button
              onClick={() => {
                setMenuOpen(false);
                signOut();
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-tape"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => {
          setModalOpen(true);
          setError(null);
        }}
        className="rounded-pill border border-tape px-4 py-1.5 text-sm font-semibold text-ink hover:bg-tape"
      >
        Sign In
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-card bg-paper p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl normal-case tracking-normal">
                Streak Save Karo
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Band karo"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-ink/60">
              Sign in karo taaki tera streak, points aur badges kisi bhi
              device pe safe rahe.
            </p>

            <button
              onClick={() => {
                trackEvent("login_click", { method: "google" });
                signIn("google", { callbackUrl: "/" });
              }}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-pill border border-tape py-3 text-sm font-semibold hover:bg-tape"
            >
              Continue with Google
            </button>

            <div className="my-4 flex items-center gap-2 text-xs text-ink/40">
              <div className="h-px flex-1 bg-tape" /> OR{" "}
              <div className="h-px flex-1 bg-tape" />
            </div>

            <div className="mb-3 flex rounded-pill bg-surface p-1 text-sm font-semibold">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                }}
                className={`flex-1 rounded-pill py-2 transition-colors ${
                  mode === "login" ? "bg-ink text-white" : "text-ink/60"
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError(null);
                }}
                className={`flex-1 rounded-pill py-2 transition-colors ${
                  mode === "signup" ? "bg-ink text-white" : "text-ink/60"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-3">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile number"
                required
                className="w-full rounded-pill border border-tape px-4 py-3 text-sm outline-none focus:border-orange"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full rounded-pill border border-tape px-4 py-3 text-sm outline-none focus:border-orange"
              />
              {error && (
                <p className="text-sm font-medium text-orange-deep">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-pill bg-orange py-3 text-sm font-semibold text-white disabled:opacity-60"
              >
                {loading
                  ? "..."
                  : mode === "login"
                    ? "Login Karo"
                    : "Account Banao"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
