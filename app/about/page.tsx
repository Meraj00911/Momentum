import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MoveUpRight } from "lucide-react";
import { MomentumFooter } from "@/components/ui/momentum-footer";
import "./about.css";

export const metadata: Metadata = {
  title: "About Momentum | Independent Digital Growth Studio",
  description:
    "Meet Momentum, an independent digital growth studio in Mumbai connecting strategy, creative, technology, and performance for ambitious brands.",
};

const principles = [
  {
    number: "01",
    title: "Start with the signal.",
    body: "We get close to the brand, the audience, and the business challenge before deciding what to make.",
  },
  {
    number: "02",
    title: "Make it mean something.",
    body: "Strategy, design, and creative work together to make every experience distinct and easy to remember.",
  },
  {
    number: "03",
    title: "Keep it moving.",
    body: "We connect the launch to what comes next, using performance and learning to move the work forward.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page" id="top">
      <header className="about-nav">
        <Link href="/" className="about-logo" aria-label="Momentum home">
          <span>M</span><strong>MOMENTUM</strong>
        </Link>
        <nav aria-label="About page navigation">
          <Link href="/#services">What we do</Link>
          <Link href="/#results">Selected work</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link href="/login" className="about-portal">Client portal <ArrowUpRight size={14} /></Link>
      </header>

      <section className="about-hero">
        <div className="about-hero-copy">
          <div className="about-kicker"><span /> INDEPENDENT DIGITAL GROWTH STUDIO · MUMBAI, INDIA</div>
          <h1>We turn attention<br /><em>into momentum.</em></h1>
          <p>
            Momentum brings strategy, creative, technology, and performance into one connected system—helping ambitious brands build a sharper presence and keep growing.
          </p>
          <div className="about-actions">
            <Link href="/contact" className="about-primary">Let&apos;s make a move <MoveUpRight size={16} /></Link>
            <a href="#our-way" className="about-text-link">Get to know us <ArrowDownRight size={16} /></a>
          </div>
        </div>
        <div className="about-hero-art" aria-label="Momentum connects brand, digital, and performance">
          <div className="about-art-orbit orbit-one" />
          <div className="about-art-orbit orbit-two" />
          <div className="about-art-core"><span>M</span><i>✳</i></div>
          <span className="about-art-label label-brand">BRAND</span>
          <span className="about-art-label label-digital">DIGITAL</span>
          <span className="about-art-label label-growth">GROWTH</span>
          <span className="about-art-caption">THOUGHT × CRAFT × MOMENTUM</span>
        </div>
        <a className="about-scroll-cue" href="#our-way"><span /> SCROLL TO DISCOVER <ArrowDownRight size={13} /></a>
      </section>

      <section className="about-manifesto" id="our-way">
        <div className="about-section-kicker">01 / WHO WE ARE</div>
        <div className="about-manifesto-copy">
          <h2>Not more noise.<br /><em>A clearer point of view.</em></h2>
          <div>
            <p>
              We are an independent digital growth studio working with ambitious brands across commerce, fashion, lifestyle, and culture.
            </p>
            <p>
              We believe the strongest brands do not separate how they look from how they grow. So we bring the right disciplines together, shape the story, build the experience, and keep learning from what happens next.
            </p>
            <Link href="/#services" className="about-inline-link">Explore what we do <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="about-principles-heading">
          <div className="about-section-kicker">02 / HOW WE MOVE</div>
          <h2>One connected<br /><em>way forward.</em></h2>
        </div>
        <div className="about-principles-list">
          {principles.map((principle) => (
            <article className="about-principle" key={principle.number}>
              <span>{principle.number}</span>
              <div><h3>{principle.title}</h3><p>{principle.body}</p></div>
              <ArrowUpRight size={17} aria-hidden="true" />
            </article>
          ))}
        </div>
      </section>

      <section className="about-capabilities">
        <div className="about-section-kicker">03 / WHAT COMES TOGETHER</div>
        <div className="about-capabilities-heading">
          <h2>Strategy to<br /><em>the numbers.</em></h2>
          <p>One studio across the moments that shape a modern brand.</p>
        </div>
        <div className="about-discipline-row">
          {["Strategy", "Brand & creative", "Digital experiences", "Performance"].map((item, index) => (
            <div key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={15} /></div>
          ))}
        </div>
      </section>

      <section className="about-cta">
        <span className="about-section-kicker">04 / YOUR NEXT MOVE</span>
        <h2>Have somewhere<br /><em>good to go?</em></h2>
        <p>Bring the ambition. Let&apos;s find the signal and build what moves it forward.</p>
        <Link href="/contact" className="about-primary">Start a conversation <MoveUpRight size={16} /></Link>
      </section>

      <MomentumFooter />
    </main>
  );
}
