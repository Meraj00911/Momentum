"use client";

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
  }
> = {
  zenin: {
    name: "ZENIN",
    category: "D2C / PERFORMANCE",
    result: "5.2x ROAS",
    description:
      "A performance-driven growth system built around paid acquisition, creative testing, ecommerce optimisation and conversion.",
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
    description:
      "A fashion brand experience built around distinctive creative direction, ecommerce and a sharper digital identity.",
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
    category: "JEWELLERY / ECOMMERCE",
    result: "DIGITAL EXPERIENCE",
    description:
      "A premium jewellery ecommerce experience focused on editorial design, product discovery and conversion.",
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
    category: "ECOMMERCE / D2C",
    result: "ECOMMERCE SYSTEM",
    description:
      "A modern ecommerce system combining product presentation, conversion-focused design and a scalable storefront.",
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
    category: "FASHION / D2C",
    result: "DIGITAL GROWTH",
    description:
      "A digital growth experience combining brand, ecommerce and performance thinking for a modern D2C audience.",
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
    <main className="case-study">
      <nav className="case-study-nav">
        <Link href="/" className="case-study-logo">
          <span>M</span>
          MOMENTUM
        </Link>

        <Link href="/#work">
          BACK TO WORK ↗
        </Link>
      </nav>

      <section className="case-study-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="case-study-category">
            {project.category}
          </span>

          <h1>{project.name}</h1>

          <p>{project.description}</p>
        </motion.div>

        <div className="case-study-result">
          <span>RESULT</span>
          <strong>{project.result}</strong>
        </div>
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
            </div>
          ))}
        </div>
      </section>

      <section className="case-study-placeholder">
        <span>CASE STUDY</span>

        <h2>
          MORE DETAILS
          <br />
          COMING SOON.
        </h2>

        <p>
          We're currently building the full story behind
          this project.
        </p>
      </section>

      <footer className="case-study-footer">
        <Link href="/#contact">
          START A CONVERSATION ↗
        </Link>

        <span>© 2026 MOMENTUM STUDIO</span>
      </footer>
    </main>
  );
}