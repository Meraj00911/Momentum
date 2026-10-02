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
  }>;
};

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

  const reportId = String(formData.get("reportId") || "");
  const brandId = String(formData.get("brandId") || "");

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
export default async function ReportsPage({
  params,
  searchParams,
}: Props) {
  const { brandId } = await params;
  const { edit } = await searchParams;

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

  const { data: brand } = await supabase
    .from("brands")
    .select("id, name, email")
    .eq("id", brandId)
    .single();

  if (!brand) {
    redirect("/admin");
  }

  const { data: reports } = await supabase
    .from("weekly_metrics")
    .select("*")
    .eq("brand_id", brandId)
    .order("week_start", {
      ascending: false,
    });

  const editingReport = edit
    ? reports?.find((report) => report.id === edit)
    : null;

  const latestReport = reports?.[0];

  return (
    <main className="reports-page">
      <div className="reports-shell">

        <a
          href="/admin"
          className="back-link"
        >
          ← Back to clients
        </a>

        <header className="reports-header">
          <div className="brand-label">
            Momentum / Reports
          </div>

          <h1 className="reports-title">
            {brand.name}
          </h1>

          <p className="reports-subtitle">
            Add and manage weekly performance reports.
          </p>

          {brand.email && (
            <p className="reports-client-email">
              {brand.email}
            </p>
          )}
        </header>

        {/* LATEST PERFORMANCE */}

        {latestReport && (
          <section className="reports-overview">

            <div className="reports-overview-header">

              <div>
                <span className="reports-overview-eyebrow">
                  Latest performance
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

          {/* REPORT EDITOR */}

          <section className="panel">

            <div className="panel-header">

              <h2 className="panel-title">
                {editingReport
                  ? "Edit weekly report"
                  : "New weekly report"}
              </h2>

<div className="panel-heading-row">
  <div>
    <h2 className="panel-title">
      {editingReport
        ? "Edit weekly report"
        : "New weekly report"}
    </h2>

    <p className="panel-description">
      Enter the weekly advertising performance.
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

          {/* PREVIOUS REPORTS */}

          <section className="panel">

            <div className="panel-header">

              <h2 className="panel-title">
                Previous reports
              </h2>

              <p className="panel-description">
                Reports already saved for {brand.name}.
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
                  No reports yet.
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