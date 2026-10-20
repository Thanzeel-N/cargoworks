"use client";

import { useEffect } from "react";

/** Scroll-linked decoration only: content stays accessible without JavaScript. */
export function useScrollExperience(paused: boolean) {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    const groups = [".why-story__list", ".delivery-process__steps"]
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((element): element is HTMLElement => Boolean(element));
    const images = Array.from(document.querySelectorAll<HTMLElement>(
      ".service-card__image, .delivery-process__visual, .why-story__media"
    ));
    let frame = 0;
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    const update = () => {
      frame = 0;
      const enabled = !paused && !preference.matches;
      root.classList.toggle("scroll-experience", enabled);
      const height = window.innerHeight;
      groups.forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>("article"));
        let active = 0;
        let distance = Infinity;
        items.forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const nextDistance = Math.abs(rect.top + rect.height / 2 - height * 0.52);
          if (nextDistance < distance) { distance = nextDistance; active = index; }
        });
        items.forEach((item, index) => item.classList.toggle("scroll-current", enabled && index === active));
        const rect = group.getBoundingClientRect();
        group.style.setProperty("--journey-progress", String(enabled
          ? clamp((height * 0.52 - rect.top) / Math.max(1, rect.height)) : 1));
      });
      images.forEach((image) => {
        const rect = image.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > height) return;
        const progress = clamp((height - rect.top) / (height + rect.height));
        image.style.setProperty("--image-drift", `${enabled && window.innerWidth > 800 ? (progress - 0.5) * 36 : 0}px`);
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
      root.classList.remove("scroll-experience");
      groups.forEach((group) => {
        group.style.removeProperty("--journey-progress");
        group.querySelectorAll(".scroll-current").forEach((item) => item.classList.remove("scroll-current"));
      });
      images.forEach((image) => image.style.removeProperty("--image-drift"));
    };
  }, [paused]);
}
