"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Brush,
  Code2,
  Globe2,
  Layers3,
  Megaphone,
  PenTool,
  Sparkles,
  Zap,
} from "lucide-react";

type OrbitalItem = {
  id: number;
  title: string;
  label: string;
  description: string;
  icon: React.ElementType;
  relatedIds: number[];
};

const items: OrbitalItem[] = [
  {
    id: 1,
    title: "STRATEGY",
    label: "01 / DIRECTION",
    description:
      "Finding the angle, audience and direction that gives the brand somewhere worth moving.",
    icon: Sparkles,
    relatedIds: [2, 3],
  },
  {
    id: 2,
    title: "BRANDING",
    label: "02 / IDENTITY",
    description:
      "Building identities that make brands recognisable, distinctive and impossible to confuse.",
    icon: PenTool,
    relatedIds: [1, 3, 4],
  },
  {
    id: 3,
    title: "CREATIVE",
    label: "03 / ATTENTION",
    description:
      "Campaigns and creative systems designed to stop the scroll and create demand.",
    icon: Brush,
    relatedIds: [1, 2, 5],
  },
  {
    id: 4,
    title: "WEBSITES",
    label: "04 / DIGITAL",
    description:
      "High-end digital experiences engineered around speed, interaction and conversion.",
    icon: Code2,
    relatedIds: [2, 5, 6],
  },
  {
    id: 5,
    title: "ECOMMERCE",
    label: "05 / COMMERCE",
    description:
      "Product journeys built around discovery, trust and turning attention into orders.",
    icon: Layers3,
    relatedIds: [3, 4, 7],
  },
  {
    id: 6,
    title: "PERFORMANCE",
    label: "06 / GROWTH",
    description:
      "Paid acquisition systems where creative meets measurable business growth.",
    icon: BarChart3,
    relatedIds: [4, 5, 7],
  },
  {
    id: 7,
    title: "DIGITAL",
    label: "07 / SYSTEMS",
    description:
      "The technology, experiences and systems that keep a brand moving.",
    icon: Globe2,
    relatedIds: [4, 5, 6],
  },
  {
    id: 8,
    title: "GROWTH",
    label: "08 / MOMENTUM",
    description:
      "Connecting every part of the system so the work compounds instead of standing still.",
    icon: Zap,
    relatedIds: [1, 5, 6],
  },
  {
    id: 9,
    title: "CAMPAIGNS",
    label: "09 / IMPACT",
    description:
      "Big ideas translated into campaigns that create attention, movement and measurable response.",
    icon: Megaphone,
    relatedIds: [2, 3, 6],
  },
];

export default function MomentumOrbital() {
  const [rotation, setRotation] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);

  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeId !== null) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      setRotation((value) => (value + delta * 0.012) % 360);

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      lastTimeRef.current = null;
    };
  }, [activeId]);

  const activeItem = items.find((item) => item.id === activeId);

  const selectItem = (id: number) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section className="momentum-orbital">
      <div className="momentum-orbital-inner">
        <div className="momentum-orbital-heading">
          <div>
            <span className="section-number">02 / THE MOMENTUM SYSTEM</span>

            <h2>
              Everything
              <br />
              <em>moves together.</em>
            </h2>
          </div>

          <p>
            Strategy, creative, technology
            <br />
            and performance connected
            <br />
            as one growth system.
          </p>
        </div>

        <div
          className={`momentum-orbit-stage ${
            activeId ? "has-active" : ""
          }`}
        >
          <div className="momentum-orbit-grid" />

          <div className="momentum-orbit-ring momentum-orbit-ring-one" />
          <div className="momentum-orbit-ring momentum-orbit-ring-two" />
          <div className="momentum-orbit-ring momentum-orbit-ring-three" />

          <div className="momentum-orbit-center">
            <div className="momentum-orbit-center-ring" />
            <div className="momentum-orbit-center-ring ring-two" />

            <div className="momentum-orbit-center-core">
              <span>MOMENTUM</span>
              <strong>{activeItem ? activeItem.title : "MOVE"}</strong>
              <small>
                {activeItem
                  ? activeItem.label
                  : "BRAND → DIGITAL → PERFORMANCE"}
              </small>
            </div>
          </div>

          <div
            className="momentum-orbit-nodes"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {items.map((item, index) => {
              const angle = (index / items.length) * Math.PI * 2;
              const radius = 250;

              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isActive = activeId === item.id;
              const isRelated =
                activeId !== null &&
                items
                  .find((active) => active.id === activeId)
                  ?.relatedIds.includes(item.id);

              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`momentum-orbit-node ${
                    isActive ? "is-active" : ""
                  } ${isRelated ? "is-related" : ""}`}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${-rotation}deg)`,
                  }}
                  onClick={() => selectItem(item.id)}
                  aria-label={`Open ${item.title}`}
                >
                  <span className="momentum-orbit-node-glow" />

                  <span className="momentum-orbit-node-icon">
                    <Icon size={15} strokeWidth={1.7} />
                  </span>

                  <span className="momentum-orbit-node-title">
                    {item.title}
                  </span>

                  <span className="momentum-orbit-node-number">
                    {String(item.id).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="momentum-orbit-lines">
            {items.map((item) => {
              const isRelated =
                activeId !== null &&
                items
                  .find((active) => active.id === activeId)
                  ?.relatedIds.includes(item.id);

              return (
                <span
                  key={item.id}
                  className={isRelated ? "is-related" : ""}
                  style={{
                    transform: `rotate(${
                      ((item.id - 1) / items.length) * 360
                    }deg)`,
                  }}
                />
              );
            })}
          </div>

          {activeItem && (
            <div className="momentum-orbit-detail">
              <div className="momentum-orbit-detail-top">
                <span>{activeItem.label}</span>

                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <h3>{activeItem.title}</h3>

              <p>{activeItem.description}</p>

              <div className="momentum-orbit-detail-bottom">
                <span>CONNECTED SYSTEM</span>
                <ArrowRight size={14} />
              </div>
            </div>
          )}
        </div>

        <div className="momentum-orbital-footer">
          <span>ONE STUDIO</span>
          <span>BRAND → DIGITAL → PERFORMANCE</span>
          <span>ALWAYS MOVING ↗</span>
        </div>
      </div>
    </section>
  );
}