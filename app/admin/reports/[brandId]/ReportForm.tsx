"use client";

import { FormEvent, useState } from "react";
import "./report-form.css";

type Report = {
  id: string;
  week_start: string;
  week_end: string;
  spend: number;
  revenue: number;
  roas: number;
  cpc: number;
  ctr: number;
  conversions: number;
  commentary: string | null;
};

type Props = {
  brandId: string;
  report?: Report | null;
  saveAction: (formData: FormData) => void;
};

export default function ReportForm({
  brandId,
  report,
  saveAction,
}: Props) {
  const [spend, setSpend] = useState(
    report?.spend?.toString() || ""
  );

  const [revenue, setRevenue] = useState(
    report?.revenue?.toString() || ""
  );

  const [saving, setSaving] = useState(false);

  const calculatedRoas =
    Number(spend) > 0
      ? Number(revenue) / Number(spend)
      : 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    setSaving(true);
  }

  return (
    <form
      action={saveAction}
      onSubmit={handleSubmit}
      className="report-form"
    >
      <input
        type="hidden"
        name="brandId"
        value={brandId}
      />

      {report && (
        <input
          type="hidden"
          name="reportId"
          value={report.id}
        />
      )}

      {/* WEEK */}

      <div className="report-section">
        <div className="report-section-heading">
          <span>01</span>
          <strong>Reporting period</strong>
        </div>

        <div className="report-grid-two">

          <div className="report-field">
            <label htmlFor="weekStart">
              Week start
            </label>

            <input
              id="weekStart"
              name="weekStart"
              type="date"
              defaultValue={report?.week_start || ""}
              required
            />
          </div>

          <div className="report-field">
            <label htmlFor="weekEnd">
              Week end
            </label>

            <input
              id="weekEnd"
              name="weekEnd"
              type="date"
              defaultValue={report?.week_end || ""}
              required
            />
          </div>

        </div>
      </div>

      {/* CORE PERFORMANCE */}

      <div className="report-section">
        <div className="report-section-heading">
          <span>02</span>
          <strong>Core performance</strong>
        </div>

        <div className="report-grid-two">

          <div className="report-field">
            <label htmlFor="spend">
              Total spend
            </label>

            <div className="report-input-prefix">
              <span>₹</span>

              <input
                id="spend"
                name="spend"
                type="number"
                step="0.01"
                min="0"
                value={spend}
                onChange={(event) =>
                  setSpend(event.target.value)
                }
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="report-field">
            <label htmlFor="revenue">
              Revenue
            </label>

            <div className="report-input-prefix">
              <span>₹</span>

              <input
                id="revenue"
                name="revenue"
                type="number"
                step="0.01"
                min="0"
                value={revenue}
                onChange={(event) =>
                  setRevenue(event.target.value)
                }
                placeholder="0"
                required
              />
            </div>
          </div>

        </div>

        {/* ROAS */}

        <div className="roas-preview">
          <div>
            <span>ROAS</span>

            <strong>
              {calculatedRoas.toFixed(2)}x
            </strong>
          </div>

          <p>
            Automatically calculated from revenue ÷ spend
          </p>
        </div>
      </div>

      {/* ACQUISITION */}

      <div className="report-section">
        <div className="report-section-heading">
          <span>03</span>
          <strong>Acquisition</strong>
        </div>

        <div className="report-grid-three">

          <div className="report-field">
            <label htmlFor="cpc">
              CPC
            </label>

            <div className="report-input-prefix">
              <span>₹</span>

              <input
                id="cpc"
                name="cpc"
                type="number"
                step="0.01"
                min="0"
                defaultValue={report?.cpc ?? ""}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="report-field">
            <label htmlFor="ctr">
              CTR
            </label>

            <div className="report-input-suffix">
              <input
                id="ctr"
                name="ctr"
                type="number"
                step="0.01"
                min="0"
                defaultValue={report?.ctr ?? ""}
                placeholder="0"
                required
              />

              <span>%</span>
            </div>
          </div>

          <div className="report-field">
            <label htmlFor="conversions">
              Conversions
            </label>

            <input
              id="conversions"
              name="conversions"
              type="number"
              min="0"
              defaultValue={report?.conversions ?? ""}
              placeholder="0"
              required
            />
          </div>

        </div>
      </div>

      {/* COMMENTARY */}

      <div className="report-section">
        <div className="report-section-heading">
          <span>04</span>
          <strong>Weekly commentary</strong>
        </div>

        <div className="report-field">
          <label htmlFor="commentary">
            What happened this week?
          </label>

          <textarea
            id="commentary"
            name="commentary"
            rows={5}
            defaultValue={report?.commentary || ""}
            placeholder="Write a short summary of this week's performance..."
          />
        </div>
      </div>

      {/* SAVE */}

      <button
        type="submit"
        disabled={saving}
        className="report-save-button"
      >
        <span>
          {saving
            ? "Saving report..."
            : report
              ? "Update report"
              : "Save report"}
        </span>

        {!saving && <span>→</span>}
      </button>

    </form>
  );
}