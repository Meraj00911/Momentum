"use client";

import { motion } from "motion/react";
import { FormEvent, useState } from "react";

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

const budgetOptions = [
  "Under ₹50k",
  "₹50k-2L",
  "₹2L+",
];

const serviceOptions = [
  "Performance",
  "Creative",
  "Branding",
  "Website",
];

export default function MomentumContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    budget: "",
    services: [] as string[],
    message: "",
  });

  function updateField(
    field: "name" | "brand" | "budget" | "message",
    value: string
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function toggleService(service: string) {
    setForm((current) => ({
      ...current,
      services: current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service],
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong."
        );
      }

      setSuccess(true);

      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: "Momentum contact form",
      });

      setForm({
        name: "",
        brand: "",
        budget: "",
        services: [],
        message: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send your message."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     SUCCESS EXPERIENCE
     ========================================================= */

  if (success) {
    return (
      <motion.div
        className="momentum-contact-success"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* BACKGROUND */}

        <div className="momentum-success-noise" />

        {/* GIANT BACKGROUND M */}

        <motion.div
          className="momentum-success-mark"
          initial={{
            opacity: 0,
            scale: 0.72,
            rotate: -8,
            filter: "blur(18px)",
          }}
          animate={{
            opacity: 0.055,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.5,
            delay: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          M
        </motion.div>

        {/* ORBIT 1 */}

        <motion.div
          className="momentum-success-orbit momentum-success-orbit-one"
          initial={{
            opacity: 0,
            scale: 0.5,
            rotate: -25,
          }}
          animate={{
            opacity: 0.2,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.4,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* ORBIT 2 */}

        <motion.div
          className="momentum-success-orbit momentum-success-orbit-two"
          initial={{
            opacity: 0,
            scale: 0.35,
            rotate: 30,
          }}
          animate={{
            opacity: 0.12,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            duration: 1.7,
            delay: 0.25,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        {/* SCANNING LINE */}

        <motion.div
          className="momentum-success-scan"
          initial={{
            top: "-10%",
          }}
          animate={{
            top: "110%",
          }}
          transition={{
            duration: 2.6,
            delay: 0.25,
            ease: "linear",
          }}
        />

        {/* MAIN CONTENT */}

        <div className="momentum-success-content">

          {/* STATUS */}

          <motion.div
            className="momentum-success-kicker"
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="momentum-success-status-dot" />

            <span>
              01 / ENQUIRY RECEIVED
            </span>
          </motion.div>

          {/* LINE */}

          <motion.div
            className="momentum-success-line"
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 0.9,
              delay: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          />

          {/* HEADLINE */}

          <h3 className="momentum-success-title">

            <span className="momentum-success-word">
              {"TRANSMISSION".split("").map(
                (letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 70,
                      filter: "blur(12px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay:
                        0.68 +
                        index * 0.035,
                      duration: 0.65,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  >
                    {letter}
                  </motion.span>
                )
              )}
            </span>

            <span className="momentum-success-word momentum-success-outline">
              {"RECEIVED.".split("").map(
                (letter, index) => (
                  <motion.span
                    key={`${letter}-${index}`}
                    initial={{
                      opacity: 0,
                      y: 70,
                      filter: "blur(12px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      delay:
                        1.05 +
                        index * 0.045,
                      duration: 0.7,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                  >
                    {letter}
                  </motion.span>
                )
              )}
            </span>

          </h3>

          {/* DESCRIPTION */}

          <motion.div
            className="momentum-success-copy"
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.5,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >

            <p>
              Your enquiry has successfully
              <br />
              entered the Momentum system.
            </p>

            <div className="momentum-success-confirmation">

              <span>
                NEXT STEP
              </span>

              <strong>
                WE&apos;LL BE IN TOUCH.
              </strong>

              <small>
                WITHIN 24 HOURS.
              </small>

            </div>

          </motion.div>

          {/* CTA */}

          <motion.button
            type="button"
            className="momentum-success-cta"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 1.85,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              x: 6,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() => {
              setSuccess(false);

              setTimeout(() => {
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: "smooth",
                });
              }, 100);
            }}
          >
            <span>
              SEND ANOTHER ENQUIRY
            </span>

            <span>
              ↗
            </span>
          </motion.button>

        </div>

        {/* FOOTER */}

        <motion.div
          className="momentum-success-footer"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2.1,
            duration: 0.8,
          }}
        >
          <span>
            MESSAGE SECURED
          </span>

          <span>
            ● MOMENTUM / 2026
          </span>
        </motion.div>

      </motion.div>
    );
  }

  /* =========================================================
     CONTACT FORM
     ========================================================= */

  return (
    <form
      className="momentum-contact-form"
      onSubmit={handleSubmit}
    >

      <div className="momentum-form-grid">

        <label>
          <span>
            01 / NAME
          </span>

          <input
            required
            value={form.name}
            onChange={(event) =>
              updateField(
                "name",
                event.target.value
              )
            }
            placeholder="Your name"
          />
        </label>

        <label>
          <span>
            02 / BRAND NAME
          </span>

          <input
            required
            value={form.brand}
            onChange={(event) =>
              updateField(
                "brand",
                event.target.value
              )
            }
            placeholder="Your brand"
          />
        </label>

      </div>

      <label>
        <span>
          03 / MONTHLY AD BUDGET
        </span>

        <select
          required
          value={form.budget}
          onChange={(event) =>
            updateField(
              "budget",
              event.target.value
            )
          }
        >
          <option value="">
            Select your budget
          </option>

          {budgetOptions.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </label>

      <fieldset>

        <legend>
          04 / WHAT DO YOU NEED?
        </legend>

        <div className="momentum-service-options">

          {serviceOptions.map((service) => {

            const selected =
              form.services.includes(service);

            return (
              <button
                key={service}
                type="button"
                className={
                  selected
                    ? "momentum-service-option active"
                    : "momentum-service-option"
                }
                onClick={() =>
                  toggleService(service)
                }
              >

                <span>
                  {selected
                    ? "✓"
                    : "+"}
                </span>

                {service}

              </button>
            );
          })}

        </div>

      </fieldset>

      <label>

        <span>
          05 / MESSAGE
        </span>

        <textarea
          required
          value={form.message}
          onChange={(event) =>
            updateField(
              "message",
              event.target.value
            )
          }
          placeholder="Tell us what you're trying to build, fix or scale."
          rows={5}
        />

      </label>

      {error && (
        <p className="momentum-contact-error">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="momentum-contact-submit"
        disabled={loading}
      >

        <span>
          {loading
            ? "SENDING..."
            : "START A CONVERSATION"}
        </span>

        <span>
          ↗
        </span>

      </button>

    </form>
  );
}