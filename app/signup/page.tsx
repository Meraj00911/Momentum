"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "./signup.css";

export default function SignupPage() {
  const supabase = createClient();

  const [agencyName, setAgencyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
const {
  data: { user },
  error: signupError,
} = await supabase.auth.signUp({
  email: email.trim(),
  password,
  options: {
    data: {
      full_name: fullName.trim(),
      agency_name: agencyName.trim(),
    },
  },
});

      if (signupError) {
        throw signupError;
      }

if (!user) {
  throw new Error("Could not create your account.");
}

      /*
       * For now, agencyName is collected so we can
       * connect it to an agency/organization table later.
       */
      console.log("Agency:", agencyName);

      window.location.href = "/admin";
    } catch (err: any) {
      console.error(err);

      setError(
        err?.message ||
          "Something went wrong while creating your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-page">

      <div className="signup-glow signup-glow-one" />
      <div className="signup-glow signup-glow-two" />

      <section className="signup-card">

        <div className="signup-brand">
          <div className="signup-brand-mark">
            M
          </div>

          <div>
            <div className="signup-brand-name">
              Momentum
            </div>

            <div className="signup-brand-subtitle">
              Performance Portal
            </div>
          </div>
        </div>

        <div className="signup-heading">
          <span className="signup-eyebrow">
            AGENCY ACCOUNT
          </span>

          <h1>
            Build your agency workspace.
          </h1>

          <p>
            Create your Momentum account and start
            managing your client performance.
          </p>
        </div>

        <form
          className="signup-form"
          onSubmit={handleSignup}
        >

          <div className="signup-field">
            <label>
              Agency name
            </label>

            <input
              type="text"
              value={agencyName}
              onChange={(e) =>
                setAgencyName(e.target.value)
              }
              placeholder="e.g. Momentum Media"
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Your name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              placeholder="Your full name"
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@agency.com"
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Create a password"
              required
            />
          </div>

          <div className="signup-field">
            <label>
              Confirm password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm your password"
              required
            />
          </div>

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
          >
            <span>
              {loading
                ? "Creating account..."
                : "Create agency account"}
            </span>

            <span className="signup-arrow">
              →
            </span>
          </button>

        </form>

        <div className="signup-login">
          <span>
            Already have an account?
          </span>

          <a href="/login">
            Log in
          </a>
        </div>

        <div className="signup-footer">
          Momentum · Agency Portal
        </div>

      </section>
    </main>
  );
}