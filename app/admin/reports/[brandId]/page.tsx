import "./reports.css";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import ReportForm from "./ReportForm";
import DeleteReportButton from "./DeleteReportButton";

type Props = {
  params: Promise<{
    brandId: string;
  }>;

  searchParams: Promise<{
    edit?: string;
    monthlyEdit?: string;
  }>;
};

/* =========================================================
   WEEKLY REPORT — SAVE
========================================================= */

async function saveReport(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const brandId = String(formData.get("brandId"));
  const reportId = String(formData.get("reportId") || "");

  const weekStart = String(formData.get("weekStart"));
  const weekEnd = String(formData.get("weekEnd"));

  const spend = Number(formData.get("spend") || 0);
  const revenue = Number(formData.get("revenue") || 0);
  const cpc = Number(formData.get("cpc") || 0);
  const ctr = Number(formData.get("ctr") || 0);

  const conversions = Number(
    formData.get("conversions") || 0
  );

  const commentary = String(
    formData.get("commentary") || ""
  );

  const roas =
    spend > 0
      ? Number((revenue / spend).toFixed(2))
      : 0;

  const reportData = {
    brand_id: brandId,
    week_start: weekStart,
    week_end: weekEnd,
    spend,
    revenue,
    roas,
    cpc,
    ctr,
    conversions,
    commentary,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (reportId) {
    const result = await supabase
      .from("weekly_metrics")
      .update(reportData)
      .eq("id", reportId);

    error = result.error;
  } else {
    const result = await supabase
      .from("weekly_metrics")
      .upsert(reportData, {
        onConflict: "brand_id,week_start,week_end",
      });

    error = result.error;
  }

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/reports/${brandId}`);
  revalidatePath("/");
}

/* =========================================================
   WEEKLY REPORT — DELETE
========================================================= */

async function deleteReport(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const reportId = String(
    formData.get("reportId") || ""
  );

  const brandId = String(
    formData.get("brandId") || ""
  );

  if (!reportId || !brandId) {
    throw new Error("Missing report information.");
  }

  const { error } = await supabase
    .from("weekly_metrics")
    .delete()
    .eq("id", reportId)
    .eq("brand_id", brandId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/reports/${brandId}`);
  revalidatePath("/dashboard");
  revalidatePath("/");
}

/* =========================================================
   MONTHLY REPORT — SAVE
========================================================= */

async function saveMonthlyReport(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const brandId = String(formData.get("brandId"));
  const reportId = String(
    formData.get("monthlyReportId") || ""
  );

  const monthStart = String(
    formData.get("monthStart") || ""
  );

  const spend = Number(formData.get("monthlySpend") || 0);
  const revenue = Number(
    formData.get("monthlyRevenue") || 0
  );

  const conversions = Number(
    formData.get("monthlyConversions") || 0
  );

  const cpc = Number(
    formData.get("monthlyCpc") || 0
  );

  const ctr = Number(
    formData.get("monthlyCtr") || 0
  );

  const commentary = String(
    formData.get("monthlyCommentary") || ""
  );

  if (!brandId || !monthStart) {
    throw new Error("Month and brand are required.");
  }

  const reportData = {
    brand_id: brandId,
    month_start: monthStart,
    spend,
    revenue,
    conversions,
    cpc,
    ctr,
    commentary,
    updated_at: new Date().toISOString(),
  };

  let error;

  if (reportId) {
    const result = await supabase
      .from("monthly_metrics")
      .update(reportData)
      .eq("id", reportId)
      .eq("brand_id", brandId);

    error = result.error;
  } else {
    const result = await supabase
      .from("monthly_metrics")
      .upsert(reportData, {
        onConflict: "brand_id,month_start",
      });

    error = result.error;
  }

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/reports/${brandId}`);
  revalidatePath("/dashboard");
  revalidatePath("/");
}

/* =========================================================
   MONTHLY REPORT — DELETE
========================================================= */

async function deleteMonthlyReport(formData: FormData) {
  "use server";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const reportId = String(
    formData.get("monthlyReportId") || ""
  );

  const brandId = String(
    formData.get("brandId") || ""
  );

  if (!reportId || !brandId) {
    throw new Error("Missing monthly report information.");
  }

  const { error } = await supabase
    .from("monthly_metrics")
    .delete()
    .eq("id", reportId)
    .eq("brand_id", brandId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/admin/reports/${brandId}`);
  revalidatePath("/dashboard");
  revalidatePath("/");
}

/* =========================================================
   PAGE
========================================================= */

export default async function ReportsPage({
  params,
  searchParams,
}: Props) {
  const { brandId } = await params;

  const {
    edit,
    monthlyEdit,
  } = await searchParams;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  /* -------------------------------------------------------
     ADMIN CHECK
  ------------------------------------------------------- */

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  /* -------------------------------------------------------
     BRAND
  ------------------------------------------------------- */

  const { data: brand } = await supabase
    .from("brands")
    .select("id, name, email")
    .eq("id", brandId)
    .single();

  if (!brand) {
    redirect("/admin");
  }

  /* -------------------------------------------------------
     WEEKLY REPORTS
  ------------------------------------------------------- */

  const { data: reports } = await supabase
    .from("weekly_metrics")
    .select("*")
    .eq("brand_id", brandId)
    .order("week_start", {
      ascending: false,
    });

  const editingReport = edit
    ? reports?.find(
        (report) => report.id === edit
      )
    : null;

  const latestReport = reports?.[0];

  /* -------------------------------------------------------
     MONTHLY REPORTS
  ------------------------------------------------------- */

  const { data: monthlyReports } = await supabase
    .from("monthly_metrics")
    .select("*")
    .eq("brand_id", brandId)
    .order("month_start", {
      ascending: false,
    });

  const editingMonthlyReport = monthlyEdit
    ? monthlyReports?.find(
        (report) => report.id === monthlyEdit
      )
    : null;

  const latestMonthlyReport =
    monthlyReports?.[0];

  /* -------------------------------------------------------
     MONTH FORMATTER
  ------------------------------------------------------- */

  const formatMonth = (date: string) => {
    if (!date) return "";

    const parsed = new Date(
      `${date}T00:00:00`
    );

    return parsed.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <main className="reports-page">
      <div className="reports-shell">

        {/* BACK */}

        <a
          href="/admin"
          className="back-link"
        >
          ← Back to clients
        </a>

        {/* HEADER */}

        <header className="reports-header">

          <div className="brand-label">
            Momentum / Reports
          </div>

          <h1 className="reports-title">
            {brand.name}
          </h1>

          <p className="reports-subtitle">
            Add and manage weekly and monthly
            performance reports.
          </p>

          {brand.email && (
            <p className="reports-client-email">
              {brand.email}
            </p>
          )}

        </header>

        {/* =================================================
            MONTHLY PERFORMANCE
        ================================================= */}

        {latestMonthlyReport && (
          <section className="reports-overview">

            <div className="reports-overview-header">

              <div>

                <span className="reports-overview-eyebrow">
                  Monthly performance
                </span>

                <p>
                  {formatMonth(
                    latestMonthlyReport.month_start
                  )}
                </p>

              </div>

              <span className="reports-overview-status">
                Current
              </span>

            </div>

            <div className="reports-overview-grid">

              <div className="reports-stat">
                <span>Spend</span>

                <strong>
                  ₹
                  {Number(
                    latestMonthlyReport.spend
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="reports-stat">
                <span>Revenue</span>

                <strong>
                  ₹
                  {Number(
                    latestMonthlyReport.revenue
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="reports-stat">
                <span>ROAS</span>

                <strong>
                  {latestMonthlyReport.spend > 0
                    ? (
                        Number(
                          latestMonthlyReport.revenue
                        ) /
                        Number(
                          latestMonthlyReport.spend
                        )
                      ).toFixed(2)
                    : "0.00"}
                  x
                </strong>
              </div>

              <div className="reports-stat">
                <span>Conversions</span>

                <strong>
                  {Number(
                    latestMonthlyReport.conversions
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

          </section>
        )}

       {/* =================================================
    MONTHLY WORKSPACE
================================================= */}

<div className="monthly-workspace">

  {/* MONTHLY EDITOR */}

  <section className="panel monthly-editor">

    <div className="panel-header">

      <div className="panel-heading-row">

        <div>

          <span className="panel-eyebrow">
            Monthly reporting
          </span>

          <h2 className="panel-title">
            {editingMonthlyReport
              ? "Edit monthly report"
              : "New monthly report"}
          </h2>

          <p className="panel-description">
            Enter the monthly advertising performance.
          </p>

        </div>

        {editingMonthlyReport && (
          <a
            href={`/admin/reports/${brandId}`}
            className="new-report-link"
          >
            + New monthly
          </a>
        )}

      </div>

    </div>

    <form
      action={saveMonthlyReport}
      className="report-form monthly-form"
    >

      <input
        type="hidden"
        name="brandId"
        value={brand.id}
      />

      {editingMonthlyReport && (
        <input
          type="hidden"
          name="monthlyReportId"
          value={editingMonthlyReport.id}
        />
      )}

      <div className="monthly-form-grid">

        <div className="form-group monthly-full">
          <label className="form-label">
            Month
          </label>

          <input
            type="date"
            name="monthStart"
            required
            defaultValue={
              editingMonthlyReport?.month_start || ""
            }
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Spend
          </label>

          <input
            type="number"
            name="monthlySpend"
            min="0"
            step="0.01"
            required
            defaultValue={
              editingMonthlyReport?.spend ?? ""
            }
            placeholder="134326"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Revenue
          </label>

          <input
            type="number"
            name="monthlyRevenue"
            min="0"
            step="0.01"
            required
            defaultValue={
              editingMonthlyReport?.revenue ?? ""
            }
            placeholder="1164574"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Conversions
          </label>

          <input
            type="number"
            name="monthlyConversions"
            min="0"
            step="1"
            required
            defaultValue={
              editingMonthlyReport?.conversions ?? ""
            }
            placeholder="1257"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            CPC
          </label>

          <input
            type="number"
            name="monthlyCpc"
            min="0"
            step="0.01"
            required
            defaultValue={
              editingMonthlyReport?.cpc ?? ""
            }
            placeholder="4.53"
            className="form-input"
          />
        </div>

        <div className="form-group monthly-full">
          <label className="form-label">
            CTR (%)
          </label>

          <input
            type="number"
            name="monthlyCtr"
            min="0"
            step="0.01"
            required
            defaultValue={
              editingMonthlyReport?.ctr ?? ""
            }
            placeholder="2.12"
            className="form-input"
          />
        </div>

        <div className="form-group monthly-full">
          <label className="form-label">
            Commentary
          </label>

          <textarea
            name="monthlyCommentary"
            rows={4}
            defaultValue={
              editingMonthlyReport?.commentary || ""
            }
            placeholder="Add notes about this month's performance..."
            className="form-input"
          />
        </div>

      </div>

      <div className="monthly-form-footer">

        <div className="monthly-roas-note">
          <span className="monthly-roas-icon">↗</span>

          <div>
            <strong>ROAS</strong>
            <span>
              Automatically calculated from Revenue ÷ Spend.
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="monthly-save-button"
        >
          <span>
            {editingMonthlyReport
              ? "Update monthly report"
              : "Save monthly report"}
          </span>

          <strong>→</strong>
        </button>

      </div>

    </form>

  </section>


  {/* MONTHLY HISTORY */}

  <section className="panel monthly-history-panel">

    <div className="panel-header">

      <div>

        <span className="panel-eyebrow">
          Archive
        </span>

        <h2 className="panel-title">
          Previous months
        </h2>

      </div>

      <span className="monthly-history-count">
        {monthlyReports?.length || 0}
      </span>

    </div>

    <div className="previous-list monthly-history">

      {monthlyReports &&
      monthlyReports.length > 0 ? (

        monthlyReports.map((report) => {

          const monthlyRoas =
            Number(report.spend) > 0
              ? Number(report.revenue) /
                Number(report.spend)
              : 0;

          return (
            <div
              key={report.id}
              className="previous-report"
            >

              <div className="previous-report-header">

                <div>

                  <p className="report-date">
                    {formatMonth(
                      report.month_start
                    )}
                  </p>

                  <span className="report-period-label">
                    Monthly performance
                  </span>

                </div>

                <span className="report-roas">
                  {monthlyRoas.toFixed(2)}x
                </span>

              </div>

              <div className="previous-report-metrics">

                <div>
                  <span>Spend</span>

                  <strong>
                    ₹
                    {Number(
                      report.spend
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Revenue</span>

                  <strong>
                    ₹
                    {Number(
                      report.revenue
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <span>Conversions</span>

                  <strong>
                    {Number(
                      report.conversions
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

              </div>

              <div className="previous-report-secondary">

                <span>
                  CPC ₹
                  {Number(
                    report.cpc
                  ).toFixed(2)}
                </span>

                <span>
                  CTR{" "}
                  {Number(
                    report.ctr
                  ).toFixed(2)}
                  %
                </span>

              </div>

              {report.commentary && (
                <div className="monthly-commentary">
                  <span className="monthly-commentary-label">
                    Commentary
                  </span>

                  {report.commentary}
                </div>
              )}

              <div className="report-actions">

                <a
                  href={`/admin/reports/${brandId}?monthlyEdit=${report.id}`}
                  className="edit-link"
                >
                  Edit report
                  <span>→</span>
                </a>

                <form
                  action={deleteMonthlyReport}
                >
                  <input
                    type="hidden"
                    name="monthlyReportId"
                    value={report.id}
                  />

                  <input
                    type="hidden"
                    name="brandId"
                    value={brandId}
                  />

                  <button
                    type="submit"
                    className="monthly-delete-button"
                  >
                    Delete
                  </button>
                </form>

              </div>

            </div>
          );

        })

      ) : (

        <div className="empty-reports monthly-empty">
          <div className="monthly-empty-icon">
            +
          </div>

          <strong>
            No monthly reports yet
          </strong>

          <span>
            Your monthly performance history
            will appear here.
          </span>
        </div>

      )}

    </div>

  </section>

</div>

        {/* =================================================
            PREVIOUS MONTHLY REPORTS
        ================================================= */}

        <section className="panel">

          <div className="panel-header">

            <h2 className="panel-title">
              Previous monthly reports
            </h2>

            <p className="panel-description">
              Monthly performance history for{" "}
              {brand.name}.
            </p>

          </div>

          <div className="previous-list">

            {monthlyReports &&
            monthlyReports.length > 0 ? (

              monthlyReports.map((report) => {

                const monthlyRoas =
                  Number(report.spend) > 0
                    ? Number(report.revenue) /
                      Number(report.spend)
                    : 0;

                return (
                  <div
                    key={report.id}
                    className="previous-report"
                  >

                    <div className="previous-report-header">

                      <div>

                        <p className="report-date">
                          {formatMonth(
                            report.month_start
                          )}
                        </p>

                        <span className="report-period-label">
                          Monthly performance
                        </span>

                      </div>

                      <span className="report-roas">
                        {monthlyRoas.toFixed(2)}x
                      </span>

                    </div>

                    <div className="previous-report-metrics">

                      <div>
                        <span>Spend</span>

                        <strong>
                          ₹
                          {Number(
                            report.spend
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div>
                        <span>Revenue</span>

                        <strong>
                          ₹
                          {Number(
                            report.revenue
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div>
                        <span>Conversions</span>

                        <strong>
                          {Number(
                            report.conversions
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>

                    <div className="previous-report-secondary">

                      <span>
                        CPC ₹
                        {Number(
                          report.cpc
                        ).toFixed(2)}
                      </span>

                      <span>
                        CTR{" "}
                        {Number(
                          report.ctr
                        ).toFixed(2)}
                        %
                      </span>

                    </div>

                    {report.commentary && (
                      <div
                        style={{
                          marginTop: "14px",
                          fontSize: "13px",
                          lineHeight: 1.6,
                          opacity: 0.7,
                        }}
                      >
                        {report.commentary}
                      </div>
                    )}

                    <div className="report-actions">

                      <a
                        href={`/admin/reports/${brandId}?monthlyEdit=${report.id}`}
                        className="edit-link"
                      >
                        Edit report
                        <span>→</span>
                      </a>

                      <form
                        action={deleteMonthlyReport}
                      >
                        <input
                          type="hidden"
                          name="monthlyReportId"
                          value={report.id}
                        />

                        <input
                          type="hidden"
                          name="brandId"
                          value={brandId}
                        />

                        <button
                          type="submit"
                          className="edit-link"
                          style={{
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          Delete
                        </button>
                      </form>

                    </div>

                  </div>
                );
              })

            ) : (

              <div className="empty-reports">
                No monthly reports yet.
              </div>

            )}

          </div>

        </section>

        {/* =================================================
            WEEKLY REPORTS
        ================================================= */}

        {latestReport && (
  <section className="reports-overview monthly-overview">

            <div className="reports-overview-header">

              <div>

                <span className="reports-overview-eyebrow">
                  Latest weekly performance
                </span>

                <p>
                  {latestReport.week_start} →{" "}
                  {latestReport.week_end}
                </p>

              </div>

              <span className="reports-overview-status">
                Current
              </span>

            </div>

            <div className="reports-overview-grid">

              <div className="reports-stat">
                <span>Spend</span>

                <strong>
                  ₹
                  {Number(
                    latestReport.spend
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="reports-stat">
                <span>Revenue</span>

                <strong>
                  ₹
                  {Number(
                    latestReport.revenue
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

              <div className="reports-stat">
                <span>ROAS</span>

                <strong>
                  {Number(
                    latestReport.roas
                  ).toFixed(2)}
                  x
                </strong>
              </div>

              <div className="reports-stat">
                <span>Conversions</span>

                <strong>
                  {Number(
                    latestReport.conversions
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

          </section>
        )}

        <div className="reports-grid">

          {/* WEEKLY EDITOR */}

          <section className="panel">

            <div className="panel-header">

              <div className="panel-heading-row">

                <div>

                  <h2 className="panel-title">
                    {editingReport
                      ? "Edit weekly report"
                      : "New weekly report"}
                  </h2>

                  <p className="panel-description">
                    Enter the weekly advertising
                    performance.
                  </p>

                </div>

                {editingReport && (
                  <a
                    href={`/admin/reports/${brandId}`}
                    className="new-report-link"
                  >
                    + New report
                  </a>
                )}

              </div>

            </div>

            <div className="report-form">

              <ReportForm
                brandId={brand.id}
                report={editingReport}
                saveAction={saveReport}
              />

            </div>

          </section>

          {/* PREVIOUS WEEKLY REPORTS */}

          <section className="panel">

            <div className="panel-header">

              <h2 className="panel-title">
                Previous weekly reports
              </h2>

              <p className="panel-description">
                Weekly reports already saved for{" "}
                {brand.name}.
              </p>

            </div>

            <div className="previous-list">

              {reports && reports.length > 0 ? (

                reports.map((report) => (

                  <div
                    key={report.id}
                    className="previous-report"
                  >

                    <div className="previous-report-header">

                      <div>

                        <p className="report-date">
                          {report.week_start} →{" "}
                          {report.week_end}
                        </p>

                        <span className="report-period-label">
                          Weekly performance
                        </span>

                      </div>

                      <span className="report-roas">
                        {Number(
                          report.roas
                        ).toFixed(2)}
                        x
                      </span>

                    </div>

                    <div className="previous-report-metrics">

                      <div>
                        <span>Spend</span>

                        <strong>
                          ₹
                          {Number(
                            report.spend
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div>
                        <span>Revenue</span>

                        <strong>
                          ₹
                          {Number(
                            report.revenue
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div>
                        <span>Conversions</span>

                        <strong>
                          {Number(
                            report.conversions
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>

                    <div className="previous-report-secondary">

                      <span>
                        CPC ₹
                        {Number(
                          report.cpc
                        ).toFixed(2)}
                      </span>

                      <span>
                        CTR{" "}
                        {Number(
                          report.ctr
                        ).toFixed(2)}
                        %
                      </span>

                    </div>

                    <div className="report-actions">

                      <a
                        href={`/admin/reports/${brandId}?edit=${report.id}`}
                        className="edit-link"
                      >
                        Edit report
                        <span>→</span>
                      </a>

                      <DeleteReportButton
                        reportId={report.id}
                        brandId={brandId}
                        deleteAction={deleteReport}
                      />

                    </div>

                  </div>

                ))

              ) : (

                <div className="empty-reports">
                  No weekly reports yet.
                </div>

              )}

            </div>

          </section>

        </div>

        <div className="report-footer">
          Momentum · Admin Portal
        </div>

      </div>
    </main>
  );
}