"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const brands = [
  {
    name: "ZENIN",
    category: "D2C / STREETWEAR",
    number: "01",
    description:
      "Digital commerce, creative direction and growth systems for a culture-first brand.",
    accent: "red",
    mark: "Z",
    statement: "CULTURE\nMOVES.",
  },
  {
    name: "QUIRKS",
    category: "FOOTWEAR / BRAND",
    number: "02",
    description:
      "Building a distinctive visual identity around movement, attitude and everyday wear.",
    accent: "dark",
    mark: "Q",
    statement: "WEAR\nDIFFERENT.",
  },
  {
    name: "KAVISHAE",
    category: "LUXURY / JEWELLERY",
    number: "03",
    description:
      "A refined digital experience designed around elegance, product and modern luxury.",
    accent: "cream",
    mark: "K",
    statement: "LESS.\nMORE.",
  },
  {
    name: "SHOPRIVA",
    category: "COMMERCE / BRAND",
    number: "04",
    description:
      "A premium commerce experience built around discovery, product and conversion.",
    accent: "yellow",
    mark: "S",
    statement: "SHOP.\nMOVE.",
  },
  {
    name: "ZAMS",
    category: "FASHION / ECOMMERCE",
    number: "05",
    description:
      "Creative commerce and digital experiences for a fashion-focused brand.",
    accent: "black",
    mark: "Z",
    statement: "OWN\nYOUR LOOK.",
  },
];

function BrandArtwork({
  brand,
}: {
  brand: (typeof brands)[number];
}) {
  return (
    <div
      className={`brands-artwork brands-artwork-${brand.accent}`}
    >
      <div className="brands-art-grid" />

      <div className="brands-art-orbit brands-art-orbit-one" />
      <div className="brands-art-orbit brands-art-orbit-two" />

      <div className="brands-art-top">
        <span>{brand.category}</span>
        <span>{brand.number}</span>
      </div>

      <motion.div
        className="brands-art-mark"
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: -8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {brand.mark}
      </motion.div>

      <motion.div
        className="brands-art-statement"
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.08,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {brand.statement.split("\n").map((line) => (
          <div key={line}>{line}</div>
        ))}
      </motion.div>

      <div className="brands-art-bottom">
        MOMENTUM / DIGITAL STUDIO
      </div>

      <motion.div
        className="brands-art-dot"
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.55, 1, 0.55],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function BrandsShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((current) => {
        return (current + 1) % brands.length;
      });
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [paused]);

  const brand = brands[active];

  return (
    <section
      className="brands-showcase"
      id="brands"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="brands-showcase-noise" />

      <div className="brands-showcase-header">
        <div>
          <span className="brands-showcase-eyebrow">
            01 / BRANDS WE BUILD WITH
          </span>

          <h2>
            Brands with
            <br />
            <em>momentum.</em>
          </h2>
        </div>

        <div className="brands-showcase-header-copy">
          <span>
            SELECTED
            <br />
            PARTNERS
          </span>

          <span>
            {String(active + 1).padStart(2, "0")}
            {" / "}
            {String(brands.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="brands-showcase-main">

        <div className="brands-showcase-tabs">
          {brands.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={
                index === active
                  ? "brand-tab is-active"
                  : "brand-tab"
              }
              onClick={() => setActive(index)}
            >
              <span className="brand-tab-number">
                {item.number}
              </span>

              <span className="brand-tab-name">
                {item.name}
              </span>

              <span className="brand-tab-arrow">
                ↗
              </span>
            </button>
          ))}
        </div>

        <div className="brands-showcase-card">

          <AnimatePresence mode="wait">
            <motion.div
              key={brand.name}
              className="brands-showcase-card-inner"
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -25,
                scale: 0.985,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <BrandArtwork brand={brand} />

              <div className="brands-showcase-info">

                <div className="brands-showcase-info-top">
                  <span>
                    {brand.number}
                  </span>

                  <span>
                    {brand.category}
                  </span>
                </div>

                <h3>
                  {brand.name}
                </h3>

                <p>
                  {brand.description}
                </p>

                <div className="brands-showcase-info-bottom">
                  <span>
                    DIGITAL / CREATIVE /
                    PERFORMANCE
                  </span>

                  <span className="brands-live-dot">
                    <i />
                    IN MOTION
                  </span>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      <div className="brands-showcase-footer">

        <div className="brands-progress">
          {brands.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={`View ${item.name}`}
              onClick={() => setActive(index)}
            >
              <span
                className={
                  index === active
                    ? "is-active"
                    : ""
                }
                style={{
                  transform:
                    index === active
                      ? "scaleX(1)"
                      : "scaleX(0)",
                }}
              />
            </button>
          ))}
        </div>

        <span className="brands-scroll-label">
          HOVER TO PAUSE
        </span>

      </div>
    </section>
  );
}