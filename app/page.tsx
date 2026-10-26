"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import CinematicHero from "./cinematic-hero";
import ContactSection from "./contact-section";
import { whatsappLink } from "./contact-config";
import { useScrollExperience } from "./use-scroll-experience";
import "./scroll-experience.css";
import "./contact.css";
import "./why-us.css";
import "./mobile.css";
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
      <Image
        className="navbar__logo-icon"
        src="/logo/Cargoworks Icon.svg"
        alt=""
        width={46}
        height={24}
        priority
        unoptimized
      />
      <span className="navbar__logo-name">CARGOWORKS</span>
    </a>
  );
}

function CargoworksPreloader({ reduceMotion }: { reduceMotion?: boolean | null }) {
  return (
    <motion.div
      className="site-preloader"
      role="status"
      aria-label="Loading Cargoworks"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease: [0.4, 0, 0.2, 1] } }}
    >
      <div className="site-preloader__logo" aria-hidden="true">
        <span className="site-preloader__mark">
          <Image
            src="/logo/Cargoworks Icon.svg"
            alt=""
            width={329}
            height={172}
            priority
            unoptimized
          />
        </span>
        <span className="site-preloader__wordmark">
          {"CARGOWORKS".split("").map((letter, index) => (
            <span className="site-preloader__char-wrap" key={index}>
              <i>{letter}</i>
            </span>
          ))}
        </span>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: <IconGlobe />,
    title: "Sea Freight",
    tag: "SEA FREIGHT",
    image: "/images/services/sea-freight.webp",
    desc: "Global containerized shipping, FCL/LTL cargo movement, intermodal sea-to-rail corridors, and ocean port coordination across major global trade routes.",
    items: ["FCL & LTL Container Shipping", "Port-to-Port & Door-to-Door", "Vessel Chartering & Cargo Tracking"],
  },
  {
    icon: <IconZap />,
    title: "Air Freight",
    tag: "AIR FREIGHT",
    image: "/images/services/air-freight.webp",
    desc: "Time-critical international air cargo forwarding for high-value goods, pharmaceutical temperature-controlled shipments, and urgent express packages.",
    items: ["Priority & Charter Cargo Flights", "Temperature-Controlled Freight", "Airport-to-Airport Logistics"],
  },
  {
    icon: <IconTruck />,
    title: "Fleet & Transportation",
    tag: "LAND FREIGHT",
    image: "/images/services/fleet-transportation.webp",
    desc: "Reliable domestic road freight, dedicated fleet dispatch, full truckload (FTL), less-than-truckload (LTL), and seamless last-mile delivery network.",
    items: ["Domestic & Regional Fleet", "FTL & LTL Road Transportation", "GPS Tracked Last-Mile Delivery"],
  },
  {
    icon: <IconWarehouse />,
    title: "Warehousing",
    tag: "STORAGE & 3PL",
    image: "/images/services/warehousing.webp",
    desc: "State-of-the-art climate-controlled distribution hubs, inventory management systems, order fulfillment, and long-term secure warehousing.",
    items: ["Climate-Controlled Storage", "Inventory & Order Fulfillment", "Distribution & Cross-Docking"],
  },
  {
    icon: <IconClipboard />,
    title: "Customs Clearance",
    tag: "CUSTOMS & PORT",
    image: "/images/services/customs-clearance.webp",
    desc: "Complete documentation management, import/export clearance, duty calculation, customs brokerage, and port authority coordination.",
    items: ["Customs Documentation & Clearance", "Duty & Tariff Advisory", "Port & Terminal Coordination"],
  },
];

const WHY_ITEMS = [
  { icon: <IconLayers size={24} />, image: "/images/why-choose/end-to-end.webp", accent: "#cf5a39", title: "End-to-End Logistics", desc: "One partner for freight, transportation, warehousing, and customs clearance." },
  { icon: <IconZap size={24} />, image: "/images/why-choose/reliable.webp", accent: "#e2a642", title: "Reliable & Efficient", desc: "Timely deliveries and smooth operations you can count on." },
  { icon: <IconEye size={24} />, image: "/images/why-choose/transparent.webp", accent: "#78a9b8", title: "Transparent Services", desc: "Clear communication, pricing, and real-time shipment visibility." },
  { icon: <IconHeart size={24} />, image: "/images/why-choose/customer.webp", accent: "#d3ba83", title: "Customer-Focused", desc: "Dedicated support from pickup to final delivery." },
  { icon: <IconCpu size={24} />, image: "/images/why-choose/technology.webp", accent: "#758ca8", title: "Technology-Driven", desc: "Modern tools for better tracking and supply chain management." },
];

const DELIVERY_STEPS = [
  { code: "01", title: "Request a Quote", desc: "Share your shipment details, cargo requirements, destination, and preferred delivery schedule with our team." },
  { code: "02", title: "Plan the Shipment", desc: "We determine the most efficient route, transportation method, timeline, and handling requirements for your cargo." },
  { code: "03", title: "Move and Track", desc: "Your shipment moves through our trusted network with clear updates and real-time visibility throughout transit." },
  { code: "04", title: "Deliver with Confidence", desc: "We coordinate the final delivery so your shipment arrives safely, securely, and according to schedule." },
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
  { name: "Saudi Arabia", desc: "Kingdom Network" },
  { name: "Qatar", desc: "Gulf Corridor" },
  { name: "Oman", desc: "Port Connectivity" },
  { name: "Bahrain", desc: "Island Gateway" },
  { name: "Kuwait", desc: "Northern Gulf" },
  { name: "Singapore", desc: "Southeast Asia Hub" },
  { name: "Malaysia", desc: "Regional Distribution" },
  { name: "China", desc: "Manufacturing Routes" },
  { name: "Japan", desc: "Pacific Trade" },
  { name: "South Korea", desc: "Technology Corridor" },
  { name: "Germany", desc: "European Gateway" },
  { name: "Netherlands", desc: "Port of Europe" },
  { name: "United States", desc: "North America" },
];

const STATS = [
  { value: "2026", label: "Founded" },
  { value: "5", label: "Core Services" },
  { value: "15+", label: "Regions Served" },
  { value: "10+", label: "Industries Served" },
];

const SHIPMENT_PATHS = [
  {
    code: "01",
    kicker: "ONE MOVE",
    title: "I have a shipment to move",
    desc: "Start with one clear requirement. We help shape the route, mode, documentation, pickup, and delivery around your cargo and timeline.",
    action: "Plan one shipment",
  },
  {
    code: "02",
    kicker: "RECURRING FLOW",
    title: "I need a reliable trade lane",
    desc: "Build a repeatable freight program for regular volumes, with coordinated handoffs, shipment visibility, and support across each movement.",
    action: "Discuss a recurring lane",
  },
  {
    code: "03",
    kicker: "CONNECTED OPERATION",
    title: "I need end-to-end logistics",
    desc: "Connect freight, customs, transport, warehousing, and fulfillment into one scalable operating plan shaped around your supply chain.",
    action: "Design my logistics plan",
  },
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

function useSmoothScroll(paused: boolean, reduceMotion: boolean | null) {
  useEffect(() => {
    if (reduceMotion || paused) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
    });
    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [paused, reduceMotion]);
}

function useScrollWords(paused: boolean) {
  useEffect(() => {
    const words = Array.from(document.querySelectorAll<HTMLElement>(".scroll-copy"));
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const update = () => {
      frame = 0;
      const still = paused || preference.matches;
      const height = window.innerHeight;
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
    };
  }, [paused]);
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const number = Number.parseInt(value, 10);
    const suffix = value.replace(/[\d,]/g, "");
    let frame = 0;
    if (!Number.isFinite(number) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame = window.requestAnimationFrame(() => setDisplay(value));
      return () => window.cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 1200);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(`${Math.round(number * eased)}${suffix}`);
      if (progress < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <div ref={ref} className="about__stat reveal">
      <div className="about__stat-value">{display}</div>
      <div className="about__stat-label">{label}</div>
    </div>
  );
}

function CoverageRoute() {
  return (
    <div className="coverage-route" role="img" aria-label="Stylized world map showing Cargoworks coverage across India, the Gulf, Asia, Europe, and North America">
      <Image
        className="coverage-map coverage-map--accurate"
        src="/images/world-network-map.svg"
        alt=""
        width={1440}
        height={560}
        sizes="100vw"
        unoptimized
      />

      <div className="coverage-route__legend" aria-hidden="true">
        {REGIONS.slice(0, 10).map((region) => <span key={region.name}>{region.name}</span>)}
      </div>
    </div>
  );
}

function SwingingContainer() {
  const reduceMotion = useReducedMotion();
  const targetRotateX = useMotionValue(0);
  const targetRotateZ = useMotionValue(0);
  const rotateX = useSpring(targetRotateX, { stiffness: 70, damping: 12, mass: 0.9 });
  const rotateZ = useSpring(targetRotateZ, { stiffness: 58, damping: 10, mass: 1.05 });

  const resetSwing = () => {
    targetRotateX.set(0);
    targetRotateZ.set(0);
  };

  return (
    <motion.div
      className="industries-split__swing"
      style={reduceMotion ? undefined : { rotateX, rotateZ, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const y = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
        targetRotateZ.set(x * 7);
        targetRotateX.set(-y * 3.5);
      }}
      onPointerLeave={resetSwing}
    >
      <Image
        src="/images/hanging-container-v2.webp"
        alt=""
        width={1254}
        height={1254}
        sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 34vw"
      />
      <span className="industries-split__swing-hint">Move cursor to swing</span>
    </motion.div>
  );
}

function WhyFeatureGrid() {
  const [activeIndex, setActiveIndex] = useState(4);
  const lead = WHY_ITEMS[activeIndex];
  const supporting = WHY_ITEMS
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== activeIndex);

  return (
    <div className="container why-showcase" aria-label="Why choose Cargoworks">
      <motion.article
        key={lead.title}
        layoutId={`why-feature-${activeIndex}`}
        className="why-showcase__lead"
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={lead.image}
          alt=""
          fill
          sizes="(max-width: 720px) 100vw, (max-width: 1200px) 60vw, 850px"
          quality={90}
        />
        <div className="why-showcase__lead-shade" aria-hidden="true" />
        <div className="why-showcase__lead-top">
          <span>{String(activeIndex + 1).padStart(2, "0")} / Core advantage</span>
          <span className="why-showcase__icon" aria-hidden="true">{lead.icon}</span>
        </div>
        <div className="why-showcase__lead-copy">
          <h3>{lead.title}</h3>
          <p>{lead.desc}</p>
        </div>
      </motion.article>

      <div className="why-showcase__grid">
        {supporting.map(({ item, index }) => (
          <motion.button
            type="button"
            layoutId={`why-feature-${index}`}
            className="why-showcase__card"
            key={item.title}
            style={{ borderTopColor: item.accent }}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${item.title}`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="why-showcase__card-top">
              <span className="why-showcase__number">{String(index + 1).padStart(2, "0")}</span>
              <span className="why-showcase__icon" aria-hidden="true">{item.icon}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span className="why-showcase__action" aria-hidden="true">View feature <i>↗</i></span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const footerChat = whatsappLink("Hello Cargoworks, I would like to discuss a shipment.");
  const scrolled = useNavScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const desktopServicesRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (!desktopServicesRef.current?.contains(event.target as Node)) {
        desktopServicesRef.current?.removeAttribute("open");
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && desktopServicesRef.current?.open) {
        desktopServicesRef.current.removeAttribute("open");
        desktopServicesRef.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  const [motionPaused, setMotionPaused] = useState(false);
  const [preloaderVisible, setPreloaderVisible] = useState(true);

  const reduceMotion = useReducedMotion();

  useSmoothScroll(motionPaused, reduceMotion);
  useScrollReveal();
  useScrollWords(motionPaused);
  useScrollExperience(motionPaused);

  useEffect(() => {
    const startedAt = performance.now();
    let timer: number = 0;
    let fallbackTimer: number = 0;
    document.documentElement.classList.add("preloader-active");

    const dismiss = () => {
      window.clearTimeout(timer);
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("preloader-active");
      setPreloaderVisible(false);
    };

    if (reduceMotion) {
      dismiss();
      return;
    }

    let isHeroReady = Boolean(typeof window !== "undefined" && (window as unknown as { __heroReady?: boolean }).__heroReady);

    const tryFinish = () => {
      const elapsed = performance.now() - startedAt;
      const minDuration = 1200; // Time for Cargoworks brand animation
      const remaining = Math.max(0, minDuration - elapsed);

      window.clearTimeout(timer);
      timer = window.setTimeout(dismiss, remaining);
    };

    const onHeroReady = () => {
      isHeroReady = true;
      tryFinish();
    };

    if (isHeroReady) {
      tryFinish();
    } else {
      window.addEventListener("cargoworks:hero-ready", onHeroReady, { once: true });
    }

    // Safety fallback: ensure dismissal by 2200ms even on high network latency
    fallbackTimer = window.setTimeout(dismiss, 2200);

    return () => {
      window.removeEventListener("cargoworks:hero-ready", onHeroReady);
      window.clearTimeout(timer);
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("preloader-active");
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const close = () => {
      setMobileOpen(false);
      document.getElementById("mobile-menu-toggle")?.focus();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;
      const controls = [
        document.getElementById("mobile-menu-toggle"),
        ...document.querySelectorAll<HTMLElement>("#mobile-navigation a, #mobile-navigation button"),
      ].filter((node): node is HTMLElement => !!node && node.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
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
    setMobileServicesOpen(false);
    desktopServicesRef.current?.removeAttribute("open");
    const el = document.getElementById(id);
    if (el) {
      const chapterLead = el.hasAttribute("data-scroll-surface")
        ? parseFloat(window.getComputedStyle(el).paddingTop) : 0;
      const top = el.getBoundingClientRect().top + window.scrollY + chapterLead - 96;
      window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    }
  }


  return (
    <>
      <AnimatePresence>
        {preloaderVisible && <CargoworksPreloader reduceMotion={reduceMotion} />}
      </AnimatePresence>

      {/* ══ NAVBAR ════════════════════════════════════════════ */}
      <header className={`navbar${scrolled ? " scrolled" : ""}`} role="banner">
        <div className="container navbar__inner">
          <CargoworksLogo />

          <nav aria-label="Primary">
            <ul className="navbar__links">
              <li>
                <a href="#about" onClick={(e) => smoothTo(e, "about")}>About</a>
              </li>
              <li className="nav-dropdown">
                <details ref={desktopServicesRef}>
                  <summary>Services <svg className="services-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg></summary>
                  <div className="nav-dropdown__menu">
                    <div className="services-menu-heading">Built for every move</div>
                    {SERVICES.slice(0, 5).map((service, index) => (
                      <a key={service.title} href={`#service-${index + 1}`} onClick={(e) => smoothTo(e, `service-${index + 1}`)}>
                        <span className="services-menu-icon" aria-hidden="true">{service.icon}</span>
                        <span className="services-menu-copy"><strong>{service.title}</strong><small>{service.items[1]}</small></span>
                        <IconArrowRight size={16} />
                      </a>
                    ))}
                  </div>
                </details>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => smoothTo(e, "why-us")}>Why Choose</a>
              </li>
              <li>
                <a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Industries</a>
              </li>
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
      <nav id="mobile-navigation" className={`mobile-menu${mobileOpen ? " open" : ""}`} aria-label="Mobile" inert={!mobileOpen} data-lenis-prevent>
        <a href="#about" onClick={(e) => smoothTo(e, "about")}>About</a>
        <div className="mobile-services">
          <button type="button" className="mobile-services__toggle"
            aria-expanded={mobileServicesOpen} aria-controls="mobile-services-list"
            onClick={() => setMobileServicesOpen((open) => !open)}>
            Services <svg className="services-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
          </button>
          <div id="mobile-services-list" className="mobile-services__list" hidden={!mobileServicesOpen}>
            <a href="#services" onClick={(e) => smoothTo(e, "services")}>Explore all services <IconArrowRight size={16} /></a>
            {SERVICES.slice(0, 5).map((service, index) => (
              <a key={service.title} href={`#service-${index + 1}`} onClick={(e) => smoothTo(e, `service-${index + 1}`)}>
                <span className="services-menu-icon" aria-hidden="true">{service.icon}</span><span>{service.title}</span><IconArrowRight size={16} />
              </a>
            ))}
          </div>
        </div>
        <a href="#why-us" onClick={(e) => smoothTo(e, "why-us")}>Why Choose</a>
        <a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Industries</a>
        <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Contact</a>
        <a href="#contact" className="btn btn-primary btn-lg"
          onClick={(e) => smoothTo(e, "contact")}>
          Get a Quote <IconArrowRight />
        </a>
      </nav>

      <main id="main-content" className={motionPaused ? "motion-paused" : undefined}>
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <CinematicHero paused={motionPaused} onToggleMotion={() => setMotionPaused(!motionPaused)} onNavigate={smoothTo} />

        {/* ══ ABOUT ═════════════════════════════════════════════ */}
        <section id="about" className="about-section" data-scroll-surface="sand" aria-label="About Cargoworks">
          <div className="container">

            <div className="about__top">
              <div className="about__right">
                <div className="about__tag">About Cargoworks</div>
                <h2 className="about__title">
                  Modern Logistics for a Connected World
                </h2>
                <div className="about__established">Est. 2026 &nbsp;·&nbsp; Kochi, India</div>
                <p className="about__text">
                  Cargoworks is a modern logistics and supply chain company focused on making cargo movement simpler, faster, and more reliable. We provide flexible logistics solutions covering transportation, freight, warehousing, and end-to-end supply chain support.
                </p>
                <p className="about__text">
                  Our goal is to combine technology, efficiency, and customer-focused service to help businesses move their goods seamlessly and grow with confidence.
                </p>
              </div>
            </div>

            {/* Stat boxes — exact layout from reference */}
            <div className="about__stats">
              {STATS.map((stat) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>

          </div>
        </section>

        {/* ══ SERVICES (Horizontal Rows with Spiral Image Pop-up) ══ */}
        <section id="solutions" className="shipment-paths" data-scroll-surface="sand" aria-labelledby="shipment-paths-title">
          <div className="container">
            <div className="shipment-paths__header reveal">
              <div>
                <div className="label-line">Built around your operation</div>
              <h2 id="shipment-paths-title" className="section-title">Start where you are. Scale when you are ready.</h2>
              </div>
              <p className="section-desc">From one urgent movement to a connected logistics program, choose the level of support your business needs today.</p>
            </div>
            <div className="shipment-paths__grid">
              {SHIPMENT_PATHS.map((path, index) => (
                <article key={path.code} className={`shipment-path reveal reveal-delay-${index + 1}`}>
                  <div className="shipment-path__meta"><span>{path.code}</span><small>{path.kicker}</small></div>
                  <h3>{path.title}</h3>
                  <p>{path.desc}</p>
                  <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>{path.action} <IconArrowRight /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

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

            <div className="services-grid services-list">
              {SERVICES.slice(0, 5).map((service, index) => (
                <motion.article
                  id={`service-${index + 1}`}
                  key={service.title}
                  className={`service-card reveal reveal-delay-${(index % 3) + 1}`}
                >
                  <div className="service-card__content">
                    <div className="service-card__meta">
                      <span>0{index + 1}</span>
                      <small>{service.tag}</small>
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                  </div>
                  <div className="service-card__image">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      quality={90}
                    />
                  </div>
                  <div className="service-card__footer">
                    <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
                    <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>
                      Plan this route <IconArrowRight />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY CHOOSE US ═════════════════════════════════════ */}
        <section id="why-us" className="why" data-scroll-surface="slate">
          <div className="container">
            <div className="why__intro reveal">
              <div className="label-line why__eyebrow">
                Our Edge
              </div>
              <h2 className="why__statement">Why Choose Cargoworks?</h2>
              <p className="why__intro-copy">
                Five practical advantages. One logistics partner built to keep every shipment visible, reliable, and ready to move.
              </p>
            </div>
          </div>
          <WhyFeatureGrid />
        </section>

        {/* ══ INDUSTRIES & AREAS ════════════════════════════════ */}
        <section id="industries" className="industries" data-scroll-surface="dark">
          {/* Header */}
          <div className="container">
            <div className="industries__header" style={{ marginBottom: "2.5rem" }}>
              <div className="label-line" style={{ marginBottom: "0.875rem" }}>
                Sectors & Verticals
              </div>
              <h2 className="section-title">Industries Served</h2>
              <p className="section-desc">
                Tailored logistics engineered for diverse industry demands and global supply chains.
              </p>
            </div>
          </div>

          {/* Split industry list with suspended cargo centerpiece */}
          <div className="container">
            <div className="industries-split">
              <div className="industries-split__list industries-split__list--left">
                {SECTORS_GRID.slice(0, 3).map((sec, i) => (
                  <article key={sec.code} className={`industry-side-item reveal reveal-delay-${i + 1}`}>
                    <span className="industry-side-item__num">0{i + 1}</span>
                    <h3 className="industry-side-item__title">{sec.title}</h3>
                    <p className="industry-side-item__desc">{sec.desc}</p>
                  </article>
                ))}
              </div>

              <div className="industries-split__center" aria-hidden="true">
                <motion.div
                  className="industries-split__container"
                  initial={{ opacity: 0, y: -72, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <SwingingContainer />
                </motion.div>
              </div>

              <div className="industries-split__list industries-split__list--right">
                {SECTORS_GRID.slice(3).map((sec, i) => (
                  <article key={sec.code} className={`industry-side-item reveal reveal-delay-${i + 1}`}>
                    <span className="industry-side-item__num">0{i + 4}</span>
                    <h3 className="industry-side-item__title">{sec.title}</h3>
                    <p className="industry-side-item__desc">{sec.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Coverage / Areas Served */}
          <div className="coverage-network">
            <div className="container coverage-network__header reveal">
              <div className="label-line">Global Network</div>
              <div className="coverage-network__statement">
                <h2 className="section-title">We move across borders, so your business can move forward.</h2>
                <p className="section-desc">
                  One connected network serving 15+ regions across India, the Gulf, Asia, Europe, and North America—by ocean, air, and road.
                </p>
              </div>
            </div>
            <CoverageRoute />
          </div>
        </section>

        {/* ══ MISSION & VISION ══════════════════════════════════ */}
        <section id="mission" className="mission delivery-process" data-scroll-surface="rust" aria-labelledby="delivery-title">
          <div className="container">
            <div className="delivery-process__layout">
              <div className="delivery-process__content">
                <div className="delivery-process__header reveal">
                  <div className="label-line">How we deliver</div>
                  <h2 id="delivery-title" className="section-title">A simple process. Every step covered.</h2>
                  <p className="section-desc">A simple, coordinated process that keeps every movement clear from the first conversation to final delivery.</p>
                  <a className="delivery-process__cta" href="#contact" onClick={(e) => smoothTo(e, "contact")}>
                    Start shipping <IconArrowRight />
                  </a>
                </div>
                <div className="delivery-process__steps">
                  {DELIVERY_STEPS.map((step, index) => (
                    <article className={`delivery-step reveal reveal-delay-${index + 1}`} key={step.code}>
                      <span className="delivery-step__number">[{step.code}]</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.desc}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ══ CONTACT ═══════════════════════════════════════════ */}
        <ContactSection />
      </main>

      {/* ══ FOOTER (DELTA CAFÉS EDITORIAL STYLE) ═══════════════ */}
      <footer className="footer-minimal" role="contentinfo">

        <div className="container footer-minimal__inner">
          <div className="footer-minimal__main">
            <div className="footer-minimal__message">
              <span className="footer-minimal__eyebrow">LET&apos;S START SHIPPING</span>
              <h2>Moving cargo.<br /><span>Building momentum.</span></h2>
              <a href="#contact" className="footer-minimal__start" onClick={(e) => smoothTo(e, "contact")}>
                <span aria-hidden="true">■</span> Contact our team
              </a>
            </div>

            <div className="footer-minimal__company">
              <span className="footer-minimal__label">Company</span>
              <nav className="footer-minimal__nav" aria-label="Footer navigation">
                <a href="#about" onClick={(e) => smoothTo(e, "about")}>About</a>
                <a href="#services" onClick={(e) => smoothTo(e, "services")}>Services</a>
                <a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Industries</a>
                <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Contact</a>
              </nav>
            </div>
          </div>

          <div className="footer-minimal__bar">
            <div className="footer-minimal__links"><span>Support</span><a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Contact</a><a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Shipment enquiry</a></div>
            <div className="footer-minimal__links"><span>Explore</span><a href="#about" onClick={(e) => smoothTo(e, "about")}>About us</a><a href="#why-us" onClick={(e) => smoothTo(e, "why-us")}>Our edge</a></div>
            <div className="footer-minimal__links"><span>Solutions</span><a href="#services" onClick={(e) => smoothTo(e, "services")}>Services</a><a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Industries</a></div>
            <div className="footer-minimal__direct">
              <span>Phone &amp; WhatsApp</span>
              <a href={footerChat || "https://wa.me/917994841888"} target="_blank" rel="noopener noreferrer">+91 79948 41888 ↗</a>
              <span>Email</span>
              <a href="mailto:info@cargoworkslogistics.com">info@cargoworkslogistics.com</a>
            </div>
          </div>

          <a href="#hero" className="footer-minimal__wordmark" onClick={(e) => smoothTo(e, "hero")}>CARGOWORKS</a>
          <div className="footer-minimal__legal">
            <span>Cargoworks Logistics. Copyright &copy; {new Date().getFullYear()}. All rights reserved.</span>
            <a href="#hero" onClick={(e) => smoothTo(e, "hero")}>Back to top ↑</a>
          </div>
        </div>

      </footer>
    </>
  );
}
