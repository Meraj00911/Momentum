
"use client";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { InView } from "@/components/core/in-view";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Bot,
  Boxes,
  Braces,
  Check,
  Command,
  Cpu,
  Globe2,
  Layers3,
  MousePointer2,
  MoveUpRight,
  Plus,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import "./website-showcase.css";

type WebsiteShowcaseProps = {
  onClose: () => void;
};

const capabilities = [
  {
    number: "01",
    title: "Digital experiences",
    description: "Immersive websites built to make people stop scrolling.",
    icon: Globe2,
    className: "ws-card-web",
    tags: ["Web design", "Development"],
  },
  {
    number: "02",
    title: "Intelligent interfaces",
    description: "AI-powered products with interfaces that feel effortless.",
    icon: Bot,
    className: "ws-card-ai",
    tags: ["AI", "Product design"],
  },
  {
    number: "03",
    title: "Motion systems",
    description: "Purposeful movement, cinematic transitions, real depth.",
    icon: AudioLines,
    className: "ws-card-motion",
    tags: ["3D", "Interaction"],
  },
  {
    number: "04",
    title: "Product ecosystems",
    description: "Connected apps, dashboards, and tools that work as one.",
    icon: Boxes,
    className: "ws-card-product",
    tags: ["Apps", "Systems"],
  },
];

const principles = [
  {
    number: "01",
    title: "Clarity over clutter.",
    description: "Every element earns its place.",
  },
  {
    number: "02",
    title: "Motion with meaning.",
    description: "Interactions should feel intentional.",
  },
  {
    number: "03",
    title: "Built to perform.",
    description: "Beautiful experiences need strong foundations.",
  },
];

const orbParticles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  angle: index * 20,
  distance: 105 + ((index * 19) % 90),
  delay: (index % 7) * -0.7,
  size: index % 4 === 0 ? 5 : 3,
}));

export function WebsiteShowcase({ onClose }: WebsiteShowcaseProps) {
  const [activeCapability, setActiveCapability] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    containScroll: "trimSnaps",
  });

  const rootRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18 });

  const orbRotateX = useTransform(smoothY, [-1, 1], [13, -13]);
  const orbRotateY = useTransform(smoothX, [-1, 1], [-18, 18]);
  const orbShiftX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const orbShiftY = useTransform(smoothY, [-1, 1], [-10, 10]);
  const { scrollYProgress: journeyProgress } = useScroll({
    container: rootRef,
    target: journeyRef,
    offset: ["start start", "end end"],
  });
  const journeyX = useTransform(
    journeyProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["0%", "-66.6667%"]
  );
  const journeyProgressBar = useSpring(journeyProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.25,
  });
  const signalRotate = useTransform(
    journeyProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-14, 10]
  );
  const craftRotate = useTransform(
    journeyProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [12, -8]
  );
  const craftCounterRotate = useTransform(craftRotate, (value) => value * -0.55);
  const buildRotate = useTransform(
    journeyProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-12, 6]
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType === "touch") return;

      const bounds = event.currentTarget.getBoundingClientRect();
      pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
      pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
    },
    [pointerX, pointerY],
  );

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const goNext = () => emblaApi?.scrollNext();
  const goPrevious = () => emblaApi?.scrollPrev();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@momentumagency.in");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:hello@momentumagency.in";
    }
  };

  return (
    <motion.section
      ref={rootRef}
      className={`website-showcase ws-experience${prefersReducedMotion ? " ws-reduced-motion" : ""}`}
      aria-label="Momentum interactive digital studio"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="ws-ambient ws-ambient-a" />
      <div className="ws-ambient ws-ambient-b" />
      <div className="ws-grid" />
      <div className="ws-noise" />

      {/* NAVIGATION */}
      <header className="ws-nav">
        <Link className="ws-logo" href="/" aria-label="Momentum home">
          <span className="ws-logo-mark">M</span>
          <span className="ws-logo-name">MOMENTUM</span>
          <span className="ws-logo-separator" />
          <span className="ws-logo-caption">INDEPENDENT DIGITAL STUDIO</span>
        </Link>

        <nav className="ws-nav-links" aria-label="Showcase navigation">
          <a href="#ws-capabilities">Capabilities</a>
          <a href="#ws-principles">Approach</a>
          <a href="#ws-contact">Contact</a>
        </nav>

        <button
          className="ws-close"
          type="button"
          onClick={onClose}
          aria-label="Close showcase"
        >
          <span>Exit experience</span>
          <X size={16} />
        </button>
      </header>

      {/* HERO */}
      <section className="ws-hero" id="ws-home">
        <div className="ws-hero-copy">
          <motion.div
            className="ws-status"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <span className="ws-status-light" />
            A DIFFERENT KIND OF DIGITAL STUDIO
          </motion.div>

          <motion.h1
            className="ws-hero-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            We make
            <br />
            digital feel
            <br />
            <span className="ws-title-accent">
              <span className="ws-title-italic">alive.</span>
              <span className="ws-title-star">✳</span>
            </span>
          </motion.h1>

          <motion.p
            className="ws-hero-description"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            We bring strategy, standout creative, and performance-minded digital
            experiences together—helping ambitious brands earn attention and
            turn it into momentum.
          </motion.p>

          <motion.div
            className="ws-hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
          >
            <a className="ws-button-primary" href="#ws-contact">
              Build your next move
              <MoveUpRight size={16} />
            </a>

            <a className="ws-button-text" href="#ws-capabilities">
              Explore our capabilities
              <ArrowDownRight size={17} />
            </a>
          </motion.div>

          <motion.div
            className="ws-hero-footnote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span className="ws-footnote-line" />
            <span>BRAND / COMMERCE / DIGITAL GROWTH</span>
          </motion.div>
        </div>

        {/* INTERACTIVE 3D-STYLE BOT / ORB */}
        <div className="ws-orb-stage">
          <div className="ws-orb-label ws-orb-label-top">
            <span className="ws-label-index">01</span>
            <span>INTERACTIVE INTELLIGENCE</span>
          </div>

          <motion.div
            className="ws-orb-scene"
            style={{
              x: orbShiftX,
              y: orbShiftY,
              rotateX: orbRotateX,
              rotateY: orbRotateY,
            }}
          >
            <div className="ws-orb-halo ws-halo-outer" />
            <div className="ws-orb-halo ws-halo-inner" />

            <div className="ws-orb-ring ws-ring-a" />
            <div className="ws-orb-ring ws-ring-b" />
            <div className="ws-orb-ring ws-ring-c" />

            <div className="ws-orb">
              <div className="ws-orb-shine" />
              <div className="ws-orb-core" />
              <div className="ws-orb-glass" />
              <div className="ws-orb-glint" />
              <div className="ws-orb-symbol">
                <Command size={46} strokeWidth={1.2} />
              </div>
            </div>

            <div className="ws-orb-satellite ws-satellite-a">
              <Bot size={18} />
            </div>
            <div className="ws-orb-satellite ws-satellite-b">
              <Cpu size={18} />
            </div>
            <div className="ws-orb-satellite ws-satellite-c">
              <Braces size={17} />
            </div>

            {orbParticles.map((particle) => (
              <span
                key={particle.id}
                className="ws-particle"
                style={
                  {
                    "--particle-angle": `${particle.angle}deg`,
                    "--particle-distance": `${particle.distance}px`,
                    "--particle-delay": `${particle.delay}s`,
                    "--particle-size": `${particle.size}px`,
                  } as React.CSSProperties
                }
              />
            ))}
          </motion.div>

          <div className="ws-orb-callout ws-orb-callout-left">
            <span className="ws-callout-pulse" />
            <span>
              <strong>Curiosity, engineered.</strong>
              <small>Ideas into experiences</small>
            </span>
          </div>

          <div className="ws-orb-callout ws-orb-callout-right">
            <Sparkles size={16} />
            <span>
              <strong>Beyond the ordinary</strong>
              <small>Move your cursor around</small>
            </span>
          </div>

          <div className="ws-orb-label ws-orb-label-bottom">
            <span>DESIGN</span>
            <span className="ws-label-dot" />
            <span>TECHNOLOGY</span>
            <span className="ws-label-dot" />
            <span>IMAGINATION</span>
          </div>
        </div>

        <div className="ws-hero-index">
          <span>01</span>
          <span className="ws-index-rule" />
          <span>04</span>
        </div>
      </section>

      {/* TICKER */}
      <div className="ws-ticker" aria-label="Our disciplines">
        <div className="ws-ticker-track">
          {Array.from({ length: 2 }).map((_, group) => (
            <div className="ws-ticker-group" key={group}>
              {[
                "DIGITAL DESIGN",
                "CREATIVE DEVELOPMENT",
                "INTERACTIVE 3D",
                "PRODUCT THINKING",
                "MOTION SYSTEMS",
                "AI EXPERIENCES",
              ].map((item) => (
                <span className="ws-ticker-item" key={item}>
                  {item}
                  <span>✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* PINNED SCROLL STORY */}
      <section
        className="ws-journey"
        ref={journeyRef}
        aria-label="How Momentum turns an idea into an experience"
      >
        <div className="ws-journey-sticky">
          <div className="ws-journey-heading">
            <div>
              <span className="ws-section-kicker"><span>SCROLL TO MOVE</span> / THE MOMENTUM METHOD</span>
              <p>One thought becomes a world people can feel.</p>
            </div>
            <div className="ws-journey-counter" aria-hidden="true">
              <span>01</span><i /><span>03</span>
            </div>
          </div>

          <motion.div className="ws-journey-progress">
            <motion.span style={{ scaleX: journeyProgressBar }} />
          </motion.div>

          <motion.div className="ws-journey-track" style={{ x: journeyX }}>
            <article className="ws-journey-panel ws-journey-signal">
              <div className="ws-journey-copy">
                <span className="ws-journey-index">01 — FIND THE SIGNAL</span>
                <h2>Start with<br /><em>what matters.</em></h2>
                <p>We turn the noise into a clear point of view, then give the idea room to become something unexpected.</p>
                <span className="ws-journey-note"><span /> STRATEGY / POSITIONING / POSSIBILITY</span>
              </div>
              <div className="ws-journey-art ws-signal-art">
                <motion.div className="ws-signal-orbit orbit-a" style={{ rotate: signalRotate }} />
                <motion.div className="ws-signal-orbit orbit-b" style={{ rotate: signalRotate }} />
                <div className="ws-signal-core"><Sparkles size={28} /><span>THE<br />SIGNAL</span></div>
                <span className="ws-signal-chip chip-a">A point of view</span>
                <span className="ws-signal-chip chip-b">A reason to care</span>
                <span className="ws-signal-chip chip-c">A little tension</span>
                <div className="ws-signal-scan" />
              </div>
            </article>

            <article className="ws-journey-panel ws-journey-craft">
              <div className="ws-journey-copy">
                <span className="ws-journey-index">02 — GIVE IT A FORM</span>
                <h2>Make the<br /><em>feeling visible.</em></h2>
                <p>Identity, interface, and motion work as one system. Every detail builds recognition before a word is read.</p>
                <span className="ws-journey-note"><span /> DESIGN / SYSTEMS / MOTION</span>
              </div>
              <div className="ws-journey-art ws-craft-art">
                <motion.div className="ws-craft-card craft-back" style={{ rotate: craftRotate }}>
                  <span>FORM STUDY / 02</span><strong>MAKE<br />A MARK.</strong><i>◌</i>
                </motion.div>
                <motion.div className="ws-craft-card craft-front" style={{ rotate: craftCounterRotate }}>
                  <div className="ws-craft-orb"><span /></div>
                  <span>IDENTITY IN MOTION</span><strong>Distinct<br />by design.</strong>
                  <i>✳</i>
                </motion.div>
                <span className="ws-craft-coordinate">FIG. 02 / A SYSTEM WITH A PULSE</span>
              </div>
            </article>

            <article className="ws-journey-panel ws-journey-build">
              <div className="ws-journey-copy">
                <span className="ws-journey-index">03 — BRING IT TO LIFE</span>
                <h2>Built to move<br /><em>people forward.</em></h2>
                <p>We bring the whole experience together: fast, considered, and ready to keep evolving after launch.</p>
                <a className="ws-journey-cta" href="#ws-contact">MAKE SOMETHING MOVE <ArrowUpRight size={16} /></a>
              </div>
              <div className="ws-journey-art ws-build-art">
                <motion.div className="ws-build-window" style={{ rotate: buildRotate }}>
                  <div className="ws-build-window-top"><i /><i /><i /><span>MOMENTUM / LIVE SYSTEM</span><b>↗</b></div>
                  <div className="ws-build-window-body">
                    <div><span>01 / EXPERIENCE</span><strong>Made to<br />mean more.</strong><small>DESIGN × ENGINEERING × MOMENTUM</small></div>
                    <div className="ws-build-visual"><span /><i /><b>✳</b></div>
                  </div>
                  <div className="ws-build-window-bottom"><span>READY FOR WHAT’S NEXT</span><span>STATUS <b>●</b> ACTIVE</span></div>
                </motion.div>
                <div className="ws-build-trail trail-one" />
                <div className="ws-build-trail trail-two" />
                <span className="ws-build-stamp">IDEA<br />→ IMPACT</span>
              </div>
            </article>
          </motion.div>
          <span className="ws-journey-scroll-hint"><ArrowDown size={13} /> KEEP SCROLLING</span>
        </div>
      </section>

      {/* CAPABILITIES */}
<InView
  as="section"
  className="ws-capabilities ws-section"
  variants={{
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  viewOptions={{ once: true, amount: 0.1 }}
>
        <div className="ws-section-heading">
          <div>
            <span className="ws-section-kicker">
              <span>01</span> BUILT AROUND YOUR NEXT MOVE
            </span>
            <h2>
              More than a website.
              <br />
              <span>A sharper way forward.</span>
            </h2>
          </div>

          <p>
            We combine the disciplines that make digital products
            distinctive, useful, and impossible to confuse with anything else.
          </p>
        </div>

        <div className="ws-capability-grid">
          {capabilities.map((item, index) => {
            const active = activeCapability === index;

            return (
              <motion.button
                type="button"
                key={item.number}
                className={`ws-capability-card ${item.className} ${
                  active ? "is-selected" : ""
                }`}
                onMouseEnter={() => setActiveCapability(index)}
                onFocus={() => setActiveCapability(index)}
                onClick={() => setActiveCapability(index)}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                aria-pressed={active}
              >
                <div className="ws-card-topline">
                  <span>{item.number} / CAPABILITY</span>
                  <ArrowUpRight size={17} />
                </div>

                <div className="ws-card-art" aria-hidden="true">
                  {index === 0 && (
                    <div className="ws-art-browser">
                      <div className="ws-art-browser-top">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="ws-art-browser-body">
                        <div className="ws-art-lines">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="ws-art-block" />
                      </div>
                      <div className="ws-art-cursor">
                        <MousePointer2 size={21} />
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="ws-art-ai">
                      <div className="ws-art-ai-ring" />
                      <div className="ws-art-ai-core">
                        <Bot size={43} strokeWidth={1.1} />
                      </div>
                      <span className="ws-art-ai-node node-a" />
                      <span className="ws-art-ai-node node-b" />
                      <span className="ws-art-ai-node node-c" />
                    </div>
                  )}

                  {index === 2 && (
                    <div className="ws-art-wave">
                      {Array.from({ length: 13 }).map((_, i) => (
                        <span key={i} style={{ "--wave-i": i } as React.CSSProperties} />
                      ))}
                    </div>
                  )}

                  {index === 3 && (
                    <div className="ws-art-ecosystem">
                      <div className="ws-eco-center">
                        <Layers3 size={27} />
                      </div>
                      <div className="ws-eco-node eco-a"><Globe2 size={17} /></div>
                      <div className="ws-eco-node eco-b"><Cpu size={17} /></div>
                      <div className="ws-eco-node eco-c"><Boxes size={17} /></div>
                      <div className="ws-eco-line eco-line-a" />
                      <div className="ws-eco-line eco-line-b" />
                      <div className="ws-eco-line eco-line-c" />
                    </div>
                  )}
                </div>

                <div className="ws-card-content">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="ws-card-plus">
                    {active ? <Check size={16} /> : <Plus size={16} />}
                  </span>
                </div>

                <div className="ws-card-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="ws-capability-detail"
            key={activeCapability}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="ws-detail-marker">
              <Zap size={14} />
            </span>
            <span>
              Selected: <strong>{capabilities[activeCapability].title}</strong>
            </span>
            <span className="ws-detail-hint">
              Explore a capability to preview its visual language.
            </span>
          </motion.div>
        </AnimatePresence>
  </InView>

      {/* INTERACTIVE COMPONENT PLAYGROUND */}
      <section className="ws-playground ws-section" id="ws-playground">
        <div className="ws-section-heading ws-playground-heading">
          <div>
            <span className="ws-section-kicker">
              <span>02</span> THE INTERACTION LAB
            </span>
            <h2>
              Small details.
              <br />
              <span>Big difference.</span>
            </h2>
          </div>

          <p>
            Interfaces should respond, react, and reward curiosity.
            Try the controls below.
          </p>
        </div>

        <div className="ws-lab-grid">
          <div className="ws-lab-panel ws-lab-panel-large">
            <div className="ws-panel-header">
              <div>
                <span className="ws-panel-eyebrow">COMPONENT 001</span>
                <h3>Magnetic interface</h3>
              </div>
              <span className="ws-panel-status">INTERACTIVE</span>
            </div>

            <div className="ws-magnetic-stage">
              <motion.a
                href="#ws-contact"
                className="ws-magnetic-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onMouseMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  const x = event.clientX - rect.left - rect.width / 2;
                  const y = event.clientY - rect.top - rect.height / 2;
                  event.currentTarget.style.setProperty("--mx", `${x * 0.2}px`);
                  event.currentTarget.style.setProperty("--my", `${y * 0.2}px`);
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.setProperty("--mx", "0px");
                  event.currentTarget.style.setProperty("--my", "0px");
                }}
              >
                <span>Move with intent</span>
                <MoveUpRight size={18} />
              </motion.a>

              <div className="ws-magnetic-rings">
                <span />
                <span />
                <span />
              </div>
            </div>

            <div className="ws-panel-footer">
              <span>CURSOR-RESPONSIVE MOVEMENT</span>
              <MousePointer2 size={14} />
            </div>
          </div>

          <div className="ws-lab-panel ws-lab-panel-small">
            <div className="ws-panel-header">
              <div>
                <span className="ws-panel-eyebrow">COMPONENT 002</span>
                <h3>Signal generator</h3>
              </div>
              <AudioLines size={17} />
            </div>

            <div className="ws-signal-visual" aria-hidden="true">
              {Array.from({ length: 27 }).map((_, i) => (
                <span
                  key={i}
                  style={{ "--signal-i": i } as React.CSSProperties}
                />
              ))}
            </div>

            <button
              type="button"
              className={`ws-signal-toggle ${soundOn ? "is-on" : ""}`}
              onClick={() => setSoundOn((current) => !current)}
              aria-pressed={soundOn}
            >
              <span className="ws-signal-toggle-dot" />
              {soundOn ? "Signal active" : "Activate visual signal"}
              <ArrowUpRight size={14} />
            </button>
            <p className="ws-panel-note">
              An animated visual state, without autoplaying audio.
            </p>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="ws-approach ws-section" id="ws-principles">
        <div className="ws-approach-intro">
          <span className="ws-section-kicker">
            <span>03</span> HOW WE THINK
          </span>
          <h2>
            Built on
            <br />
            <span>better questions.</span>
          </h2>
          <p>
            Great digital work is not decoration. It is the result of asking
            the right questions, making deliberate decisions, and caring about
            the experience all the way through.
          </p>
          <a className="ws-inline-link" href="#ws-contact">
            Our next chapter starts here <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="ws-principle-list">
          {principles.map((principle) => (
            <motion.div
              className="ws-principle"
              key={principle.number}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="ws-principle-number">{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
              <ArrowUpRight size={18} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* EMBLA CAROUSEL */}
      <section className="ws-experiments ws-section" id="ws-experiments">
        <div className="ws-section-heading">
          <div>
            <span className="ws-section-kicker">
              <span>04</span> SELECTED BRAND WORLDS
            </span>
            <h2>
              Different brands.
              <br />
              <span>Distinct by design.</span>
            </h2>
          </div>

          <div className="ws-carousel-actions">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous project"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next project"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="ws-carousel-viewport" ref={emblaRef}>
          <div className="ws-carousel-track">
            <article className="ws-concept-card ws-concept-one">
              <div className="ws-concept-art">
                <div className="ws-concept-sphere" />
                <div className="ws-concept-ring ring-one" />
                <div className="ws-concept-ring ring-two" />
                <span className="ws-concept-coordinate">X 042.8 / Y 091.2</span>
              </div>
              <div className="ws-concept-meta">
                <div>
                  <span>01 / D2C · PERFORMANCE</span>
                  <h3>ZENIN</h3>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <p>Anime culture translated into a distinct digital commerce experience.</p>
            </article>

            <article className="ws-concept-card ws-concept-two">
              <div className="ws-concept-art">
                <div className="ws-concept-dashboard">
                  <div className="ws-dashboard-top">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="ws-dashboard-content">
                    <div className="ws-dashboard-stat">
                      <small>Commerce, with character</small>
                      <strong>QUIRKS</strong>
                      <i />
                    </div>
                    <div className="ws-dashboard-chart">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} style={{ "--bar-i": i } as React.CSSProperties} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ws-concept-meta">
                <div>
                  <span>02 / BRAND · E-COMMERCE</span>
                  <h3>QUIRKS</h3>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <p>A visual language built around movement, attitude, and everyday wear.</p>
            </article>

            <article className="ws-concept-card ws-concept-three">
              <div className="ws-concept-art">
                <div className="ws-type-art">
                  <span>Make</span>
                  <span className="ws-type-outline">WAVES</span>
                  <span className="ws-type-small">NOT NOISE.</span>
                </div>
                <div className="ws-type-cross">✳</div>
              </div>
              <div className="ws-concept-meta">
                <div>
                  <span>03 / LUXURY · JEWELLERY</span>
                  <h3>KAVISHAE</h3>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <p>A restrained digital experience shaped around elegance and product.</p>
            </article>

            <article className="ws-concept-card ws-concept-four">
              <div className="ws-concept-art">
                <div className="ws-code-window">
                  <div className="ws-code-top">
                    <span />
                    <span />
                    <span />
                  </div>
                  <pre>
                    <span>const</span> future = {"{"}
                    {"\n"}  design: <i>&quot;human&quot;</i>,
                    {"\n"}  motion: <i>&quot;fluid&quot;</i>,
                    {"\n"}  impact: <i>&quot;real&quot;</i>
                    {"\n"}{"}"};
                  </pre>
                  <div className="ws-code-cursor" />
                </div>
              </div>
              <div className="ws-concept-meta">
                <div>
                  <span>04 / COMMERCE · BRAND</span>
                  <h3>SHOPRIVA</h3>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <p>A premium shopping experience built from the ground up.</p>
            </article>
          </div>
        </div>

        <div className="ws-carousel-caption">
          <span>FOUR BRANDS. FOUR DISTINCT WORLDS.</span>
          <span>DRAG TO EXPLORE ↔</span>
        </div>
      </section>

      {/* CONTACT */}
      <section className="ws-contact ws-section" id="ws-contact">
        <div className="ws-contact-orb" />
        <div className="ws-contact-content">
          <span className="ws-section-kicker">
            <span>05</span> YOUR MOVE
          </span>
          <h2>
            Have a big
            <br />
            <span>idea?</span> Good.
          </h2>
          <p>
            Bring us the ambition. We&apos;ll bring the strategy, creative, and
            digital craft to move it forward.
          </p>

          <a
            className="ws-contact-button"
            href="mailto:hello@momentumagency.in?subject=Let%E2%80%99s%20build%20something"
          >
            Let&apos;s talk about your next move <MoveUpRight size={17} />
          </a>

          <button className="ws-contact-copy" type="button" onClick={copyEmail}>
            {copied ? <>Email copied <Check size={13} /></> : "hello@momentumagency.in · copy email"}
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ws-footer">
        <a className="ws-footer-brand" href="#ws-home">
          <span className="ws-logo-mark">M</span>
          MOMENTUM
        </a>
        <span>MADE FOR WHAT&apos;S NEXT.</span>
        <button type="button" onClick={onClose}>
          Back to site <ArrowUpRight size={14} />
        </button>
      </footer>

      <a className="ws-back-top" href="#ws-home" aria-label="Back to top">
        <ArrowDown size={15} />
      </a>
    </motion.section>
  );
}
