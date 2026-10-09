import "./service-page.css";

export default function LoadingServicePage() {
  return (
    <main className="service-detail-page service-detail-loading" aria-busy="true" aria-label="Loading service details">
      <div className="service-detail-grain" aria-hidden="true" />
      <header className="service-detail-nav">
        <span className="service-detail-brand"><span>M</span><strong>MOMENTUM</strong></span>
        <span className="service-skeleton service-skeleton-back" />
      </header>
      <section className="service-detail-hero">
        <div className="service-detail-intro">
          <span className="service-skeleton service-skeleton-eyebrow" />
          <span className="service-skeleton service-skeleton-title" />
          <span className="service-skeleton service-skeleton-summary" />
          <span className="service-skeleton service-skeleton-copy" />
          <span className="service-skeleton service-skeleton-copy short" />
          <span className="service-skeleton service-skeleton-cta" />
        </div>
        <div className="service-loading-art"><span className="service-loading-core" /></div>
      </section>
      <section className="service-detail-content">
        <div className="service-detail-section-heading"><span className="service-skeleton service-skeleton-eyebrow" /><span className="service-skeleton service-skeleton-subtitle" /></div>
        <div className="service-detail-focus">
          {[0, 1, 2, 3].map((item) => <span className="service-skeleton service-skeleton-row" key={item} />)}
        </div>
      </section>
    </main>
  );
}
