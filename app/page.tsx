"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ContactSection from "./contact-section";

/* ─────────────────────────────────────────────────────────────
   INLINE SVG ICONS
───────────────────────────────────────────────────────────── */
const svgProps = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeWidth: 1.75 as number,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconGlobe({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconTruck({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 6v3h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconWarehouse({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <path d="M3 21V9l9-6 9 6v12H3z" />
      <path d="M3 21h18" />
      <path d="M10 21V15h4v6" />
      <path d="M3 9h18" />
    </svg>
  );
}

function IconClipboard({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </svg>
  );
}


function IconLayers({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function IconZap({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function IconEye({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconCpu({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function IconHeart({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconTrendingUp({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function IconArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...svgProps} strokeWidth={2}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOGO
───────────────────────────────────────────────────────────── */
function CargoworksLogo() {
  return (
    <a href="#" className="navbar__logo" aria-label="Cargoworks home">
      <span className="navbar__logo-mark" aria-hidden="true">
        <svg width="42" height="28" viewBox="0 0 100 56" fill="currentColor">
          <path d="M0 7 6 1 100 9 100 46 97 47 97 12 94 13 94 47 89 48 89 12 80 14 80 49 70 50 70 11 55 14 55 52 40 53 40 8 20 11 20 54 6 56 0 50Z" />
        </svg>
      </span>
      <span className="navbar__wordmark">Cargoworks</span>
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: <IconGlobe />,
    title: "Ocean Freight & Sea Logistics",
    tag: "SEA FREIGHT",
    image: "/images/freight_sea_ship.jpg",
    desc: "Global containerized shipping, FCL/LTL cargo movement, intermodal sea-to-rail corridors, and ocean port coordination across major global trade routes.",
    items: ["FCL & LTL Container Shipping", "Port-to-Port & Door-to-Door", "Vessel Chartering & Cargo Tracking"],
  },
  {
    icon: <IconZap />,
    title: "Air Freight Express",
    tag: "AIR FREIGHT",
    image: "/images/freight_air_cargo.jpg",
    desc: "Time-critical international air cargo forwarding for high-value goods, pharmaceutical temperature-controlled shipments, and urgent express packages.",
    items: ["Priority & Charter Cargo Flights", "Temperature-Controlled Freight", "Airport-to-Airport Logistics"],
  },
  {
    icon: <IconTruck />,
    title: "Transportation & Last-Mile Delivery",
    tag: "LAND FREIGHT",
    image: "/images/freight_trucking.jpg",
    desc: "Reliable domestic road freight, dedicated fleet dispatch, full truckload (FTL), less-than-truckload (LTL), and seamless last-mile delivery network.",
    items: ["Domestic & Regional Fleet", "FTL & LTL Road Transportation", "GPS Tracked Last-Mile Delivery"],
  },
  {
    icon: <IconWarehouse />,
    title: "Smart Warehousing & Storage",
    tag: "STORAGE & 3PL",
    image: "/images/freight_warehouse.jpg",
    desc: "State-of-the-art climate-controlled distribution hubs, inventory management systems, order fulfillment, and long-term secure warehousing.",
    items: ["Climate-Controlled Storage", "Inventory & Order Fulfillment", "Distribution & Cross-Docking"],
  },
  {
    icon: <IconClipboard />,
    title: "Customs Clearance & Trade Compliance",
    tag: "CUSTOMS & PORT",
    image: "/images/freight_customs.jpg",
    desc: "Complete documentation management, import/export clearance, duty calculation, customs brokerage, and port authority coordination.",
    items: ["Customs Documentation & Clearance", "Duty & Tariff Advisory", "Port & Terminal Coordination"],
  },
  {
    icon: <IconLayers />,
    title: "3PL & Integrated Supply Chain",
    tag: "SUPPLY CHAIN",
    image: "/images/service_6.png",
    desc: "End-to-end supply chain orchestration, multi-modal transport planning, vendor management, and real-time shipment visibility dashboards.",
    items: ["Multi-Modal Transport Planning", "Supply Chain Optimization", "Real-Time Tracking & Telemetry"],
  },
];

const WHY_ITEMS = [
  { icon: <IconLayers size={24} />, title: "End-to-End Logistics", desc: "One partner for freight, transportation, warehousing, and customs clearance." },
  { icon: <IconZap size={24} />, title: "Reliable & Efficient", desc: "Timely deliveries and smooth operations you can count on." },
  { icon: <IconEye size={24} />, title: "Transparent Service", desc: "Clear communication, pricing, and real-time shipment visibility." },
  { icon: <IconCpu size={24} />, title: "Technology-Driven", desc: "Modern tools for better tracking and supply chain management." },
  { icon: <IconHeart size={24} />, title: "Customer-Focused", desc: "Dedicated support from pickup to final delivery." },
  { icon: <IconTrendingUp size={24} />, title: "Scalable Logistics", desc: "Solutions designed to grow alongside your business." },
];

const SECTORS_GRID = [
  {
    code: "SEC-01",
    badge: "HIGH PRECISION",
    title: "Automotive & EV Supply Chain",
    desc: "Just-In-Time component delivery, EV battery transport, sub-assembly logistics, and global automotive parts distribution.",
    tags: ["JIT Parts Dispatch", "EV Battery Logistics", "Assembly Support"],
  },
  {
    code: "SEC-02",
    badge: "HIGH VOLUME",
    title: "E-Commerce & Retail 3PL",
    desc: "Rapid fulfillment, automated warehousing, inventory sync, multi-channel distribution, and reverse logistics.",
    tags: ["Same-Day Fulfillment", "Multi-Channel 3PL", "Returns Management"],
  },
  {
    code: "SEC-03",
    badge: "CRITICAL CARE",
    title: "Healthcare & Pharma Cold-Chain",
    desc: "Strict temperature-controlled GDP transport for vaccines, biologics, active pharmaceutical ingredients, and medical tech.",
    tags: ["GDP Certified", "Active Cold-Chain", "Real-Time Telemetry"],
  },
  {
    code: "SEC-04",
    badge: "SPECIALIZED",
    title: "Heavy Industrial & Machinery",
    desc: "Over-dimensional cargo, project logistics, heavy-lift ocean vessel chartering, and site-to-site machinery transport.",
    tags: ["Project Freight", "Over-Dimensional", "Heavy-Lift Operations"],
  },
  {
    code: "SEC-05",
    badge: "SECURE FREIGHT",
    title: "High-Tech & Electronics",
    desc: "High-value component security, clean-room freight packaging, expedited air cargo, and end-to-end supply visibility.",
    tags: ["High-Value Security", "Clean-Room Packaging", "Express Air"],
  },
  {
    code: "SEC-06",
    badge: "CLEAN TECH",
    title: "Renewable Energy & Solar",
    desc: "Logistics support for wind turbine blades, solar PV module bulk shipments, power grid infrastructure, and remote delivery.",
    tags: ["Solar PV Modules", "Wind Turbine Freight", "Remote Delivery"],
  },
];

const REGIONS = [
  { name: "India", desc: "Domestic Network" },
  { name: "UAE", desc: "Gulf Hub" },
  { name: "Middle East", desc: "Regional Reach" },
  { name: "Asia", desc: "Asia-Pacific" },
  { name: "Global Trade Routes", desc: "Worldwide" },
];

const STATS = [
  { value: "2026", label: "Founded" },
  { value: "6", label: "Core Services" },
  { value: "5+", label: "Regions Served" },
  { value: "10+", label: "Industries Served" },
];

/* ─────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useNavScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return scrolled;
}

// Scroll position owns the animation: stopping or reversing scroll does the same
// to the color, pattern, and word reveals. No continuous animation loop.
function useScrollDesign(paused: boolean) {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-surface]"));
    const words = Array.from(document.querySelectorAll<HTMLElement>(".scroll-copy"));
    const main = document.getElementById("main-content");
    const colors: Record<string, number[]> = {
      sand: [222, 216, 201], dark: [31, 41, 40],
      slate: [55, 76, 91], rust: [211, 69, 39],
    };
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const mix = (from: number[], to: number[], progress: number) =>
      `rgb(${from.map((channel, i) => Math.round(channel + (to[i] - channel) * progress)).join(", ")})`;
    const update = () => {
      frame = 0;
      const still = paused || preference.matches;
      main?.classList.toggle("scroll-design-active", !still);
      const height = window.innerHeight;
      let background = colors.dark;
      let nextBackground = colors.dark;
      let wipeProgress = 0;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const progress = clamp((height - rect.top) / (height * 0.8));
        const target = colors[section.dataset.scrollSurface || "dark"];
        // Raise a solid color curtain instead of blending the two colors.
        // Completed chapters become the base for the next curtain.
        if (progress === 1) {
          background = target;
          nextBackground = target;
          wipeProgress = 0;
        } else if (progress > 0) {
          nextBackground = target;
          wipeProgress = progress * progress * (3 - 2 * progress);
        }
      });
      main?.style.setProperty("--page-surface", mix(background, background, 1));
      main?.style.setProperty("--page-next-surface", mix(nextBackground, nextBackground, 1));
      main?.style.setProperty("--page-wipe-top", `${(1 - wipeProgress) * 100}%`);
      let navBackground = background;
      if (still) {
        navBackground = colors.dark;
        sections.forEach((section) => {
          if (section.getBoundingClientRect().top <= 96) {
            navBackground = colors[section.dataset.scrollSurface || "dark"];
          }
        });
      }
      if ((document.querySelector("footer")?.getBoundingClientRect().top ?? Infinity) <= 96) {
        navBackground = colors.dark;
      }
      const luminance = navBackground.reduce((sum, channel, index) => {
        const value = channel / 255;
        return sum + (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
          * [0.2126, 0.7152, 0.0722][index];
      }, 0);
      const root = document.documentElement.style;
      root.setProperty("--nav-surface", mix(navBackground, navBackground, 1));
      root.setProperty("--nav-ink", luminance > 0.179 ? "#000000" : "#ffffff");
      words.forEach((block) => {
        const rect = block.getBoundingClientRect();
        const progress = still ? 1 : clamp((height * 0.9 - rect.top) / (height * 0.35));
        const spans = block.querySelectorAll<HTMLElement>(".scroll-word");
        spans.forEach((word, index) => {
          const amount = clamp(progress * 1.5 - index / spans.length * 0.5);
          word.style.opacity = String(0.24 + amount * 0.76);
          word.style.transform = `translateY(${(1 - amount) * 10}px)`;
        });
      });
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      main?.style.removeProperty("--page-surface");
      main?.style.removeProperty("--page-next-surface");
      main?.style.removeProperty("--page-wipe-top");
      main?.classList.remove("scroll-design-active");
      ["--nav-surface", "--nav-ink"].forEach((name) => document.documentElement.style.removeProperty(name));
    };
  }, [paused]);
}

function ScrollWords({ children }: { children: string }) {
  return <span className="scroll-copy">{children.split(" ").map((word, index) => (
    <span key={index}><span className="scroll-word">{word}</span>{" "}</span>
  ))}</span>;
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const scrolled = useNavScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  useScrollReveal();
  useScrollDesign(motionPaused);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = () => {
      setMobileOpen(false);
      document.getElementById("mobile-menu-toggle")?.focus();
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    const onResize = () => { if (window.innerWidth > 900) close(); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  function smoothTo(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const chapterLead = el.hasAttribute("data-scroll-surface")
        ? parseFloat(window.getComputedStyle(el).paddingTop) : 0;
      const top = el.getBoundingClientRect().top + window.scrollY + chapterLead - 96;
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }

  /* Marquee items — multiplied for seamless continuous loop */
  const marqueeItems = [...REGIONS, ...REGIONS, ...REGIONS, ...REGIONS];

  return (
    <>
      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <header className={`navbar${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="container navbar__inner">
          <CargoworksLogo />

          <nav aria-label="Primary">
            <ul className="navbar__links">
              {[
                { href: "services", label: "Services" },
                { href: "industries", label: "Industries" },
                { href: "why-us", label: "Why Us" },
                { href: "about", label: "About" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={`#${href}`} onClick={(e) => smoothTo(e, href)}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="navbar__cta">
            <a id="nav-quote-btn" href="#contact" className="btn btn-primary"
              onClick={(e) => smoothTo(e, "contact")}>
              Let’s talk <IconArrowRight size={16} />
            </a>
            <button
              id="mobile-menu-toggle"
              className="nav-hamburger"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-controls="mobile-navigation"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* ══ MOBILE MENU ═══════════════════════════════════════ */}
      <nav id="mobile-navigation" className={`mobile-menu${mobileOpen ? " open" : ""}`} aria-label="Mobile">
        {[
          { href: "services", label: "Services" },
          { href: "industries", label: "Industries" },
          { href: "why-us", label: "Why Us" },
          { href: "about", label: "About" },
          { href: "contact", label: "Contact" },
        ].map(({ href, label }) => (
          <a key={href} href={`#${href}`} onClick={(e) => smoothTo(e, href)}>{label}</a>
        ))}
        <a href="#contact" className="btn btn-primary btn-lg"
          onClick={(e) => smoothTo(e, "contact")}>
          Get a Quote <IconArrowRight />
        </a>
      </nav>

      <main id="main-content" className={motionPaused ? "motion-paused" : undefined}>
        <div className="page-color-canvas" aria-hidden="true" />
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section id="hero" className="hero" aria-label="Hero">
          {/* Background */}
          <div className="hero__bg-image" aria-hidden="true" />
          <div className="hero__dots" aria-hidden="true" />
          <div className="hero__fade" aria-hidden="true" />

          {/* Centered layout */}
          <div className="hero__body hero__body--center">
            <div className="hero__content-center">
              <div className="hero__eyebrow reveal">
                <span className="hero__eyebrow-dot" />
                GLOBAL LOGISTICS NETWORK &nbsp;·&nbsp; KOCHI HQ
              </div>

              <h1 className="hero__headline hero__headline--center reveal reveal-delay-1">
                <span>MOVING CARGO</span>
                <span className="hl-accent">BEYOND BORDERS</span>
              </h1>

              <p className="hero__intro reveal reveal-delay-2">
                Across oceans. Across continents. One connected logistics partner
                to keep your business moving.
              </p>

              <div className="hero__actions hero__actions--center reveal reveal-delay-2">
                <a id="hero-cta-primary" href="#contact"
                  className="btn btn-primary btn-lg"
                  onClick={(e) => smoothTo(e, "contact")}>
                  Get a Quote <IconArrowRight />
                </a>
                <a id="hero-cta-secondary" href="#services"
                  className="btn btn-ghost btn-lg"
                  onClick={(e) => smoothTo(e, "services")}>
                  Our Services <IconArrowRight size={13} />
                </a>
              </div>
            </div>
          </div>

          {/* Marquee regions strip */}
          <div className="hero__strip">
            <button className="motion-toggle" type="button" aria-pressed={motionPaused}
              onClick={() => setMotionPaused(!motionPaused)}>
              {motionPaused ? "Resume motion" : "Pause motion"}
            </button>
            <div className="marquee" aria-hidden="true">
              <div className="marquee__track">
                {marqueeItems.map((r, i) => (
                  <span key={i} className="marquee__item">
                    {r.name}
                    <span className="marquee__sep" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section id="about" className="about-section" data-scroll-surface="sand" aria-label="About Cargoworks">
          <div className="container">

            {/* Description */}
            <div className="about__top">
              <div className="about__visual" tabIndex={0} role="img" aria-label="Container yard with an interactive folded pattern. Move over the image to reveal individual pieces, or focus to reveal the whole pattern.">
                <div className="about__pattern" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, row) => (
                    <div className="brand-pattern__row" key={row}>
                      {Array.from({ length: 7 }, (_, column) => <span key={column} />)}
                    </div>
                  ))}
                </div>
                <div className="about__visual-caption" aria-hidden="true"><span>CARGOWORKS / IN MOTION</span><span>SEA · LAND · AIR</span></div>
              </div>
              <div className="about__right">
                <div className="about__tag">About Cargoworks</div>
                <h2 className="about__title">
                  <ScrollWords>Modern Logistics for a Connected World</ScrollWords>
                </h2>
                <div className="about__established">Est. 2026 &nbsp;·&nbsp; Kochi, India</div>
                <p className="about__text">
                  <ScrollWords>Cargoworks is a modern logistics and supply chain company focused on making cargo movement simpler, faster, and more reliable. We provide flexible logistics solutions covering transportation, freight, warehousing, and end-to-end supply chain support.</ScrollWords>
                </p>
                <p className="about__text">
                  <ScrollWords>Our goal is to combine technology, efficiency, and customer-focused service to help businesses move their goods seamlessly and grow with confidence.</ScrollWords>
                </p>
              </div>
            </div>

            {/* Stat boxes — exact layout from reference */}
            <div className="about__stats">
              {STATS.map((s, i) => (
                <div key={s.label} className={`about__stat reveal reveal-delay-${i + 1}`}>
                  <div className="about__stat-value">{s.value}</div>
                  <div className="about__stat-label">{s.label}</div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ SERVICES (Horizontal Rows with Spiral Image Pop-up) ══ */}
        <section id="services" className="services" data-scroll-surface="dark">
          <div className="container">
            <div className="services__header reveal">
              <div>
                <div className="label-line" style={{ marginBottom: "0.875rem" }}>
                  What We Do
                </div>
                <h2 className="section-title">Our Services</h2>
              </div>
              <p className="section-desc">
                Comprehensive freight forwarding and end-to-end logistics solutions connecting air, sea, road, and automated warehousing worldwide.
              </p>
            </div>

            {/* Services List (Exact Layout & Pop-up from Reference Image) */}
            <div className="services__rows-ref">
              {SERVICES.map((s, i) => (
                <div
                  key={s.title}
                  className={`service-row-ref reveal reveal-delay-${(i % 4) + 1}`}
                >
                  {/* Top Row: Number + Title + Arrow Button */}
                  <div className="service-row-ref__header">
                    <div className="service-row-ref__title-group">
                      <span className="service-row-ref__num">0{i + 1}</span>
                      <h3 className="service-row-ref__title">{s.title}</h3>
                    </div>

                    {/* Circular Arrow Action Button (Turns Accent Color on Hover) */}
                    <a
                      href="#contact"
                      className="service-row-ref__arrow-btn"
                      onClick={(e) => smoothTo(e, "contact")}
                      aria-label={`Request quote for ${s.title}`}
                    >
                      <span className="arrow-icon" aria-hidden="true">↗</span>
                    </a>
                  </div>

                  {/* Expandable Description Underneath */}
                  <div className="service-row-ref__desc-wrap">
                    <p className="service-row-ref__desc">{s.desc}</p>
                  </div>

                  {/* Floating Tilted Image Pop-up Card (Exact Match to Reference Photo) */}
                  <div className="service-row-ref__image-popup">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={310}
                      height={310}
                      className="service-row-ref__popup-img"
                    />
                    <div className="service-row-ref__popup-overlay" />
                    <span className="service-row-ref__popup-tag">{s.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ═════════════════════════════════════ */}
        <section id="why-us" className="why" data-scroll-surface="slate">
          <div className="container">
            <div className="why__intro reveal">
              <div className="label-line" style={{ marginBottom: "0.875rem" }}>
                Our Edge
              </div>
              <h2 className="section-title">Why Choose Cargoworks</h2>
            </div>

            <div className="why__grid">
              {WHY_ITEMS.map((item, i) => (
                <div
                  key={item.title}
                  className={`why-card reveal reveal-delay-${(i % 3) + 1}`}
                  data-num={String(i + 1).padStart(2, "0")}
                >
                  <div className="why-card__icon" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ INDUSTRIES & AREAS ════════════════════════════════ */}
        <section id="industries" className="industries" data-scroll-surface="dark">
          {/* Header */}
          <div className="container">
            <div className="reveal" style={{ marginBottom: "2.5rem" }}>
              <div className="label-line" style={{ marginBottom: "0.875rem" }}>
                Sectors & Verticals
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
                <h2 className="section-title">Industries Served</h2>
                <p className="section-desc">
                  Tailored logistics engineered for diverse industry demands and global supply chains.
                </p>
              </div>
            </div>
          </div>

          {/* Ultra-Minimal Sectors Grid */}
          <div className="container">
            <div className="sectors-min-grid">
              {SECTORS_GRID.map((sec, i) => (
                <div
                  key={sec.code}
                  className={`sector-min-card reveal reveal-delay-${(i % 3) + 1}`}
                >
                  <span className="sector-min-card__num">0{i + 1}</span>
                  <div className="sector-min-card__content">
                    <h3 className="sector-min-card__title">{sec.title}</h3>
                    <p className="sector-min-card__desc">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage / Areas Served */}
          <div className="container" style={{ marginTop: "clamp(4.5rem, 8vw, 7rem)" }}>
            <div className="reveal" style={{ marginBottom: "2rem" }}>
              <div className="label-line" style={{ marginBottom: "0.875rem" }}>
                Coverage
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
                <h2 className="section-title" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}>
                  Areas Served
                </h2>
                <p className="section-desc">
                  Connecting businesses across key domestic corridors, Gulf hubs, and international trade routes.
                </p>
              </div>
            </div>

            <div className="regions-grid reveal reveal-delay-2">
              {REGIONS.map((r, i) => (
                <div key={r.name} className="region-card">
                  <span className="region-card__num">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="region-card__name">{r.name}</h3>
                  <span className="region-card__desc">{r.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MISSION & VISION ══════════════════════════════════ */}
        <section id="mission" className="mission" data-scroll-surface="rust" aria-label="Mission and Vision">
          <div className="container">
            <div className="mission__grid">
              <div className="mission-block reveal">
                <div className="mission-block__tag">Mission</div>
                <h2 className="mission-block__title">Our Mission</h2>
                <p className="mission-block__text">
                  To simplify logistics through reliable, efficient, and technology-driven
                  solutions that help businesses move goods seamlessly, reduce complexity,
                  and grow with confidence.
                </p>
              </div>

              <div className="mission__divider" aria-hidden="true" />

              <div className="mission-block reveal reveal-delay-2">
                <div className="mission-block__tag">Vision</div>
                <h2 className="mission-block__title">Our Vision</h2>
                <p className="mission-block__text">
                  To build a trusted, technology-enabled logistics network that connects
                  businesses globally and sets a new standard for seamless, transparent,
                  and scalable supply chain solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <ContactSection />
      </main>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer__directory">
            <div className="footer__location">
              <span className="footer__col-title">ROOTED IN KOCHI. CONNECTED GLOBALLY.</span>
              <a href="mailto:info@cargoworkslogistics.com">info@cargoworkslogistics.com <IconArrowRight size={16} /></a>
              <p>India &middot; UAE &middot; Middle East &middot; Asia</p>
            </div>
            <nav className="footer__nav" aria-label="Footer">
              {[['services', 'Services'], ['industries', 'Industries'], ['about', 'About us'], ['contact', 'Contact']].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={(e) => smoothTo(e, id)}>{label}</a>
              ))}
            </nav>
          </div>
          <div className="footer__signature" aria-hidden="true">cargoworks<span>&#8599;</span></div>
          <div className="footer__bottom">
            <p className="footer__copy">&copy; {new Date().getFullYear()} Cargoworks. All rights reserved.</p>
            <span className="footer__closing">Beyond borders. Always forward.</span>
            <a className="footer__top" href="#hero" onClick={(e) => smoothTo(e, "hero")}>Back to top <span aria-hidden="true">&uarr;</span></a>
          </div>
        </div>
      </footer>
    </>
  );
}
