"use client";

import "./login.css";

import {
  FormEvent,
  useState,
} from "react";

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

    const { data, error } =
      await supabase.auth.signInWithPassword({
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
      router.push("/dashboard");
    }

    router.refresh();
  }

  return (
    <main className="login-page">

      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div className="ambient ambient-blue" />
      <div className="ambient ambient-peach" />
      <div className="ambient ambient-slate" />
      <div className="ambient ambient-warm" />

      <div className="ambient-center" />

      <div className="login-noise" />

      {/* =====================================================
          TOP NAV
      ===================================================== */}

      <header className="glass-header">

        <div className="glass-brand">

          <div className="glass-brand-mark">
            M
          </div>

          <div className="glass-brand-text">

            <strong>
              Momentum
            </strong>

            <span>
              Performance Portal
            </span>

          </div>

        </div>


        <div className="glass-security">

          <span className="security-pulse" />

          <span>
            SECURE ACCESS
          </span>

        </div>

      </header>


      {/* =====================================================
          FLOATING BACKGROUND ELEMENTS
      ===================================================== */}

      <div className="floating-orb floating-orb-one" />
      <div className="floating-orb floating-orb-two" />

      <div className="ambient-label ambient-label-left">
        MOMENTUM / 2026
      </div>

      <div className="ambient-label ambient-label-right">
        CLIENT PORTAL
      </div>


      {/* =====================================================
          MAIN LOGIN STAGE
      ===================================================== */}

      <div className="login-stage">

        {/* ===================================================
            LEFT MESSAGE
        =================================================== */}

        <section className="glass-intro">

          <div className="intro-kicker">
            PERFORMANCE INTELLIGENCE
          </div>

          <h2>
            Everything
            <br />
            <span>in motion.</span>
          </h2>

          <p>
            Access your performance dashboard,
            reports and growth intelligence from
            one place.
          </p>


          <div className="intro-meta">

            <div className="intro-meta-item">

              <span>
                PLATFORM
              </span>

              <strong>
                MOMENTUM
              </strong>

            </div>


            <div className="intro-meta-line" />


            <div className="intro-meta-item">

              <span>
                STATUS
              </span>

              <strong className="status-live">
                ● LIVE
              </strong>

            </div>

          </div>

        </section>


        {/* ===================================================
            SKELETON
        =================================================== */}

        <section
          className="login-skeleton"
          aria-hidden="true"
        >

          <div className="skeleton-brand">

            <div className="skeleton-brand-mark">
              M
            </div>

            <div className="skeleton-brand-copy">

              <div
                className="
                  skeleton-line
                  skeleton-brand-title
                "
              />

              <div
                className="
                  skeleton-line
                  skeleton-brand-subtitle
                "
              />

            </div>

          </div>


          <div className="skeleton-heading">

            <div
              className="
                skeleton-line
                skeleton-eyebrow
              "
            />

            <div
              className="
                skeleton-line
                skeleton-title
              "
            />

            <div
              className="
                skeleton-line
                skeleton-description
              "
            />

          </div>


          <div className="skeleton-form">

            <div className="skeleton-field">

              <div
                className="
                  skeleton-line
                  skeleton-label
                "
              />

              <div className="skeleton-input" />

            </div>


            <div className="skeleton-field">

              <div
                className="
                  skeleton-line
                  skeleton-label
                "
              />

              <div className="skeleton-input" />

            </div>


            <div className="skeleton-button">

              <div className="skeleton-button-text" />

              <div className="skeleton-button-arrow" />

            </div>

          </div>


          <div className="skeleton-footer">

            <div className="skeleton-line" />

            <span />

            <div className="skeleton-line" />

          </div>

        </section>


        {/* ===================================================
            LOGIN CARD
        =================================================== */}

        <section className="login-card">

          {/* glass reflections */}

          <div className="login-card-glow" />
          <div className="login-card-shine" />


          {/* BRAND */}

          <div className="login-brand login-reveal-item">

            <div className="login-brand-mark">
              M
            </div>

            <div>

              <div className="login-brand-name">
                Momentum
              </div>

              <div className="login-brand-subtitle">
                Performance Portal
              </div>

            </div>

          </div>


          {/* HEADING */}

          <div className="login-heading">

            <span className="login-eyebrow login-reveal-item">
              CLIENT PORTAL
            </span>

            <h1 className="login-reveal-item">
              Welcome back
            </h1>

            <p className="login-reveal-item">
              Sign in to access your performance dashboard.
            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="login-form"
          >

            {/* EMAIL */}

            <div className="login-field login-reveal-item">

              <label htmlFor="email">
                Email
              </label>

              <div className="liquid-input">

                <div className="input-icon">
                  @
                </div>

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

            </div>


            {/* PASSWORD */}

            <div className="login-field login-reveal-item">

              <label htmlFor="password">
                Password
              </label>

              <div className="liquid-input">

                <div className="input-icon">
                  •••
                </div>

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

            </div>


            {/* ERROR */}

            {error && (
              <div className="login-error login-reveal-item">
                {error}
              </div>
            )}


            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="login-button login-reveal-item"
            >

              <span className="login-button-label">

                {loading
                  ? "Signing in..."
                  : "Sign in"}

              </span>


              <span className="login-button-orb">

                {loading ? (
                  <span className="login-spinner" />
                ) : (
                  <span className="login-arrow">
                    ↗
                  </span>
                )}

              </span>

            </button>

          </form>


          {/* FOOTER */}

          <div className="login-footer login-reveal-item">

            <span>
              Secure client access
            </span>

            <span className="login-footer-dot">
              •
            </span>

            <span>
              Momentum
            </span>

          </div>


          {/* STATUS */}

          <div className="login-status">

            <span className="login-status-dot" />

            Secure connection

          </div>

        </section>

      </div>


      {/* =====================================================
          BOTTOM INFO
      ===================================================== */}

      <div className="bottom-info">

        <span>
          © 2026 MOMENTUM
        </span>

        <span className="bottom-line" />

        <span>
          PERFORMANCE INTELLIGENCE
        </span>

      </div>


      {/* =====================================================
          LOADING LABEL
      ===================================================== */}

      <div className="login-loading-label">

        <span className="login-loading-dot" />

        Preparing your portal

      </div>

    </main>
  );
}