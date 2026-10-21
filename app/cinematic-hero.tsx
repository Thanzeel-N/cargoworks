"use client";

import { useRef } from "react";
import Image from "next/image";
import sequence from "./hero-sequence.json";
import { useHeroSequence } from "./use-hero-sequence";
import "./cinematic-hero.css";

const chapters = [
  { label: "End-to-end logistics", title: <>Cargo<br />in motion.</>, detail: "Sea. Air. Land. Connected." },
  { label: "Freight without limits", title: <>Across every<br />border.</>, detail: "Your cargo. A world of possibilities." },
  { label: "From origin to destination", title: <>Delivered<br />with care.</>, detail: "One partner. Every step of the way." },
];

export default function CinematicHero({ paused, onToggleMotion, onNavigate }: {
  paused: boolean;
  onToggleMotion: () => void;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useHeroSequence(sectionRef, canvasRef, paused);

  return (
    <section id="hero" className="cinematic-hero" ref={sectionRef} aria-label="Cargoworks logistics">
      <div className="cinematic-hero__stage">
        <Image className="cinematic-hero__poster" src={`/images/hero-sequence/poster.webp?v=${sequence.version}`} alt="" fill priority sizes="100vw" unoptimized />
        <canvas className="cinematic-hero__canvas" ref={canvasRef} aria-hidden="true" />
        <div className="cinematic-hero__shade" aria-hidden="true" />
        <h1 className="cinematic-hero__sr-only">Cargo in motion. End-to-end logistics by sea, air and land.</h1>
        <div className="cinematic-hero__copy" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <div className="cinematic-hero__chapter" key={chapter.label} style={{ opacity: index === 0 ? 1 : 0 }}>
              <p className="cinematic-hero__eyebrow"><span />{chapter.label}</p>
              <p className="cinematic-hero__title">{chapter.title}</p>
              <p className="cinematic-hero__detail">{chapter.detail}</p>
            </div>
          ))}
        </div>
        <a className="cinematic-hero__cta" id="hero-cta-primary" href="#contact" onClick={(e) => onNavigate(e, "contact")}>Move with us <span aria-hidden="true">↗</span></a>
        <div className="cinematic-hero__footer">
          <a className="cinematic-hero__scroll" href="#about" onClick={(e) => onNavigate(e, "about")}><span aria-hidden="true">↓</span> <span className="cinematic-hero__scroll-label">Scroll to explore</span></a>
          <span className="cinematic-hero__modes">Sea / Air / Land</span>
          <button type="button" className="cinematic-hero__motion" aria-pressed={paused} onClick={onToggleMotion}>{paused ? "Resume motion" : "Pause motion"}</button>
        </div>
        <div className="cinematic-hero__progress" aria-hidden="true"><span /></div>
      </div>
    </section>
  );
}
