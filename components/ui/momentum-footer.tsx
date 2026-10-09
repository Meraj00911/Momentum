"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Globe2, Mail } from "lucide-react";
import "./momentum-footer.css";

export function MomentumFooter() {
  const [email, setEmail] = useState("");

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Momentum studio updates");
    const body = encodeURIComponent(
      `Please add me to occasional Momentum studio updates.\n\nMy email: ${email}`,
    );
    window.location.href = `mailto:hello@momentumagency.in?subject=${subject}&body=${body}`;
  }

  return (
    <footer className="momentum-footer">
      <div className="momentum-footer-panel">
        <div className="momentum-footer-wave-field" aria-hidden="true">
          <svg className="momentum-footer-wave momentum-footer-wave-back" viewBox="0 0 2880 340" preserveAspectRatio="none">
            <path d="M0 55C210 65 270 205 515 185S920 45 1440 80V340H0Z M1440 55C1650 65 1710 205 1955 185S2360 45 2880 80V340H1440Z" fill="rgba(68,65,66,.055)" />
          </svg>
          <svg className="momentum-footer-wave momentum-footer-wave-front" viewBox="0 0 2880 340" preserveAspectRatio="none">
            <path d="M0 92C220 112 310 232 560 210S1010 85 1440 112V340H0Z M1440 92C1660 112 1750 232 2000 210S2450 85 2880 112V340H1440Z" fill="rgba(68,65,66,.075)" />
          </svg>
        </div>

        <div className="momentum-footer-grid">
          <section className="momentum-footer-connect">
            <span className="momentum-footer-kicker">MOMENTUM / STUDIO NOTES</span>
            <h2>Stay <br /><em>connected.</em></h2>
            <p>Occasional ideas on brand, creative and growth. No noise.</p>
            <form className="momentum-footer-form" onSubmit={handleSubscribe}>
              <label htmlFor="momentum-footer-email">Your email</label>
              <div className="momentum-footer-input-wrap">
                <Mail size={16} aria-hidden="true" />
                <input
                  id="momentum-footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@brand.com"
                  autoComplete="email"
                />
                <button type="submit" aria-label="Subscribe by email"><ArrowUpRight size={17} /></button>
              </div>
              <small>Subscribe by email · opens a message to Momentum</small>
            </form>
          </section>

          <nav className="momentum-footer-column" aria-label="Quick links">
            <h3>Explore</h3>
            <Link href="/">Home</Link>
            <Link href="/about">About us</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#results">Selected work</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <section className="momentum-footer-column">
            <h3>Contact</h3>
            <p>Mumbai, India</p>
            <a href="mailto:hello@momentumagency.in">hello@momentumagency.in</a>
            <Link href="/contact" className="momentum-footer-inline-link">Start a conversation <ArrowUpRight size={14} /></Link>
          </section>

          <section className="momentum-footer-column momentum-footer-social">
            <h3>Find your way</h3>
            <p>One studio. Every move connected.</p>
            <div className="momentum-footer-icon-links">
              <Link href="/#results" aria-label="Explore selected work"><BriefcaseBusiness size={17} /></Link>
              <Link href="/contact" aria-label="Contact Momentum"><Mail size={17} /></Link>
              <Link href="/login" aria-label="Open the client portal"><Globe2 size={17} /></Link>
            </div>
            <Link href="/login" className="momentum-footer-portal">Client portal <ArrowUpRight size={14} /></Link>
          </section>
        </div>

        <div className="momentum-footer-bottom">
          <Link href="/" className="momentum-footer-wordmark"><span>M</span> MOMENTUM</Link>
          <span>© {new Date().getFullYear()} Momentum Studio · Mumbai, India</span>
          <Link href="#top">Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
