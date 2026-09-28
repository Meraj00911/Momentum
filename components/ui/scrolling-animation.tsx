"use client";

import { useEffect, useRef, useState } from "react";

const visuals = [
  {
    label: "01 / STRATEGY",
    title: ["THINK", "DIFFERENT."],
    type: "strategy",
  },
  {
    label: "02 / CREATIVE",
    title: ["MAKE", "NOISE."],
    type: "creative",
  },
  {
    label: "03 / DIGITAL",
    title: ["BUILD", "BETTER."],
    type: "digital",
  },
  {
    label: "04 / MOTION",
    title: ["KEEP", "MOVING."],
    type: "motion",
  },
  {
    label: "05 / BRAND",
    title: ["BE", "REMEMBERED."],
    type: "brand",
  },
  {
    label: "06 / PERFORMANCE",
    title: ["MOVE", "NUMBERS."],
    type: "performance",
  },
  {
    label: "07 / STUDIO",
    title: ["MOMENTUM."],
    type: "studio",
  },
  {
    label: "08 / CULTURE",
    title: ["START", "SOMETHING."],
    type: "culture",
  },
];

function AgencyCard({
  item,
  index,
}: {
  item: (typeof visuals)[number];
  index: number;
}) {
  return (
    <div
      className={`momentum-scroll-card momentum-card-${item.type}`}
    >
      <div className="momentum-card-grid" />

      <div className="momentum-card-top">
        <span>{item.label}</span>
        <span>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {item.type === "strategy" && (
        <div className="strategy-symbol">
          <span />
          <span />
          <span />
        </div>
      )}

      {item.type === "creative" && (
        <div className="creative-symbol">
          <div />
          <div />
          <div />
        </div>
      )}

      {item.type === "digital" && (
        <div className="digital-window">
          <div className="digital-window-top">
            <span />
            <span />
            <span />
          </div>

          <div className="digital-lines">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>
      )}

      {item.type === "motion" && (
        <div className="motion-symbol">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {item.type === "brand" && (
        <div className="brand-symbol">
          M
        </div>
      )}

      {item.type === "performance" && (
        <div className="performance-symbol">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      )}

      {item.type === "studio" && (
        <div className="studio-symbol">
          <span>M</span>
        </div>
      )}

      {item.type === "culture" && (
        <div className="culture-symbol">
          <span />
          <span />
          <span />
        </div>
      )}

      <div className="momentum-card-title">
        {item.title.map((line) => (
          <div key={line}>{line}</div>
        ))}
      </div>

      <div className="momentum-card-bottom">
        MOMENTUM / DIGITAL STUDIO
      </div>
    </div>
  );
}

export function ScrollingAnimation() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section =
        sectionRef.current;

      if (!section) return;

      const rect =
        section.getBoundingClientRect();

      const animationDistance =
        section.offsetHeight -
        window.innerHeight;

      if (animationDistance <= 0) return;

      const travelled =
        -rect.top;

      const nextProgress =
        Math.min(
          Math.max(
            travelled / animationDistance,
            0
          ),
          1
        );

      setProgress(nextProgress);
    };

    updateProgress();

    window.addEventListener(
      "scroll",
      updateProgress,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      updateProgress
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );

      window.removeEventListener(
        "resize",
        updateProgress
      );
    };
  }, []);

  /*
    Ease the movement so the cards don't move
    completely linearly with the mouse wheel.
  */
  const eased =
    progress * progress * (3 - 2 * progress);

  const radius =
    35 + eased * 330;

  const cardScale =
    0.58 + eased * 0.42;

  const rotation =
    eased * 360;

  return (
    <section
      ref={sectionRef}
      className="momentum-scroll-section"
    >
      <div className="momentum-scroll-sticky">

        <div className="momentum-scroll-header">
          <span>
            02 / SELECTED WORK
          </span>

          <span>
            CREATIVE SYSTEMS
            <b>●</b>
            2026
          </span>
        </div>

        <div className="momentum-scroll-stage">

          <div
            className="momentum-scroll-orbit"
            style={{
              transform: `
                translate(-50%, -50%)
                rotate(${rotation}deg)
              `,
            }}
          >
            {visuals.map(
              (item, index) => {
                const angle =
                  (index /
                    visuals.length) *
                  Math.PI *
                  2;

                const x =
                  Math.cos(angle) *
                  radius;

                const y =
                  Math.sin(angle) *
                  radius;

                return (
                  <div
                    key={item.label}
                    className="momentum-orbit-item"
                    style={{
                      transform: `
                        translate(
                          ${x}px,
                          ${y}px
                        )
                        rotate(${-rotation}deg)
                        scale(${cardScale})
                      `,
                    }}
                  >
                    <AgencyCard
                      item={item}
                      index={index}
                    />
                  </div>
                );
              }
            )}
          </div>

          <div className="momentum-scroll-core">

            <div
              className="momentum-core-ring"
              style={{
                transform: `
                  scale(
                    ${1 + eased * 0.15}
                  )
                `,
              }}
            />

            <div className="momentum-core-inner">

              <span className="momentum-core-label">
                MOMENTUM
              </span>

              <h2>
                WE MAKE
                <br />
                <em>BRANDS</em>
                <br />
                MOVE.
              </h2>

              <p>
                Strategy, creative and
                digital experiences built
                to move brands forward.
              </p>

            </div>

          </div>

        </div>

        <div className="momentum-scroll-progress">

          <span>
            SCROLL TO EXPLORE
          </span>

          <div>
            <i
              style={{
                transform:
                  `scaleX(${progress})`,
              }}
            />
          </div>

          <span>
            {String(
              Math.round(progress * 100)
            ).padStart(2, "0")}
            %
          </span>

        </div>

      </div>
    </section>
  );
}