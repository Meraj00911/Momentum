import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { getServiceBySlug } from "@/lib/services";
import "./service-page.css";

export const dynamic = "force-dynamic";

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) notFound();

  return (
    <main className="service-detail-page">
      <div className="service-detail-grain" aria-hidden="true" />
      <header className="service-detail-nav">
        <Link href="/landing" className="service-detail-brand" aria-label="Momentum home">
          <span>M</span><strong>MOMENTUM</strong>
        </Link>
        <Link href="/landing#services" className="service-detail-back"><ArrowLeft size={15} /> ALL SERVICES</Link>
      </header>

      <section className="service-detail-hero">
        <div className="service-detail-intro">
          <span className="service-detail-eyebrow">{service.number} / {service.eyebrow}</span>
          <h1>{service.title}<span>.</span></h1>
          <p className="service-detail-summary">{service.summary}</p>
          <p className="service-detail-description">{service.description}</p>
          <Link href="/contact" className="service-detail-cta">
            <span>LET&apos;S TALK ABOUT YOUR NEXT MOVE</span>
            <i><ArrowUpRight size={18} /></i>
          </Link>
        </div>
        <div className="service-detail-art" aria-hidden="true">
          <div className="service-detail-art-orbit orbit-one" />
          <div className="service-detail-art-orbit orbit-two" />
          <div className="service-detail-art-core"><span>MM / {service.number}</span><strong>{service.number}</strong></div>
          <span className="service-detail-art-caption">STRATEGY IN MOTION</span>
        </div>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-section-heading">
          <span>BUILT AROUND WHAT MATTERS</span>
          <h2>The right pieces.<br /><em>Working as one.</em></h2>
        </div>
        <div className="service-detail-focus">
          {service.focus.map((item, index) => (
            <div className="service-detail-focus-item" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong><Check size={16} aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="service-detail-approach">
        <div><span>HOW WE MOVE</span><h2>Thoughtful from<br /><em>first move to final detail.</em></h2></div>
        <ol>
          {service.approach.map((step, index) => (
            <li key={step}><span>{String(index + 1).padStart(2, "0")}</span>{step}</li>
          ))}
        </ol>
      </section>

      <footer className="service-detail-footer">
        <Link href="/landing" className="service-detail-brand"><span>M</span><strong>MOMENTUM</strong></Link>
        <span>INDEPENDENT DIGITAL STUDIO · MUMBAI</span>
        <Link href="/contact">START A CONVERSATION <ArrowUpRight size={14} /></Link>
      </footer>
    </main>
  );
}
