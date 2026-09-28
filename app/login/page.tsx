"use client";
import "./login.css";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    setLoading(true);
    setError("");

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});

if (error) {
  setError(error.message);
  setLoading(false);
  return;
}

const { data: profile } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", data.user.id)
  .single();

if (profile?.role === "admin") {
  router.push("/admin");
} else {
  router.push("/");
}

router.refresh();
  }

  return (
    <>
     
      <main className="login-page">
        <div className="login-glow login-glow-one" />
        <div className="login-glow login-glow-two" />

        <section className="login-card">
          <div className="login-brand">
            <div className="login-brand-mark">M</div>

            <div>
              <div className="login-brand-name">
                Momentum
              </div>

              <div className="login-brand-subtitle">
                Performance Portal
              </div>
            </div>
          </div>

          <div className="login-heading">
            <span className="login-eyebrow">
              CLIENT PORTAL
            </span>

            <h1>Welcome back</h1>

            <p>
              Sign in to access your performance dashboard.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="login-form"
          >
            <div className="login-field">
              <label htmlFor="email">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              <span>
                {loading
                  ? "Signing in..."
                  : "Sign in"}
              </span>

              {!loading && (
                <span className="login-arrow">
                  →
                </span>
              )}
            </button>
          </form>

          <div className="login-footer">
            <span>Secure client access</span>
            <span className="login-footer-dot">
              •
            </span>
            <span>Momentum</span>
          </div>
        </section>
      </main>
    </>
  );
}