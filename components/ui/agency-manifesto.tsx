"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

const capabilities = [
  {
    number: "01",
    name: "STRATEGY",
    description:
      "Clear direction, positioning and growth thinking that gives every move a reason.",
  },
  {
    number: "02",
    name: "CREATIVE",
    description:
      "Ideas, campaigns and visual systems designed to make brands impossible to ignore.",
  },
  {
    number: "03",
    name: "BRANDING",
    description:
      "Distinct identities, language and design systems built to make brands memorable.",
  },
  {
    number: "04",
    name: "WEBSITE DEVELOPMENT",
    description:
      "High performance websites and digital experiences designed, developed and shipped from scratch.",
  },
  {
    number: "05",
    name: "ECOMMERCE",
    description:
      "Commerce experiences built around discovery, product, conversion and repeat customers.",
  },
  {
    number: "06",
    name: "PERFORMANCE",
    description:
      "Paid growth systems focused on creative testing, acquisition and measurable momentum.",
  },
  {
    number: "07",
    name: "DIGITAL",
    description:
      "Digital products and experiences that connect brand, technology and culture.",
  },
];

export function AgencyManifesto() {
  const ref = useRef<HTMLDivElement>(null);

  const [activeCapability, setActiveCapability] =
    useState<number | null>(null);

  const timers = useRef<
    Record<number, ReturnType<typeof setTimeout>>
  >({});

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, {
    stiffness: 90,
    damping: 20,
  });

  const springY = useSpring(mouseY, {
    stiffness: 90,
    damping: 20,
  });

  const rotateX = useTransform(
    springY,
    [-300, 300],
    [8, -8]
  );

  const rotateY = useTransform(
    springX,
    [-300, 300],
    [-8, 8]
  );

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (!ref.current) return;

    const rect =
      ref.current.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left -
      rect.width / 2;

    const y =
      event.clientY -
      rect.top -
      rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  function activateCapability(index: number) {
    if (timers.current[index]) {
      clearTimeout(timers.current[index]);
    }

    timers.current[index] = setTimeout(() => {
      setActiveCapability(index);
    }, 350);
  }

  function deactivateCapability(index: number) {
    if (timers.current[index]) {
      clearTimeout(timers.current[index]);
    }

    setActiveCapability((current) =>
      current === index ? null : current
    );
  }

  return (
    <section
      className="agency-manifesto"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="manifesto-grid" />

      <motion.div
        className="manifesto-orbit manifesto-orbit-one"
        style={{
          x: springX,
          y: springY,
        }}
      />

      <motion.div
        className="manifesto-orbit manifesto-orbit-two"
        style={{
          x: useTransform(
            springX,
            (value) => value * -0.45
          ),
          y: useTransform(
            springY,
            (value) => value * -0.45
          ),
        }}
      />

      <div className="manifesto-top">
        <span>
          02 / THE MOMENTUM SYSTEM
        </span>

        <span>
          STRATEGY
          <b>+</b>
          CREATIVE
          <b>+</b>
          PERFORMANCE
        </span>
      </div>

      <div className="manifesto-main">

        <motion.div
          className="manifesto-copy"
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="manifesto-kicker">
            WE DON'T JUST MAKE
          </span>

          <h2>
            WE MAKE
            <br />
            <em>MOMENTUM.</em>
          </h2>

          <p>
            Ideas that look different.
            Systems that work harder.
            Brands built to keep moving.
          </p>
        </motion.div>

        <motion.div
          className="manifesto-core"
          style={{
            rotateX,
            rotateY,
          }}
        >
          <div className="manifesto-core-inner">
            <span className="manifesto-core-small">
              MOMENTUM
            </span>

            <strong>M</strong>

            <span className="manifesto-core-status">
              <i />
              ALWAYS MOVING
            </span>
          </div>
        </motion.div>
      </div>

      <div className="manifesto-capabilities">

        {capabilities.map(
          (capability, index) => {
            const isActive =
              activeCapability === index;

            return (
              <motion.div
                key={capability.name}
                className={`manifesto-capability ${
                  isActive
                    ? "is-active"
                    : ""
                }`}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.25,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                animate={{
                  y: isActive ? -14 : 0,
                  scale: isActive ? 1.045 : 1,
                }}
                onMouseEnter={() =>
                  activateCapability(index)
                }
                onMouseLeave={() =>
                  deactivateCapability(index)
                }
                onClick={() =>
                  setActiveCapability(
                    isActive ? null : index
                  )
                }
              >
                <div className="manifesto-capability-head">
                  <span>
                    {capability.number}
                  </span>

                  <i>↗</i>
                </div>

                <strong>
                  {capability.name}
                </strong>

                <p>
                  {capability.description}
                </p>

                <div className="manifesto-capability-line">
                  <motion.span
                    animate={{
                      scaleX: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>

                {isActive && (
                  <motion.div
                    className="manifesto-capability-glow"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                  />
                )}
              </motion.div>
            );
          }
        )}

      </div>

      <div className="manifesto-bottom">

        <span>
          MUMBAI / INDIA
        </span>

        <div className="manifesto-line">
          <motion.i
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <span>
          BUILT FOR BRANDS THAT MOVE
        </span>

      </div>
    </section>
  );
}