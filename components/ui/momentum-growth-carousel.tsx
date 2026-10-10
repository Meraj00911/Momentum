"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleDot, Search, ShoppingBag, Sparkles, Target, TrendingUp } from "lucide-react";
import "./momentum-growth-carousel.css";

const growthSlides = [
  {
    number: "01",
    eyebrow: "WEBSITE DESIGN + DEVELOPMENT",
    title: "Websites that turn attention into action.",
    description: "From first impression to checkout, we design and build digital experiences that feel unmistakably yours and make the next step easy.",
    values: ["More brand trust", "Less journey friction", "A clearer path to action"],
    link: "/services/digital-experiences",
    linkLabel: "Explore digital experiences",
    art: "website",
  },
  {
    number: "02",
    eyebrow: "META ADS · INSTAGRAM + FACEBOOK",
    title: "Meta Ads that turn discovery into demand.",
    description: "We connect audience strategy, creative testing and retargeting to help your brand earn attention and learn what makes people act.",
    values: ["Qualified discovery", "Faster creative learning", "Connected retargeting"],
    link: "/services/performance",
    linkLabel: "Explore performance",
    art: "meta",
  },
  {
    number: "03",
    eyebrow: "GOOGLE ADS · SEARCH + SHOPPING",
    title: "Google Ads that meet customers with intent.",
    description: "Show up when people are searching, comparing or ready to buy. We build accountable campaigns around the moments that matter.",
    values: ["High-intent visibility", "Smarter spend allocation", "Clear conversion signals"],
    link: "/services/performance",
    linkLabel: "Explore performance",
    art: "google",
  },
  {
    number: "04",
    eyebrow: "THE REST OF THE MEDIA MIX",
    title: "More platforms. One connected plan.",
    description: "We choose the channels that fit your audience and objective, then connect the work so every platform has a clear role.",
    values: ["TikTok", "LinkedIn", "Pinterest", "YouTube", "Snapchat", "Amazon Ads", "Reddit"],
    link: "/services/performance",
    linkLabel: "Find your channel mix",
    art: "channels",
  },
];

function GrowthArtwork({ kind }: { kind: string }) {
  if (kind === "website") {
    return (
      <div className="growth-art growth-art-website" aria-hidden="true">
        <div className="growth-browser-bar"><i /><i /><i /><span>YOURBRAND.COM</span><ShoppingBag size={15} /></div>
        <div className="growth-browser-content">
          <div className="growth-site-nav"><b>FORM / FUNCTION</b><span>OBJECTS · STUDIO · JOURNAL</span><ShoppingBag size={14} /></div>
          <div className="growth-site-hero"><span>MADE TO MOVE WITH YOU</span><strong>Everyday,<br /><em>reimagined.</em></strong><span className="growth-site-cta">DISCOVER THE COLLECTION ↗</span></div>
          <div className="growth-site-products"><i /><i /><i /></div>
        </div>
        <span className="growth-art-caption">DESIGN · EXPERIENCE · CONVERSION</span>
      </div>
    );
  }

  if (kind === "meta") {
    return (
      <div className="growth-art growth-art-meta" aria-hidden="true">
        <div className="growth-platform-pill"><span>f</span> META BUSINESS SUITE <i>CONNECTED</i></div>
        <div className="growth-campaign-card">
          <div className="growth-campaign-heading"><span>CREATIVE TEST / 03</span><Sparkles size={16} /></div>
          <div className="growth-campaign-visual"><span>MAKE<br />THE<br /><em>MOVE.</em></span><i /></div>
          <div className="growth-campaign-footer"><span>New season. New energy.</span><b>SHOP NOW ↗</b></div>
        </div>
        <div className="growth-orbit-chip orbit-a"><Target size={15} /> AUDIENCE</div>
        <div className="growth-orbit-chip orbit-b"><TrendingUp size={15} /> LEARNING LOOP</div>
      </div>
    );
  }

  if (kind === "google") {
    return (
      <div className="growth-art growth-art-google" aria-hidden="true">
        <div className="growth-search-brand"><b>G</b><span>GOOGLE ADS / SEARCH + SHOPPING</span></div>
        <div className="growth-search-box"><Search size={16} /><span>the next move for your brand</span><i>⌕</i></div>
        <div className="growth-search-result"><small>SPONSORED · YOURBRAND.COM</small><strong>Built around what matters.</strong><p>Find the right thing, at the right moment. Discover a better way to move.</p><span>yourbrand.com / explore</span></div>
        <div className="growth-search-footer"><span><CircleDot size={12} /> SEARCH INTENT</span><i>CAPTURED WITH CLARITY</i></div>
      </div>
    );
  }

  return (
    <div className="growth-art growth-art-channels" aria-hidden="true">
      <span className="growth-channel-center"><b>M</b><small>ONE<br />CONNECTED<br />PLAN</small></span>
      {growthSlides[3].values.map((platform, index) => <span className={`growth-channel-tag channel-${index + 1}`} key={platform}>{platform}</span>)}
      <span className="growth-art-caption">THE RIGHT CHANNEL · THE RIGHT ROLE</span>
    </div>
  );
}

export function MomentumGrowthCarousel() {
  const [viewportRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true, duration: 34 });
  const [activeSlide, setActiveSlide] = useState(0);

  const syncActiveSlide = useCallback(() => {
    if (emblaApi) setActiveSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", syncActiveSlide);
    emblaApi.on("reInit", syncActiveSlide);
    return () => {
      emblaApi.off("select", syncActiveSlide);
      emblaApi.off("reInit", syncActiveSlide);
    };
  }, [emblaApi, syncActiveSlide]);

  return (
    <section className="momentum-growth" aria-label="Momentum growth services">
      <div className="momentum-growth-header">
        <div>
          <span className="momentum-growth-kicker">04 / HOW WE CREATE VALUE</span>
          <h2>Built to move<br /><em>your business forward.</em></h2>
        </div>
        <p>One studio, connected across the experiences and campaigns that create lasting growth.</p>
      </div>

      <div className="momentum-growth-carousel" role="region" aria-roledescription="carousel" aria-label="Website, advertising and marketing services">
        <div className="momentum-growth-viewport" ref={viewportRef}>
          <div className="momentum-growth-track">
            {growthSlides.map((slide, index) => (
              <article className="momentum-growth-slide" key={slide.number} aria-roledescription="slide" aria-label={`${index + 1} of ${growthSlides.length}`}>
                <div className="momentum-growth-card">
                  <div className="momentum-growth-copy">
                    <div className="momentum-growth-slide-meta"><span>{slide.number} / 04</span><span>{slide.eyebrow}</span></div>
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                    {slide.art === "channels" ? (
                      <div className="growth-platforms" aria-label="Additional marketing platforms">
                        {slide.values.map((platform) => <span key={platform}>{platform}</span>)}
                      </div>
                    ) : (
                      <div className="growth-value-list">
                        <span>VALUE CREATED</span>
                        {slide.values.map((value) => <span key={value}><Check size={13} />{value}</span>)}
                      </div>
                    )}
                    <Link className="momentum-growth-link" href={slide.link}>
                      {slide.linkLabel}<ArrowUpRight size={16} />
                    </Link>
                  </div>
                  <GrowthArtwork kind={slide.art} />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="momentum-growth-controls">
          <span className="momentum-growth-count"><strong>{String(activeSlide + 1).padStart(2, "0")}</strong><i />{String(growthSlides.length).padStart(2, "0")}</span>
          <div className="momentum-growth-dots" aria-label="Choose a service slide">
            {growthSlides.map((slide, index) => (
              <button key={slide.number} type="button" className={activeSlide === index ? "is-active" : ""} onClick={() => emblaApi?.scrollTo(index)} aria-label={`Show ${slide.eyebrow}`} aria-current={activeSlide === index ? "true" : undefined} />
            ))}
          </div>
          <div className="momentum-growth-arrows">
            <button type="button" onClick={() => emblaApi?.scrollPrev()} aria-label="Previous service"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => emblaApi?.scrollNext()} aria-label="Next service"><ArrowRight size={17} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
