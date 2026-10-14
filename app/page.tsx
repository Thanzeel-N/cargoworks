"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";
import {
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
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

function IconFacebook({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconInstagram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function IconX({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
    image: "/images/freight_sea_ship.webp",
    desc: "Global containerized shipping, FCL/LTL cargo movement, intermodal sea-to-rail corridors, and ocean port coordination across major global trade routes.",
    items: ["FCL & LTL Container Shipping", "Port-to-Port & Door-to-Door", "Vessel Chartering & Cargo Tracking"],
  },
  {
    icon: <IconZap />,
    title: "Air Freight Express",
    tag: "AIR FREIGHT",
    image: "/images/freight_air_cargo.webp",
    desc: "Time-critical international air cargo forwarding for high-value goods, pharmaceutical temperature-controlled shipments, and urgent express packages.",
    items: ["Priority & Charter Cargo Flights", "Temperature-Controlled Freight", "Airport-to-Airport Logistics"],
  },
  {
    icon: <IconTruck />,
    title: "Transportation & Last-Mile Delivery",
    tag: "LAND FREIGHT",
    image: "/images/freight_trucking.webp",
    desc: "Reliable domestic road freight, dedicated fleet dispatch, full truckload (FTL), less-than-truckload (LTL), and seamless last-mile delivery network.",
    items: ["Domestic & Regional Fleet", "FTL & LTL Road Transportation", "GPS Tracked Last-Mile Delivery"],
  },
  {
    icon: <IconWarehouse />,
    title: "Smart Warehousing & Storage",
    tag: "STORAGE & 3PL",
    image: "/images/freight_warehouse.webp",
    desc: "State-of-the-art climate-controlled distribution hubs, inventory management systems, order fulfillment, and long-term secure warehousing.",
    items: ["Climate-Controlled Storage", "Inventory & Order Fulfillment", "Distribution & Cross-Docking"],
  },
  {
    icon: <IconClipboard />,
    title: "Customs Clearance & Trade Compliance",
    tag: "CUSTOMS & PORT",
    image: "/images/freight_customs.webp",
    desc: "Complete documentation management, import/export clearance, duty calculation, customs brokerage, and port authority coordination.",
    items: ["Customs Documentation & Clearance", "Duty & Tariff Advisory", "Port & Terminal Coordination"],
  },
  {
    icon: <IconLayers />,
    title: "3PL & Integrated Supply Chain",
    tag: "SUPPLY CHAIN",
    image: "/images/service_6.webp",
    desc: "End-to-end supply chain orchestration, multi-modal transport planning, vendor management, and real-time shipment visibility dashboards.",
    items: ["Multi-Modal Transport Planning", "Supply Chain Optimization", "Real-Time Tracking & Telemetry"],
  },
];

const WHY_ITEMS = [
  { icon: <IconLayers size={24} />, image: "/images/why-end-to-end.webp", accent: "#cf5a39", title: "End-to-End Logistics", desc: "One partner for freight, transportation, warehousing, and customs clearance." },
  { icon: <IconZap size={24} />, image: "/images/why-reliable.webp", accent: "#e2a642", title: "Reliable & Efficient", desc: "Timely deliveries and smooth operations you can count on." },
  { icon: <IconEye size={24} />, image: "/images/why-transparent.webp", accent: "#78a9b8", title: "Transparent Service", desc: "Clear communication, pricing, and real-time shipment visibility." },
  { icon: <IconCpu size={24} />, image: "/images/why-technology.webp", accent: "#758ca8", title: "Technology-Driven", desc: "Modern tools for better tracking and supply chain management." },
  { icon: <IconHeart size={24} />, image: "/images/why-customer.webp", accent: "#d3ba83", title: "Customer-Focused", desc: "Dedicated support from pickup to final delivery." },
  { icon: <IconTrendingUp size={24} />, image: "/images/why-scalable.webp", accent: "#83a687", title: "Scalable Logistics", desc: "Solutions designed to grow alongside your business." },
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
  { value: "6", label: "Core Services" },
  { value: "15+", label: "Regions Served" },
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

function ScrollWords({ children }: { children: string }) {
  return <span className="scroll-copy">{children.split(" ").map((word, index) => (
    <span key={index}><span className="scroll-word">{word}</span>{" "}</span>
  ))}</span>;
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
  const routeRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [truckRotation, setTruckRotation] = useState(0);
  const { scrollYProgress } = useScroll({
    target: routeRef,
    offset: ["start 88%", "end 12%"],
  });
  const truckY = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    ["-58vh", "0vh", "0vh", "58vh"],
  );
  const truckOpacity = useTransform(
    scrollYProgress,
    (progress) => (progress >= 0.07 && progress <= 0.93 ? 1 : 0),
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const previous = scrollYProgress.getPrevious();
    if (previous === undefined) return;

    if (latest < previous && latest >= 0.93) {
      setTruckRotation((current) => (current === 180 ? current : 180));
    } else if (latest > previous && latest <= 0.07) {
      setTruckRotation((current) => (current === 0 ? current : 0));
    }
  });

  return (
    <div ref={routeRef} className="coverage-route">
      <div className="coverage-route__stage" aria-hidden="true">
        <div className="coverage-route__truck-anchor">
          <motion.div
            className="coverage-truck"
            animate={{ rotate: truckRotation }}
            transition={{
              rotate: reduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            }}
            style={{
              y: reduceMotion ? 0 : truckY,
              opacity: truckOpacity,
            }}
          >
            <Image
              src="/images/top-view-container-truck-v2.webp"
              alt=""
              width={1024}
              height={1536}
              sizes="(max-width: 700px) 34vw, 15vw"
            />

          </motion.div>
        </div>
      </div>

      <div className="coverage-country-list reveal reveal-delay-2">
        {REGIONS.map((region, index) => (
          <article key={region.name} className="coverage-country-row">
            <div className="coverage-country-row__primary">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{region.name}</h3>
            </div>
            <div className="coverage-country-row__lane" aria-hidden="true" />
            <p>{region.desc}</p>
          </article>
        ))}
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

function WhyCarousel() {
  const [active, setActive] = useState(0);
  const total = WHY_ITEMS.length;
  const select = (next: number) => setActive((next + total) % total);
  const relativeIndex = (index: number) => {
    let offset = index - active;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  return (
    <div className="why-carousel reveal" aria-roledescription="carousel" aria-label="Why choose Cargoworks">
      <motion.div
        className="why-carousel__stage"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={(_, info) => {
          if (info.offset.x < -55) select(active + 1);
          if (info.offset.x > 55) select(active - 1);
        }}
      >
        {WHY_ITEMS.map((item, index) => {
          const offset = relativeIndex(index);
          const distance = Math.abs(offset);
          const visible = distance <= 2;

          return (
            <button
              type="button"
              key={item.title}
              className={`why-carousel__card${offset === 0 ? " is-active" : ""}`}
              style={{
                "--why-x": `${offset * 73}%`,
                "--why-y": `${distance * 42}px`,
                "--why-rotate": `${offset * 6}deg`,
                "--why-scale": offset === 0 ? "1" : distance === 1 ? "0.79" : "0.67",
                "--why-opacity": visible ? (offset === 0 ? "1" : distance === 1 ? "0.64" : "0.25") : "0",
                "--why-accent": item.accent,
                zIndex: 10 - distance,
                pointerEvents: visible ? "auto" : "none",
              } as React.CSSProperties}
              onClick={() => select(index)}
              aria-label={`Show ${item.title}`}
              aria-current={offset === 0 ? "true" : undefined}
            >
              <Image src={item.image} alt="" fill sizes="(max-width: 700px) 76vw, 28vw" />
              <span className="why-carousel__shade" />
              <span className="why-carousel__topline">
                <span className="why-carousel__icon" aria-hidden="true">{item.icon}</span>
                <small>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</small>
              </span>
              <span className="why-carousel__meta">
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="why-carousel__controls">
        <button type="button" onClick={() => select(active - 1)} aria-label="Previous advantage">&larr;</button>
        <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button type="button" onClick={() => select(active + 1)} aria-label="Next advantage">&rarr;</button>
      </div>
      <p className="why-carousel__hint">Drag the cards to explore</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Home() {
  const scrolled = useNavScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const serviceChaptersRef = useRef<HTMLDivElement>(null);

  useSmoothScroll(motionPaused, reduceMotion);
  useScrollReveal();
  useScrollWords(motionPaused);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroContentYRaw = useTransform(heroProgress, [0, 1], [0, -76]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.72, 1], [1, 0.96, 0]);
  const heroContentY = useSpring(heroContentYRaw, { stiffness: 110, damping: 28 });
  const { scrollYProgress: serviceProgress } = useScroll({
    target: serviceChaptersRef,
    offset: ["start center", "end center"],
  });

  useMotionValueEvent(serviceProgress, "change", (latest) => {
    const nextService = Math.max(
      0,
      Math.min(SERVICES.length - 1, Math.floor(latest * SERVICES.length)),
    );
    setActiveService((current) => current === nextService ? current : nextService);
  });

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
        {/* ══ HERO ══════════════════════════════════════════════ */}
        <section ref={heroRef} id="hero" className="hero" aria-label="Hero">
          {/* Background */}
          <div className="hero__bg-image" aria-hidden="true" />
          <div className="hero__dots" aria-hidden="true" />
          <div className="hero__fade" aria-hidden="true" />

          {/* Centered layout */}
          <motion.div
            className="hero__body hero__body--center"
            style={{
              y: reduceMotion || motionPaused ? 0 : heroContentY,
              opacity: reduceMotion || motionPaused ? 1 : heroContentOpacity,
            }}
          >
            <div className="hero__content-center">
              <motion.div
                className="hero__eyebrow"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="hero__eyebrow-dot" />
                GLOBAL LOGISTICS NETWORK &nbsp;&middot;&nbsp; KOCHI HQ
              </motion.div>

              <h1 className="hero__headline hero__headline--center">
                <span className="hero__headline-mask">
                  <motion.span
                    initial={reduceMotion ? false : { y: "110%", rotate: 2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    MOVING CARGO
                  </motion.span>
                </span>
                <span className="hero__headline-mask">
                  <motion.span
                    className="hl-accent"
                    initial={reduceMotion ? false : { y: "110%", rotate: 2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: 0.95, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    BEYOND BORDERS
                  </motion.span>
                </span>
              </h1>

              <motion.p
                className="hero__intro"
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.52 }}
              >
                Across oceans. Across continents. One connected logistics partner
                to keep your business moving.
              </motion.p>

              <motion.div
                className="hero__actions hero__actions--center"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.64 }}
              >
                <a id="hero-cta-primary" href="#contact"
                  className="btn btn-primary btn-lg"
                  onClick={(e) => smoothTo(e, "contact")}>
                  Get a Quote <IconArrowRight />
                </a>
                <a id="hero-cta-secondary" href="#services"
                  className="btn btn-ghost btn-lg"
                  onClick={(e) => smoothTo(e, "services")}>
                  Explore services <IconArrowRight size={13} />
                </a>
              </motion.div>

            </div>
          </motion.div>

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
              {STATS.map((stat) => (
                <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
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

            <div className="service-story">
              <div className="service-story__media" aria-live="polite">
                <div className="service-story__frame">
                  {SERVICES.map((service, index) => {
                    const isActive = activeService === index;
                    return (
                    <motion.div
                      key={service.image}
                      className="service-story__image"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.025 }}
                      transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                      style={{ zIndex: isActive ? 2 : 1 }}
                      aria-hidden={!isActive}
                    >
                      <Image
                        src={service.image}
                        alt={isActive ? service.title : ""}
                        fill
                        sizes="(max-width: 900px) 100vw, 48vw"
                        loading="eager"
                      />
                    </motion.div>
                    );
                  })}
                  <div className="service-story__frame-ui" aria-hidden="true">
                    <span>CW / SERVICE 0{activeService + 1}</span>
                    <span>{SERVICES[activeService].tag}</span>
                  </div>
                  <div className="service-story__progress" aria-hidden="true">
                    <span style={{ transform: `scaleX(${(activeService + 1) / SERVICES.length})` }} />
                  </div>
                </div>
              </div>

              <div ref={serviceChaptersRef} className="service-story__chapters">
                {SERVICES.map((service, index) => (
                  <motion.article
                    key={service.title}
                    className={`service-story__chapter${activeService === index ? " is-active" : ""}`}
                  >
                    <span className="service-story__number">0{index + 1}</span>
                    <p className="service-story__tag">{service.tag}</p>
                    <h3>{service.title}</h3>
                    <p>{service.desc}</p>
                    <ul>
                      {service.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                    <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>
                      Plan this route <IconArrowRight />
                    </a>
                  </motion.article>
                ))}
              </div>
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
              <h2 className="why__statement">
                <span>Why choose.</span>
                <span>Cargoworks.</span>
              </h2>
              <p className="why__intro-copy">
                Six practical advantages. One logistics partner built to keep every shipment visible, reliable, and ready to scale.
              </p>
            </div>
          </div>
          <WhyCarousel />
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

            <CoverageRoute />
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

      {/* ══ FOOTER (DELTA CAFÉS EDITORIAL STYLE) ═══════════════ */}
      <footer className="footer-minimal" role="contentinfo">
        <div className="footer-minimal__image" aria-hidden="true" />
        <div className="footer-minimal__shade" aria-hidden="true" />

        <div className="container footer-minimal__inner">
          <div className="footer-minimal__main">
            <div className="footer-minimal__message">
              <span className="footer-minimal__eyebrow">Kochi / India / Worldwide</span>
              <h2>Built to move.<br /><span>Ready for everywhere.</span></h2>
            </div>

            <div className="footer-minimal__contact">
              <p>Have cargo ready to move?</p>
              <a href="mailto:info@cargoworkslogistics.com" className="footer-minimal__email">
                info@cargoworkslogistics.com
              </a>
              <a href="#contact" className="btn btn-primary btn-lg"
                onClick={(e) => smoothTo(e, "contact")}>
                Start a shipment <IconArrowRight />
              </a>
            </div>
          </div>

          <div className="footer-minimal__bar">
            <a href="#hero" className="footer-minimal__brand" onClick={(e) => smoothTo(e, "hero")}>
              <svg width="45" height="28" viewBox="0 0 100 56" fill="currentColor" aria-hidden="true">
                <path d="M0 7 6 1 100 9 100 46 97 47 97 12 94 13 94 47 89 48 89 12 80 14 80 49 70 50 70 11 55 14 55 52 40 53 40 8 20 11 20 54 6 56 0 50Z" />
              </svg>
              <span>Cargoworks</span>
            </a>

            <nav className="footer-minimal__nav" aria-label="Footer navigation">
              <a href="#about" onClick={(e) => smoothTo(e, "about")}>About</a>
              <a href="#services" onClick={(e) => smoothTo(e, "services")}>Services</a>
              <a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Coverage</a>
              <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Contact</a>
            </nav>

            <div className="footer-minimal__socials" aria-label="Social media channels">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedin /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IconInstagram /></a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X"><IconX /></a>
            </div>
          </div>

          <div className="footer-minimal__legal">
            <span>&copy; {new Date().getFullYear()} Cargoworks Logistics</span>
            <span>Global logistics / Kochi HQ</span>
            <a href="#hero" onClick={(e) => smoothTo(e, "hero")}>Back to top &uarr;</a>
          </div>
        </div>

        <div className="footer-minimal__legacy" hidden aria-hidden="true">
          <div className="footer-delta__wrapper">
            <div className="footer-delta__grid">
              {/* 1. Left Brand & Socials Column */}
              <div className="footer-delta__col-brand">
                <div className="footer-delta__emblem">
                  <span className="footer-delta__emblem-mark" aria-hidden="true">
                    <svg width="68" height="42" viewBox="0 0 100 56" fill="currentColor">
                      <path d="M0 7 6 1 100 9 100 46 97 47 97 12 94 13 94 47 89 48 89 12 80 14 80 49 70 50 70 11 55 14 55 52 40 53 40 8 20 11 20 54 6 56 0 50Z" />
                    </svg>
                  </span>
                  <span className="footer-delta__emblem-name">CARGOWORKS</span>
                </div>

                <div className="footer-delta__socials" aria-label="Social media channels">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-delta__social-btn" aria-label="LinkedIn">
                    <IconLinkedin />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-delta__social-btn" aria-label="Instagram">
                    <IconInstagram />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer-delta__social-btn" aria-label="X (Twitter)">
                    <IconX />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-delta__social-btn" aria-label="Facebook">
                    <IconFacebook />
                  </a>
                </div>
              </div>

              {/* Company */}
              <div className="footer-delta__col-nav">
                <h4 className="footer-delta__col-title">Company</h4>
                <ul className="footer-delta__links">
                  <li><a href="#about" onClick={(e) => smoothTo(e, "about")}>About Us</a></li>
                  <li><a href="#why-us" onClick={(e) => smoothTo(e, "why-us")}>Why Cargoworks</a></li>
                  <li><a href="#mission" onClick={(e) => smoothTo(e, "mission")}>Mission & Vision</a></li>
                  <li><a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Contact</a></li>
                </ul>
              </div>

              {/* Coverage */}
              <div className="footer-delta__col-nav">
                <h4 className="footer-delta__col-title">Coverage</h4>
                <ul className="footer-delta__links">
                  <li><a href="#industries" onClick={(e) => smoothTo(e, "industries")}>India Network</a></li>
                  <li><a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Gulf & Middle East</a></li>
                  <li><a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Asia-Pacific</a></li>
                  <li><a href="#industries" onClick={(e) => smoothTo(e, "industries")}>Global Trade Routes</a></li>
                </ul>
              </div>

              {/* Solutions */}
              <div className="footer-delta__col-nav">
                <h4 className="footer-delta__col-title">Solutions</h4>
                <ul className="footer-delta__links">
                  <li><a href="#services" onClick={(e) => smoothTo(e, "services")}>Sea & Air Freight</a></li>
                  <li><a href="#services" onClick={(e) => smoothTo(e, "services")}>Road & Last-Mile</a></li>
                  <li><a href="#services" onClick={(e) => smoothTo(e, "services")}>Warehousing</a></li>
                  <li><a href="#services" onClick={(e) => smoothTo(e, "services")}>Customs & 3PL</a></li>
                </ul>
              </div>

              {/* 5. Column 4: CONTACT & SUPPORT */}
              <div className="footer-delta__col-contact">
                <div className="footer-delta__contact-item">
                  <span className="footer-delta__contact-label">EMAIL</span>
                  <a href="mailto:info@cargoworkslogistics.com" className="footer-delta__contact-email">
                    info@cargoworkslogistics.com
                  </a>
                </div>

                <div className="footer-delta__contact-item">
                  <span className="footer-delta__contact-label">CUSTOMER SUPPORT</span>
                  <a href="tel:+914842900000" className="footer-delta__contact-phone">
                    +91 484 290 0000*
                  </a>
                </div>

                <div className="footer-delta__contact-item">
                  <span className="footer-delta__contact-label">OPERATIONS & DISPATCH</span>
                  <a href="tel:+919895000000" className="footer-delta__contact-phone">
                    +91 9895 000 000*
                  </a>
                  <p className="footer-delta__contact-footnote">
                    *available Mon–Sat 9:00 AM – 6:00 PM IST · Kochi HQ & Gulf Hubs
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Bar: Copyright, Legal Links, Back to Top */}
            <div className="footer-delta__bottom">
              <span className="footer-delta__brand-id">CARGOWORKS</span>

              <div className="footer-delta__legal-links">
                <span>&copy; {new Date().getFullYear()} Cargoworks Logistics</span>
                <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Privacy</a>
                <a href="#contact" onClick={(e) => smoothTo(e, "contact")}>Terms</a>
              </div>

              <div className="footer-delta__back-to-top">
                <a href="#hero" onClick={(e) => smoothTo(e, "hero")}>
                  BACK TO TOP <span aria-hidden="true">&uarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
