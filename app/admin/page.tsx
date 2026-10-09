import "./admin.css";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";




async function addClient(formData: FormData) {
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

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();

  if (!name || !email) {
    return;
  }

  /*
   * 1. Create the brand first
   */
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .insert({
      name,
      email,
    })
    .select("id")
    .single();

  if (brandError || !brand) {
    throw new Error(
      brandError?.message || "Could not create client."
    );
  }

  /*
   * 2. Create the client Auth account
   *    Supabase sends the invitation email.
   */
  const adminSupabase = createAdminClient();

  const { data: invitedUser, error: inviteError } =
    await adminSupabase.auth.admin.inviteUserByEmail(email, {
      data: {
        full_name: name,
        brand_id: brand.id,
      },
    });

  /*
   * If invitation fails, remove the brand we just created.
   */
  if (inviteError || !invitedUser.user) {
    await supabase
      .from("brands")
      .delete()
      .eq("id", brand.id);

    throw new Error(
      inviteError?.message || "Could not invite client."
    );
  }

  /*
   * 3. Create the profile linking the Auth user
   *    to the brand.
   */
  const { error: profileError } = await adminSupabase
    .from("profiles")
    .upsert({
      id: invitedUser.user.id,
      role: "client",
      full_name: name,
      brand_id: brand.id,
    });

  /*
   * If profile creation fails, clean everything up.
   */
  if (profileError) {
    await adminSupabase.auth.admin.deleteUser(
      invitedUser.user.id
    );

    await supabase
      .from("brands")
      .delete()
      .eq("id", brand.id);

    throw new Error(profileError.message);
  }

  revalidatePath("/admin");
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const { data: brands } = await supabase
    .from("brands")
    .select("id, name, email, created_at")
    .order("name");

  const clientCount = brands?.length || 0;

  return (
    <main className="admin-page">
      <div className="admin-shell">

        {/* HEADER */}

        <header className="admin-header">

          <div className="admin-heading">

            <div className="brand-label">
              Momentum / Control Center
            </div>

            <h1 className="admin-title">
              Good to see you
              <span>.</span>
            </h1>

            <p className="admin-subtitle">
              Manage clients, performance reports and access
              from one place.
            </p>

          </div>

          <div className="admin-header-meta">

            <div className="admin-status">
              <span className="status-pulse" />
              <span>System online</span>
            </div>

            <div className="client-count">
              <strong>
                {clientCount.toString().padStart(2, "0")}
              </strong>

              <span>
                {clientCount === 1
                  ? "active client"
                  : "active clients"}
              </span>
            </div>

          </div>

        </header>

        {/* MAIN GRID */}

        <div className="admin-grid">

          {/* CLIENTS */}

          <section className="panel clients-panel">

            <div className="panel-header">

              <div>
                <span className="panel-eyebrow">
                  Workspace
                </span>

                <h2 className="panel-title">
                  Clients
                </h2>
              </div>

              <span className="panel-index">
                01
              </span>

            </div>

            <p className="panel-description">
              Select a client to manage their weekly
              performance reports.
            </p>

            {brands && brands.length > 0 ? (

              <div className="client-list">

                {brands.map((brand, index) => (

                  <div
                    key={brand.id}
                    className="client-row"
                    style={{
                      animationDelay: `${0.08 + index * 0.06}s`,
                    }}
                  >

                    <div className="client-identity">

                      <div className="client-avatar">
                        {brand.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <div className="client-info">

                        <div className="client-name-line">

                          <p className="client-name">
                            {brand.name}
                          </p>

                          <span className="client-active">
                            Active
                          </span>

                        </div>

                        <p className="client-email">
                          {brand.email || "No email added"}
                        </p>

                      </div>

                    </div>

                    <a
                      href={`/admin/reports/${brand.id}`}
                      className="reports-button"
                    >
                      <span>View reports</span>
                      <strong>↗</strong>
                    </a>

                  </div>

                ))}
<div className="admin-page-note">
  <span className="admin-page-note-line" />
  <span>
    MOMENTUM / PERFORMANCE CONTROL CENTER
  </span>
  <span className="admin-page-note-line" />
</div>
              </div>

            ) : (

              <div className="empty-state">

                <div className="empty-icon">
                  +
                </div>

                <p className="empty-title">
                  No clients yet
                </p>

                <p className="empty-text">
                  Add your first client using the panel
                  alongside this workspace.
                </p>

              </div>

            )}

          </section>

          {/* ADD CLIENT */}

          <section className="panel add-client-panel">

            <div className="panel-header">

              <div>
                <span className="panel-eyebrow">
                  Onboarding
                </span>

                <h2 className="panel-title">
                  Add client
                </h2>
              </div>

              <span className="panel-index">
                02
              </span>

            </div>

            <p className="panel-description">
              Create a brand workspace and send the client
              their private portal invitation.
            </p>

            <form
              action={addClient}
              className="client-form"
            >

              <div className="form-group">

                <label className="form-label">
                  Brand name
                </label>

                <div className="input-wrap">
                  <span className="input-number">
                    01
                  </span>

                  <input
                    name="name"
                    required
                    placeholder="e.g. ZENIN"
                    className="form-input"
                  />
                </div>

              </div>

              <div className="form-group">

                <label className="form-label">
                  Client email
                </label>

                <div className="input-wrap">
                  <span className="input-number">
                    02
                  </span>

                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="client@example.com"
                    className="form-input"
                  />
                </div>

              </div>

              <div className="invite-note">
                <span className="invite-note-icon">
                  ↗
                </span>

                <p>
                  An invitation will be sent automatically
                  so the client can access their private
                  performance portal.
                </p>
              </div>

              <button
                type="submit"
                className="add-button"
              >
                <span>
                  Create & invite client
                </span>

                <strong>
                  →
                </strong>
              </button>

            </form>

          </section>

        </div>

        {/* FOOTER */}

        <footer className="admin-footer">
          <span>
            MOMENTUM
          </span>

          <i />

          <span>
            PERFORMANCE CONTROL CENTER
          </span>

          <span className="admin-footer-version">
            v1.0
          </span>
        </footer>

      </div>

    </main>
  );
}