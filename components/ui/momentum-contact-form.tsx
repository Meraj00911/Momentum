"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";

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

  if (success) {
    return (
      <motion.div
        className="momentum-contact-success"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="momentum-contact-success-number">
          01 / RECEIVED
        </span>

        <h3>
          WE&apos;LL BE
          <br />
          IN TOUCH.
        </h3>

        <p>
          Your enquiry has reached Momentum.
          <br />
          We&apos;ll get back to you shortly.
        </p>

        <button
          type="button"
          onClick={() => setSuccess(false)}
        >
          SEND ANOTHER ENQUIRY ↗
        </button>
      </motion.div>
    );
  }

  return (
    <form
      className="momentum-contact-form"
      onSubmit={handleSubmit}
    >
      <div className="momentum-form-grid">
        <label>
          <span>01 / NAME</span>

          <input
            required
            value={form.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            placeholder="Your name"
          />
        </label>

        <label>
          <span>02 / BRAND NAME</span>

          <input
            required
            value={form.brand}
            onChange={(event) =>
              updateField("brand", event.target.value)
            }
            placeholder="Your brand"
          />
        </label>
      </div>

      <label>
        <span>03 / MONTHLY AD BUDGET</span>

        <select
          required
          value={form.budget}
          onChange={(event) =>
            updateField("budget", event.target.value)
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
        <legend>04 / WHAT DO YOU NEED?</legend>

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
                  {selected ? "✓" : "+"}
                </span>

                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label>
        <span>05 / MESSAGE</span>

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

        <span>↗</span>
      </button>
    </form>
  );
}