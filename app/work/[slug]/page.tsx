"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { useParams } from "next/navigation";

 const projects: Record<
  string,
  {
    name: string;
    category: string;
    result: string;
    description: string;
    services: string[];
    number: string;
    accent: string;
    soft: string;
    statement: string;
  }
> = {
  zenin: {
    name: "ZENIN",
    category: "D2C / PERFORMANCE",
    result: "5.2x ROAS",
    number: "01",
    accent: "#9b2c2c",
    soft: "#fff2bd",
    description:
      "Turning anime culture into a high-converting digital commerce experience.",
    statement:
      "MOVE NUMBERS.",
    services: [
      "Performance Marketing",
      "Creative Strategy",
      "Meta Ads",
      "Google Ads",
      "Ecommerce Growth",
    ],
  },

  quirks: {
    name: "QUIRKS",
    category: "FASHION / BRAND",
    result: "BRAND SYSTEM",
    number: "02",
    accent: "#171313",
    soft: "#fff2bd",
    description:
      "Building a visual language around movement, attitude and everyday wear.",
    statement:
      "MAKE NOISE.",
    services: [
      "Brand Direction",
      "Creative",
      "Website",
      "Ecommerce",
      "Campaigns",
    ],
  },

  kavishae: {
    name: "KAVISHAE",
    category: "LUXURY / JEWELLERY",
    result: "DIGITAL EXPERIENCE",
    number: "03",
    accent: "#8f5f49",
    soft: "#f6e1ce",
    description:
      "A restrained digital experience designed around elegance and product.",
    statement:
      "QUIET LUXURY.",
    services: [
      "UI / UX",
      "Shopify",
      "Ecommerce",
      "Creative Direction",
      "Conversion",
    ],
  },

  shopriva: {
    name: "SHOPRIVA",
    category: "COMMERCE / BRAND",
    result: "ECOMMERCE SYSTEM",
    number: "04",
    accent: "#704b3e",
    soft: "#ead5c8",
    description:
      "Creating a premium shopping experience from the ground up.",
    statement:
      "BUILD BETTER.",
    services: [
      "Shopify",
      "UI / UX",
      "Ecommerce",
      "Conversion",
      "Growth",
    ],
  },

  zams: {
    name: "ZAMS",
    category: "FASHION / ECOMMERCE",
    result: "DIGITAL GROWTH",
    number: "05",
    accent: "#272727",
    soft: "#e9e4de",
    description:
      "A modern fashion commerce experience built around brand, product and digital growth.",
    statement:
      "FIND THE ANGLE.",
    services: [
      "Branding",
      "Website",
      "Creative",
      "Performance",
      "Growth",
    ],
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = String(params.slug || "").toLowerCase();

  const project = projects[slug];

  if (!project) {
    return (
      <main className="case-study-not-found">
        <span>404 / PROJECT NOT FOUND</span>

        <h1>
          THIS PROJECT
          <br />
          IS OFF TRACK.
        </h1>

        <Link href="/#work">
          BACK TO WORK ↗
        </Link>
      </main>
    );
  }

return (
  <main
    className="case-study"
    style={
      {
        "--case-accent": project.accent,
        "--case-soft": project.soft,
      } as React.CSSProperties
    }
  >
    <nav className="case-study-nav">
      <Link href="/" className="case-study-logo">
        <span>M</span>
        MOMENTUM
      </Link>

      <div className="case-study-nav-right">
        <span>{project.number} / 05</span>

        <Link href="/#work">
          BACK TO WORK ↗
        </Link>
      </div>
    </nav>

    <section className="case-study-hero">
      <div className="case-study-hero-meta">
        <span>{project.number}</span>
        <span>{project.category}</span>
      </div>

      <motion.div
        className="case-study-hero-main"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="case-study-title-wrap">
          <span className="case-study-eyebrow">
            MOMENTUM / SELECTED WORK
          </span>

          <h1>{project.name}</h1>

          <p>{project.description}</p>
        </div>

        <div className="case-study-statement">
          <span>THE IDEA</span>

          <strong>{project.statement}</strong>
        </div>
      </motion.div>

      <motion.div
        className="case-study-visual"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="case-study-visual-glow" />

        <div className="case-study-visual-inner">
          <span>{project.name}</span>
          <strong>{project.statement}</strong>
        </div>

        <div className="case-study-visual-index">
          {project.number}
        </div>
      </motion.div>
    </section>

    <section className="case-study-result-section">
      <div>
        <span>OUTCOME</span>

        <h2>
          {project.result}
        </h2>
      </div>

      <p>
        A focused digital system designed to create stronger
        brand presence, better experiences and meaningful
        momentum.
      </p>
    </section>

    <section className="case-study-content">
      <div className="case-study-intro">
        <span>01 / WHAT WE DID</span>

        <h2>
          BUILDING
          <br />
          MOMENTUM.
        </h2>
      </div>

      <div className="case-study-services">
        {project.services.map((service, index) => (
          <div key={service}>
            <span>
              {String(index + 1).padStart(2, "0")}
            </span>

            <strong>{service}</strong>

            <span className="case-study-arrow">
              ↗
            </span>
          </div>
        ))}
      </div>
    </section>

    <section className="case-study-story">
      <div className="case-study-story-label">
        <span>02 / THE APPROACH</span>
      </div>

      <div className="case-study-story-copy">
        <h2>
          EVERY BRAND
          <br />
          NEEDS <em>MOMENTUM.</em>
        </h2>

        <p>
          We bring strategy, creative and digital execution
          together around one clear objective — moving the
          brand forward.
        </p>

        <p>
          From positioning and visual direction to ecommerce
          and performance, every touchpoint is designed to
          work as part of the same system.
        </p>
      </div>
    </section>

    <section className="case-study-placeholder">
      <div>
        <span>03 / CASE STUDY</span>

        <h2>
          THE FULL
          <br />
          STORY IS
          <br />
          <em>COMING SOON.</em>
        </h2>
      </div>

      <p>
        We're currently building the complete breakdown
        behind this project — including strategy, creative,
        execution and the journey from idea to outcome.
      </p>
    </section>

    <footer className="case-study-footer">
      <div>
        <span>NEXT MOVE</span>

        <Link href="/#contact">
          START A CONVERSATION ↗
        </Link>
      </div>

      <div>
        <span>© 2026 MOMENTUM STUDIO</span>

        <Link href="/#work">
          VIEW ALL WORK ↗
        </Link>
      </div>
    </footer>
  </main>
);
}