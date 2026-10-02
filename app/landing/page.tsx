"use client";
import { useEffect, useRef, useState } from "react";
import type React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import "./landing.css";
import { BrandsShowcase } from "@/components/ui/brands-showcase";
import { AgencyManifesto } from "@/components/ui/agency-manifesto";
import MomentumOrbital from "@/components/ui/momentum-orbital";
import MomentumContactForm from "@/components/ui/momentum-contact-form";
const projects = [
  {
    number: "01",
    name: "ZENIN",
    type: "D2C / PERFORMANCE",
    description:
      "Turning anime culture into a high-converting digital commerce experience.",
    className: "project-zenin",
  },
  {
    number: "02",
    name: "QUIRKS",
    type: "BRAND / E-COMMERCE",
    description:
      "Building a visual language around movement, attitude and everyday wear.",
    className: "project-quirks",
  },
  {
    number: "03",
    name: "KAVISHAE",
    type: "LUXURY / JEWELLERY",
    description:
      "A restrained digital experience designed around elegance and product.",
    className: "project-kavishae",
  },
  {
    number: "04",
    name: "SHOPRIVA",
    type: "COMMERCE / BRAND",
    description:
      "Creating a premium shopping experience from the ground up.",
    className: "project-shopriva",
  },
];
function Cursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: 500,
    damping: 40,
    mass: 0.25,
  });
  const smoothY = useSpring(y, {
    stiffness: 500,
    damping: 40,
    mass: 0.25,
  });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);
  return (
    <motion.div
      className={`site-cursor ${visible ? "is-visible" : ""}`}
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <span />
    </motion.div>
  );
}
function ImageCorridor() {
const visuals = [
  "ideas",
  "strategy",
  "creative",
  "motion",
  "digital",
  "growth",
  "studio",
  "build",
  "momentum",
];
  const path = {
    perspective: 30,
    cardWidth: 18,
    cardHeight: 25,
    cardRadius: 0.4,
    birthHeight: 2.6,
    exitHeight: 46,
    railBirth: -11,
    railExit: 44,
    fan: 3.3,
    turnBirth: 6,
    turnExit: 28,
    stops: 24,
  };
  const createKeyframes = (
    direction: 1 | -1,
    name: string
  ) => {
    const frames: string[] = [];
    for (let i = 0; i <= path.stops; i++) {
      const u = i / path.stops;
      const scale =
        (path.birthHeight / path.cardHeight) *
        Math.pow(
          path.exitHeight / path.birthHeight,
          u
        );
      const z =
        path.perspective *
        (1 - 1 / scale);
      const rail =
        path.railExit -
        (path.railExit - path.railBirth) *
          Math.pow(1 - u, path.fan);
      const turn =
        path.turnBirth +
        (path.turnExit - path.turnBirth) * u;
      frames.push(`
        ${(u * 100).toFixed(2)}% {
          transform:
            translate3d(
              ${(direction * rail).toFixed(2)}cqw,
              0,
              ${z.toFixed(2)}cqw
            )
            rotateY(
              ${(-direction * turn).toFixed(2)}deg
            );
        }
      `);
    }
return `
  @keyframes ${name} {
    ${frames.join("")}
  }
`;
  };
  const rightAnimation = "momentumCorridorRight";
  const leftAnimation = "momentumCorridorLeft";
  return (
    <div className="image-corridor">
<style>{`
  ${createKeyframes(1, rightAnimation)}
  ${createKeyframes(-1, leftAnimation)}
  @media (prefers-reduced-motion: reduce) {
    .corridor-card {
      animation-play-state: paused !important;
    }
  }
`}</style>
      <div className="corridor-perspective">
        <div className="corridor-world">
{[1, -1].map((direction) =>
  Array.from(
    { length: 9 },
    (_, index) => {
      return (
                  <div
                    key={`${direction}-${index}`}
                    className="corridor-card"
                    style={{
                      left: "50%",
                      top: "55%",
                      width: `${path.cardWidth}cqw`,
                      height: `${path.cardHeight}cqw`,
                      marginLeft: `-${
                        path.cardWidth / 2
                      }cqw`,
                      marginTop: `-${
                        path.cardHeight / 2
                      }cqw`,
                      animation: `${
                        direction === 1
                          ? rightAnimation
                          : leftAnimation
                      } 18s linear infinite`,
                      animationDelay: `${
                        -(index * 18) / 9
                      }s`,
                    }}
                  >
                <div className={`corridor-art corridor-art-${visuals[index % visuals.length]}`}>
  <div className="art-grid" />
  <div className="art-cross" />
  <div className="art-circle" />
  {index % visuals.length === 0 && (
    <>
      <span className="art-label">IDEAS</span>
      <strong>THINK<br />DIFFERENT.</strong>
    </>
  )}
  {index % visuals.length === 1 && (
    <>
      <span className="art-label">01 / STRATEGY</span>
      <strong>FIND<br />THE<br />ANGLE.</strong>
    </>
  )}
  {index % visuals.length === 2 && (
    <>
      <span className="art-label">02 / CREATIVE</span>
      <div className="art-ring" />
      <strong>MAKE<br />NOISE.</strong>
    </>
  )}
  {index % visuals.length === 3 && (
    <>
      <span className="art-label">03 / MOTION</span>
      <div className="art-lines" />
      <strong>KEEP<br />MOVING.</strong>
    </>
  )}
  {index % visuals.length === 4 && (
    <>
      <span className="art-label">DIGITAL SYSTEMS</span>
      <div className="art-window">
        <i />
        <i />
        <i />
      </div>
    </>
  )}
  {index % visuals.length === 5 && (
    <>
      <span className="art-label">PERFORMANCE</span>
      <div className="art-chart">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <strong>MOVE<br />THE<br />NUMBER.</strong>
    </>
  )}
  {index % visuals.length === 6 && (
    <>
      <span className="art-label">MOMENTUM / STUDIO</span>
      <div className="art-m" />
    </>
  )}
  {index % visuals.length === 7 && (
    <>
      <span className="art-label">BUILD / SHIP / REPEAT</span>
      <strong className="art-huge">
        BUILD.
      </strong>
    </>
  )}
  {index % visuals.length === 8 && (
    <>
      <span className="art-label">MOMENTUM</span>
      <strong className="art-huge">
        M
      </strong>
      <span className="art-number">
        2026
      </span>
    </>
  )}
</div>
                  </div>
                );
              }
            )
          )}
        </div>
      </div>
      <div className="corridor-fade corridor-fade-left" />
      <div className="corridor-fade corridor-fade-right" />
      <div className="corridor-center">
        <span />
      </div>
    </div>
  );
}
function MagneticButton({
  children,
  href = "#contact",
  dark = true,
}: {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, {
    stiffness: 300,
    damping: 20,
  });
  const springY = useSpring(y, {
    stiffness: 300,
    damping: 20,
  });
  const handleMove = (event: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relativeX =
      event.clientX - rect.left - rect.width / 2;
    const relativeY =
      event.clientY - rect.top - rect.height / 2;
    x.set(relativeX * 0.18);
    y.set(relativeY * 0.18);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.a
      ref={ref}
      href={href}
      className={`magnetic-button ${
        dark ? "button-dark" : "button-light"
      }`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.96 }}
    >
      <span>{children}</span>
      <span className="button-arrow">↗</span>
    </motion.a>
  );
}
function ProjectVisual({
  className,
  name,
}: {
  className: string;
  name: string;
}) {
  return (
    <div className={`project-visual ${className}`}>
      <div className="visual-grid" />
      <div className="visual-noise" />
      <div className="visual-word">
        {name}
      </div>
      <div className="visual-circle" />
      <div className="visual-small">
        MOMENTUM / DIGITAL STUDIO
      </div>
    </div>
   );
}
function PeakPerformance() {
  const brands = [
    {
      name: "ZENIN",
      category: "D2C / PERFORMANCE",
      number: "01",
      accent: "#9b2c2c",
      soft: "#fff2bd",
      headline: "MOVE NUMBERS.",
    },
    {
      name: "QUIRKS",
      category: "BRAND / ECOMMERCE",
      number: "02",
      accent: "#171313",
      soft: "#fff2bd",
      headline: "MAKE NOISE.",
    },
    {
      name: "KAVISHAE",
      category: "LUXURY / JEWELLERY",
      number: "03",
      accent: "#8f5f49",
      soft: "#f6e1ce",
      headline: "QUIET LUXURY.",
    },
    {
      name: "SHOPRIVA",
      category: "COMMERCE / BRAND",
      number: "04",
      accent: "#704b3e",
      soft: "#ead5c8",
      headline: "BUILD BETTER.",
    },
    {
      name: "ZAMS",
      category: "FASHION / ECOMMERCE",
      number: "05",
      accent: "#272727",
      soft: "#e9e4de",
      headline: "FIND THE ANGLE.",
    },
  ];
  const [active, setActive] = useState(0);
  const brand = brands[active];
  return (
    <section className="peak-performance" id="results">
      <div className="peak-top">
        <div>
          <span className="section-number">
            03 / PROOF OF WORK
          </span>
          <h2>
            What happens
            <br />
            when <em>brands move.</em>
          </h2>
        </div>
        <p>
          Selected work, growth systems
          <br />
          and performance moments
          <br />
          from brands we work with.
        </p>
      </div>
      <div className="peak-shell">
        <div className="peak-selector">
          {brands.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={
                active === index
                  ? "peak-brand-button is-active"
                  : "peak-brand-button"
              }
              onClick={() => setActive(index)}
            >
              <span>{item.number}</span>
              <strong>{item.name}</strong>
              <i>↗</i>
            </button>
          ))}
        </div>
        <motion.div
          className="peak-card"
          key={brand.name}
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div
            className="peak-visual"
            style={{
              background: `
                radial-gradient(
                  circle at 75% 20%,
                  ${brand.soft},
                  transparent 30%
                ),
                linear-gradient(
                  135deg,
                  ${brand.accent},
                  #171313
                )
              `,
            }}
          >
            <div className="peak-grid" />
            <div className="peak-orbit peak-orbit-one" />
            <div className="peak-orbit peak-orbit-two" />
            <motion.div
              className="peak-brand-mark"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
              }}
            >
              {brand.name}
            </motion.div>
            <div className="peak-visual-label">
              <span>
                MOMENTUM / {brand.number}
              </span>
              <span>
                {brand.category}
              </span>
            </div>
            <div className="peak-visual-bottom">
              {brand.headline}
            </div>
            <div className="peak-glow" />
          </div>
          <div className="peak-info">
            <div className="peak-info-top">
              <div>
                <span className="peak-kicker">
                  SELECTED PERFORMANCE
                </span>
                <h3>{brand.name}</h3>
                <p>
                  Performance, creative and digital
                  systems built around the brand's
                  next stage of growth.
                </p>
              </div>
              <div className="peak-index">
                {String(active + 1).padStart(2, "0")}
                <span>/</span>
                {String(brands.length).padStart(2, "0")}
              </div>
            </div>
<div className="peak-metrics">
  <div className="peak-metric">
    <strong>5.2x</strong>
    <span>Peak ROAS</span>
  </div>
  <div className="peak-metric">
    <strong>₹14L+</strong>
    <span>Revenue</span>
  </div>
  <div className="peak-metric">
    <strong>900+</strong>
    <span>Orders</span>
  </div>
</div>
            <div className="peak-footer">
              <span>
                {brand.category}
              </span>
              <span>
                RESULTS / PERFORMANCE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function MomentumSystem() {
  const systems = [
    {
      no: "01",
      title: "STRATEGY",
      text: "We find the angle, audience and direction before the work begins.",
      tag: "THINK",
    },
    {
      no: "02",
      title: "BRANDING",
      text: "Identity systems that make brands recognisable before they are remembered.",
      tag: "DEFINE",
    },
    {
      no: "03",
      title: "CREATIVE",
      text: "Campaigns, concepts and visual systems designed to make people stop.",
      tag: "CREATE",
    },
    {
      no: "04",
      title: "WEBSITES",
      text: "High-converting digital experiences built to look different and work harder.",
      tag: "BUILD",
    },
    {
      no: "05",
      title: "ECOMMERCE",
      text: "Product journeys engineered around discovery, trust and conversion.",
      tag: "CONVERT",
    },
    {
      no: "06",
      title: "PERFORMANCE",
      text: "Paid acquisition systems where creative meets measurable growth.",
      tag: "SCALE",
    },
    {
      no: "07",
      title: "DIGITAL",
      text: "The systems, experiences and interactions that keep a brand moving.",
      tag: "MOVE",
    },
  ];
  const [active, setActive] = useState(0);
  const current = systems[active];
  return (
    <section className="momentum-system">
      <div className="system-heading">
        <div>
          <span className="section-number">
            04 / THE SYSTEM
          </span>
          <h2>
            More than
            <br />
            <em>one thing.</em>
          </h2>
        </div>
        <p>
          Strategy, creative, technology
          <br />
          and performance working
          <br />
          as one system.
        </p>
      </div>
      <div className="system-stage">
        <div className="system-orbit system-orbit-a" />
        <div className="system-orbit system-orbit-b" />
        <div className="system-orbit system-orbit-c" />
        <motion.div
          className="system-center"
          animate={{
            rotate: [0, 1.5, 0, -1.5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="system-center-small">
            MOMENTUM
          </span>
          <strong>
            {current.tag}
          </strong>
          <span className="system-center-line">
            / {current.no}
          </span>
        </motion.div>
        <div className="system-cards">
          {systems.map((item, index) => {
            const isActive = index === active;
            return (
              <motion.button
                key={item.title}
                type="button"
                className={
                  isActive
                    ? "system-card is-active"
                    : "system-card"
                }
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
                animate={{
                  y: isActive ? -12 : 0,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                }}
              >
                <div className="system-card-top">
                  <span>{item.no}</span>
                  <span className="system-arrow">
                    ↗
                  </span>
                </div>
                <div className="system-card-title">
                  {item.title}
                </div>
                <div className="system-card-bottom">
                  <span>
                    {item.tag}
                  </span>
                  <span>
                    MOMENTUM
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
        <motion.div
          className="system-description"
          key={current.title}
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .35,
          }}
        >
          <span>
            {current.no} / {current.title}
          </span>
          <p>
            {current.text}
          </p>
        </motion.div>
      </div>
      <div className="system-footer">
        <span>
          ONE STUDIO
        </span>
        <span>
          BRAND → DIGITAL → PERFORMANCE
        </span>
        <span>
          ALWAYS MOVING ↗
        </span>
      </div>
    </section>
  );
}
  function LiquidNavbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    {
      id: "work",
      label: "Work",
      number: "01",
    },
    {
      id: "results",
      label: "Results",
      number: "02",
    },
    {
      id: "client-portal",
      label: "Portal",
      number: "03",
    },
    {
      id: "services",
      label: "Services",
      number: "04",
    },
    {
      id: "contact",
      label: "Contact",
      number: "05",
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 35);
      const sections = [
        "home",
        "work",
        "results",
        "client-portal",
        "services",
        "contact",
      ];
      const current = sections.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
          rect.top <= window.innerHeight * 0.35 &&
          rect.bottom >= window.innerHeight * 0.35
        );
      });
      if (current) {
        setActive(current);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const goTo = (id: string) => {
    setMenuOpen(false);
    if (id === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 90;
    const top =
      element.getBoundingClientRect().top +
      window.scrollY -
      offset;
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };
  return (
    <>
      <motion.nav
        className={`liquid-navbar ${
          scrolled ? "liquid-navbar-scrolled" : ""
        }`}
        initial={{
          opacity: 0,
          y: -30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* LIQUID GLOW */}
        <div className="navbar-liquid-glow" />
        <div className="navbar-inner">
          {/* BRAND */}
          <motion.button
            type="button"
            className="navbar-brand"
            onClick={() => goTo("home")}
            whileHover={{
              scale: 1.025,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span className="navbar-brand-mark">
              <span>M</span>
              <i />
            </span>
            <span className="navbar-brand-name">
              MOMENTUM
            </span>
          </motion.button>
          {/* DESKTOP NAV */}
          <div className="navbar-links">
            {links.map((link, index) => {
              const isActive =
                active === link.id;
              return (
                <motion.button
                  type="button"
                  key={link.id}
                  className={`navbar-link ${
                    isActive
                      ? "navbar-link-active"
                      : ""
                  }`}
                  onClick={() => goTo(link.id)}
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.28 + index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <span className="navbar-link-number">
                    {link.number}
                  </span>
                  <span className="navbar-link-text">
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.span
                      className="navbar-active-pill"
                      layoutId="navbar-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
          {/* CTA */}
          <motion.a
            href="/login"
            className="navbar-portal"
            initial={{
              opacity: 0,
              x: 15,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              scale: 1.025,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span className="navbar-portal-text">
              CLIENT PORTAL
            </span>
            <span className="navbar-portal-arrow">
              ↗
            </span>
            <span className="navbar-portal-shine" />
          </motion.a>
          {/* MOBILE BUTTON */}
          <motion.button
            type="button"
            className={`navbar-mobile-toggle ${
              menuOpen
                ? "navbar-mobile-toggle-open"
                : ""
            }`}
            onClick={() =>
              setMenuOpen((value) => !value)
            }
            whileTap={{
              scale: 0.92,
            }}
          >
            <span />
            <span />
          </motion.button>
        </div>
        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navbar-mobile-menu"
              initial={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -10,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="navbar-mobile-links">
                {links.map((link, index) => (
                  <motion.button
                    type="button"
                    key={link.id}
                    className={
                      active === link.id
                        ? "navbar-mobile-link active"
                        : "navbar-mobile-link"
                    }
                    onClick={() =>
                      goTo(link.id)
                    }
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: 0.08 + index * 0.05,
                    }}
                  >
                    <span>
                      {link.number}
                    </span>
                    <strong>
                      {link.label}
                    </strong>
                    <i>↗</i>
                  </motion.button>
                ))}
              </div>
              <motion.a
                href="/login"
                className="navbar-mobile-portal"
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.3,
                }}
              >
                <div>
                  <span>PRIVATE ACCESS</span>
                  <strong>
                    Enter Client Portal
                  </strong>
                </div>
                <span>↗</span>
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
export default function LandingPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] =
    useState(0);
  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", update);
    update();
    return () => {
      emblaApi.off("select", update);
    };
  }, [emblaApi]);
  return (
    <main className="landing">
      <Cursor />
      {/* NAVBAR */}
{/* NAVBAR */}
<LiquidNavbar />
{/* HERO */}
      {/* HERO */}
<section
  className="hero"
  id="home"
>
        <div className="hero-topline">
          <span>Independent digital agency</span>
          <span>
            Mumbai / India
            <span className="topline-dot">●</span>
            2026
          </span>
        </div>
<ImageCorridor />
        <div className="hero-heading">
          <div className="hero-line">
            WE MAKE
          </div>
          <div className="hero-line hero-line-offset">
            BRANDS
          </div>
          <div className="hero-line">
            <span className="hero-outline">
              MOVE.
            </span>
          </div>
        </div>
        <div className="hero-bottom">
          <p>
            Strategy, creative and performance
            <br />
            built for brands that refuse to stand still.
          </p>
          <a href="#work" className="scroll-link">
            <span className="scroll-circle">↓</span>
            Scroll to explore
          </a>
        </div>
      </section>
<div className="hero-credibility">
  We work with brands investing ₹50k+ per month in growth.
  Fashion, lifestyle, ecommerce, culture.
</div>
      {/* BRANDS */}
{/* BRANDS */}
{/* MOMENTUM ORBITAL SYSTEM */}
<MomentumOrbital />
{/* MANIFESTO */}
{/* MANIFESTO */}
<AgencyManifesto />
{/* MARQUEE */}
{/* SOCIAL PROOF */}

<section className="marquee">
  <div className="marquee-track">
    <span>5.2x ROAS ON ZENIN</span>
    <i>✦</i>

    <span>₹14L REVENUE IN 30 DAYS</span>
    <i>✦</i>

    <span>900+ ORDERS DRIVEN</span>
    <i>✦</i>

    <span>3 BRANDS SCALED IN 2026</span>
    <i>✦</i>

    <span>5.2x ROAS ON ZENIN</span>
    <i>✦</i>

    <span>₹14L REVENUE IN 30 DAYS</span>
    <i>✦</i>

    <span>900+ ORDERS DRIVEN</span>
    <i>✦</i>

    <span>3 BRANDS SCALED IN 2026</span>
    <i>✦</i>
  </div>
</section>
      {/* INTRO */}
      <section className="intro section-space" id="studio">
        <div className="section-number">
          01 / WHO WE ARE
        </div>
        <div className="intro-content">
          <h2>
            We turn attention
            <br />
            <em>into momentum.</em>
          </h2>
          <div className="intro-copy">
            <p>
              Momentum is a digital growth studio
              working with ambitious brands across
              commerce, fashion, lifestyle and culture.
            </p>
            <p>
              We bring strategy, design, technology
              and performance into one system —
              because great brands shouldn't have
              to choose between looking good and
              growing fast.
            </p>
            <a href="#contact" className="text-link">
              Discover the studio
              <span>↗</span>
            </a>
          </div>
        </div>
      </section>
      {/* PEAK PERFORMANCE */}
      <PeakPerformance />
{/* MOMENTUM SYSTEM */}
<MomentumSystem />
      {/* STATEMENT */}
      <section className="statement section-space">
        <div className="statement-small">
          THE DIFFERENCE
        </div>
        <h2>
          Not another
          <br />
          <span>agency.</span>
        </h2>
        <div className="statement-bottom">
          <div className="statement-mark">
            M
          </div>
          <p>
            Small enough to care.
            <br />
            Sharp enough to matter.
            <br />
            Fast enough to move.
          </p>
        </div>
      </section>
<section className="momentum-founder">
  <div className="momentum-founder-card">

    <div className="momentum-founder-copy">
      <span className="momentum-founder-label">
        04 / THE PERSON BEHIND MOMENTUM
      </span>

      <h2>
        BUILD
        <br />
        BETTER.
      </h2>

      <h3>
        DIGITAL
        <br />
        <span>DIFFERENT.</span>
      </h3>

      <p>
        I build high-converting digital experiences for ambitious
        brands — from UI and websites to ecommerce, branding and
        performance systems.
      </p>

      <a
        href="#contact"
        className="momentum-founder-cta"
      >
        <span>START A CONVERSATION</span>
        <span>↗</span>
      </a>

      <div className="momentum-founder-stats">
        <div>
          <strong>UI / UX</strong>
          <span>Digital experiences</span>
        </div>

        <div>
          <strong>WEB</strong>
          <span>Websites & ecommerce</span>
        </div>

        <div>
          <strong>GROWTH</strong>
          <span>Performance systems</span>
        </div>
      </div>
    </div>

    <div className="momentum-founder-visual">
      <img
        src="/images/founder-side.jpeg"
        alt="Momentum founder"
        className="momentum-founder-image"
      />

      <div className="momentum-founder-status">
        <span className="momentum-founder-status-label">
          MOMENTUM / STUDIO
        </span>

        <strong>
          Available
          <br />
          for projects
        </strong>

        <p>
          Building brands, websites and
          growth systems that move.
        </p>

        <a href="#contact" aria-label="Start a conversation">
          ↗
        </a>
      </div>
    </div>

  </div>

  <div className="momentum-founder-bottom">
    <span>UI / UX</span>
    <span>WEBSITES</span>
    <span>ECOMMERCE</span>
    <span>BRANDING</span>
    <span>PERFORMANCE</span>
    <span>GROWTH</span>
  </div>
</section>
      {/* SERVICES */}
      <section
        className="services section-space"
        id="services"
      >
        <div className="section-number">
          03 / WHAT WE DO
        </div>
        <div className="services-list">
          {[
            [
              "01",
              "Brand Strategy",
              "Positioning, identity, creative direction and systems that give brands a reason to be remembered.",
            ],
            [
              "02",
              "Digital Experiences",
              "Websites, ecommerce and interfaces designed to make the journey feel as good as the destination.",
            ],
            [
              "03",
              "Performance",
              "Paid social, acquisition systems, analytics and optimisation built around measurable growth.",
            ],
            [
              "04",
              "Creative",
              "Campaigns, content and visual systems made to stop the scroll and start conversations.",
            ],
          ].map(([number, title, text]) => (
            <motion.div
              className="service-row"
              key={number}
              whileHover={{
                x: 12,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
            >
              <span className="service-number">
                {number}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="service-arrow">
                ↗
              </span>
            </motion.div>
          ))}
        </div>
      </section>
      {/* NUMBERS */}
      <section className="numbers section-space">
        <div className="number-item">
          <strong>01</strong>
          <span>Small team</span>
        </div>
        <div className="number-item">
          <strong>04</strong>
          <span>Core disciplines</span>
        </div>
        <div className="number-item">
          <strong>∞</strong>
          <span>Ideas in progress</span>
        </div>
        <div className="number-item">
          <strong>24/7</strong>
          <span>Curiosity</span>
        </div>
      </section>
      {/* PROCESS */}
      <section className="process section-space">
        <div className="section-number">
          04 / HOW WE MOVE
        </div>
        <div className="process-grid">
          <div className="process-intro">
            <h2>
              Less
              <br />
              <em>process.</em>
              <br />
              More
              <br />
              progress.
            </h2>
          </div>
          <div className="process-list">
            {[
              [
                "01",
                "Understand",
                "We learn the brand, the audience and the problem before touching the pixels.",
              ],
              [
                "02",
                "Build",
                "Strategy becomes identity, experience, creative and campaigns.",
              ],
              [
                "03",
                "Launch",
                "Everything goes live with a clear purpose and a sharper point of view.",
              ],
              [
                "04",
                "Move",
                "We measure, learn and continuously push the work forward.",
              ],
            ].map(([number, title, text]) => (
              <div
                className="process-item"
                key={number}
              >
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CLIENT PORTAL */}
      <section
        className="client-portal"
        id="client-portal"
      >
        <div className="client-portal-noise" />
        <div className="client-portal-top">
          <span>05 / CLIENT EXPERIENCE</span>
          <span>EXCLUSIVE TO MOMENTUM CLIENTS</span>
        </div>
        <div className="client-portal-layout">
          {/* LEFT */}
          <motion.div
            className="client-portal-copy"
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="client-portal-label">
              YOUR BRAND.
              <br />
              YOUR NUMBERS.
              <br />
              <em>YOUR MOMENTUM.</em>
            </div>
            <h2>
              SEE YOUR
              <br />
              <span>GROWTH.</span>
              <br />
              ANYTIME.
            </h2>
            <p>
              Every Momentum client gets their own private
              performance dashboard. See your spend, revenue,
              ROAS, conversions and weekly growth in one place.
            </p>
            <div className="client-portal-perks">
              <div>
                <span>01</span>
                <strong>LIVE PERFORMANCE</strong>
                <small>
                  Your most important numbers, always within reach.
                </small>
              </div>
              <div>
                <span>02</span>
                <strong>WEEKLY REPORTING</strong>
                <small>
                  Track exactly how your brand is moving week after week.
                </small>
              </div>
              <div>
                <span>03</span>
                <strong>ONE PRIVATE PORTAL</strong>
                <small>
                  Everything from Momentum, built around your brand.
                </small>
              </div>
            </div>
            <a
              href="/login"
              className="client-portal-button"
            >
              <span>ENTER YOUR CLIENT PORTAL</span>
              <span>↗</span>
            </a>
            <div className="client-portal-note">
              Private access · Built exclusively for Momentum clients
            </div>
          </motion.div>
          {/* DASHBOARD PREVIEW */}
          <motion.div
            className="client-dashboard-preview"
            initial={{
              opacity: 0,
              y: 80,
              rotateY: -8,
              rotateX: 4,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotateY: 0,
              rotateX: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="client-dashboard-glow" />
            <div className="client-dashboard">
              {/* TOP BAR */}
              <div className="dashboard-preview-top">
                <div className="dashboard-preview-brand">
                  <span>M</span>
                  MOMENTUM
                </div>
                <div className="dashboard-preview-live">
                  <i />
                  LIVE
                </div>
              </div>
              {/* HEADER */}
              <div className="dashboard-preview-header">
                <div>
                  <span>PERFORMANCE / YOUR BRAND</span>
                  <h3>
                    Good evening.
                  </h3>
                </div>
                <div className="dashboard-preview-week">
                  THIS WEEK
                  <span>⌄</span>
                </div>
              </div>
              {/* KPI GRID */}
              <div className="dashboard-preview-kpis">
                <div className="dashboard-preview-kpi">
                  <span>REVENUE</span>
                  <strong>₹9.42L</strong>
                  <small>+18.4%</small>
                </div>
                <div className="dashboard-preview-kpi">
                  <span>AD SPEND</span>
                  <strong>₹2.14L</strong>
                  <small>+6.2%</small>
                </div>
                <div className="dashboard-preview-kpi">
                  <span>ROAS</span>
                  <strong>4.40×</strong>
                  <small>+11.7%</small>
                </div>
                <div className="dashboard-preview-kpi">
                  <span>CONVERSIONS</span>
                  <strong>1,284</strong>
                  <small>+22.1%</small>
                </div>
              </div>
              {/* CHART */}
              <div className="dashboard-preview-chart-card">
                <div className="dashboard-preview-chart-header">
                  <div>
                    <span>REVENUE TREND</span>
                    <strong>₹9,42,000</strong>
                  </div>
                  <span>LAST 7 DAYS</span>
                </div>
                <div className="dashboard-preview-chart">
                  <div className="dashboard-preview-grid">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <svg
                    viewBox="0 0 700 190"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="clientPortalGradient"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#9b2c2c"
                          stopOpacity=".25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#9b2c2c"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="
                        M0 155
                        C45 148 75 138 110 141
                        S175 119 210 127
                        S275 93 320 108
                        S380 76 425 88
                        S475 58 520 69
                        S580 37 615 51
                        S665 24 700 32
                        L700 190
                        L0 190
                        Z
                      "
                      fill="url(#clientPortalGradient)"
                    />
                    <path
                      d="
                        M0 155
                        C45 148 75 138 110 141
                        S175 119 210 127
                        S275 93 320 108
                        S380 76 425 88
                        S475 58 520 69
                        S580 37 615 51
                        S665 24 700 32
                      "
                      fill="none"
                      stroke="#9b2c2c"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="dashboard-preview-days">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                  <span>SAT</span>
                  <span>SUN</span>
                </div>
              </div>
              {/* BOTTOM */}
              <div className="dashboard-preview-bottom">
                <div className="dashboard-preview-performance">
                  <div className="dashboard-preview-title">
                    <span>WEEKLY PERFORMANCE</span>
                    <span>VIEW ALL →</span>
                  </div>
                  <div className="dashboard-preview-line">
                    <span>Revenue</span>
                    <div>
                      <i style={{ width: "84%" }} />
                    </div>
                    <strong>+18%</strong>
                  </div>
                  <div className="dashboard-preview-line">
                    <span>ROAS</span>
                    <div>
                      <i style={{ width: "72%" }} />
                    </div>
                    <strong>+12%</strong>
                  </div>
                  <div className="dashboard-preview-line">
                    <span>Conversions</span>
                    <div>
                      <i style={{ width: "91%" }} />
                    </div>
                    <strong>+22%</strong>
                  </div>
                </div>
                <div className="dashboard-preview-commentary">
                  <span>WEEKLY NOTE</span>
                  <p>
                    Strong week. Revenue continues
                    to move ahead of spend.
                  </p>
                  <small>
                    Momentum team · This week
                  </small>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="client-portal-bottom">
          <span>PRIVATE PERFORMANCE PORTAL</span>
          <span>
            DATA · REPORTING · GROWTH
          </span>
          <span>
            MOMENTUM / 2026
          </span>
        </div>
      </section>
      {/* CONTACT */}
      <section
        className="contact section-space"
        id="contact"
      >
        <div className="contact-top">
          <span>05 / START SOMETHING</span>
          <span>
            AVAILABLE FOR SELECT PROJECTS
          </span>
        </div>
        <div className="contact-title">
          <span>HAVE A</span>
          <span className="contact-outline">
            GOOD
          </span>
          <span>PROBLEM?</span>
        </div>
<div className="contact-bottom">
  <div>
    <p>
      Tell us what you're building,
      <br />
      fixing or dreaming about.
    </p>
  </div>
  <MomentumContactForm />
</div>
      </section>
      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-brand">
          Momentum
        </div>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#studio">Studio</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-bottom">
          <span>
            © 2026 Momentum Studio
          </span>
          <span>
            Mumbai, India
          </span>
          <a href="#">
            Back to top ↑
          </a>
        </div>
      </footer>
    </main>
  )
}
