"use client";

import { useEffect, useRef, type RefObject } from "react";
import sequence from "./hero-sequence.json";

type Frame = { image: CanvasImageSource; width: number; height: number; release: () => void };

async function decodeFrame(blob: Blob): Promise<Frame> {
  if (typeof createImageBitmap === "function") {
    try {
      const image = await createImageBitmap(blob);
      return { image, width: image.width, height: image.height, release: () => image.close() };
    } catch {
      // Some browsers expose ImageBitmap but cannot decode every supported image format.
    }
  }
  const url = URL.createObjectURL(blob);
  const image = new window.Image();
  try {
    image.src = url;
    await image.decode();
    return { image, width: image.naturalWidth, height: image.naturalHeight, release: () => { image.src = ""; } };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function useHeroSequence(
  sectionRef: RefObject<HTMLElement | null>,
  canvasRef: RefObject<HTMLCanvasElement | null>,
  paused: boolean,
) {
  const pausedRef = useRef(paused);
  const refreshRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    pausedRef.current = paused;
    refreshRef.current?.();
  }, [paused]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: false });
    if (!section || !canvas || !context) return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const cache = new Map<number, Frame>();
    // Keep compressed bytes separately: revisiting a frame must not wait for the network.
    const downloaded = new Map<number, Blob>();
    const decoding = new Set<number>();
    const pending = new Map<number, AbortController>();
    const failures = new Map<number, { attempts: number; retryAt: number }>();
    const preloadOrder: number[] = [];
    for (let index = 0; index < sequence.frameCount; index += 8) preloadOrder.push(index);
    preloadOrder.push(sequence.frameCount - 1);
    for (let index = 0; index < sequence.frameCount; index++) {
      if (!preloadOrder.includes(index)) preloadOrder.push(index);
    }
    const panels = Array.from(section.querySelectorAll<HTMLElement>(".cinematic-hero__chapter"));
    let variant = mobile.matches ? "mobile" : "desktop";
    let disposed = false;
    let visible = false;
    let tick = 0;
    let retryTimer = 0;
    let generation = 0;
    let target = 0;
    let drawn = -1;
    let direction = 1;
    let lastProgress = -1;
    let width = 0;
    let height = 0;
    let scrollDistance = 1;
    let sectionTop = 0;

    const enabled = () => !disposed && visible && !pausedRef.current && !preference.matches && !document.hidden;
    const abortPending = () => {
      for (const controller of pending.values()) controller.abort();
      pending.clear();
    };
    const clearCache = () => {
      generation++;
      for (const frame of cache.values()) frame.release();
      cache.clear();
      downloaded.clear();
      decoding.clear();
      failures.clear();
      drawn = -1;
    };
    const recordFailure = (index: number) => {
      const attempts = (failures.get(index)?.attempts ?? 0) + 1;
      failures.set(index, { attempts, retryAt: performance.now() + 600 });
      if (attempts < 3) {
        window.clearTimeout(retryTimer);
        retryTimer = window.setTimeout(schedule, 650);
      }
    };
    const draw = () => {
      if (!width || !height) return;
      let nearest = -1;
      let distance = Infinity;
      for (const index of cache.keys()) {
        const delta = Math.abs(index - target);
        if (delta < distance) { nearest = index; distance = delta; }
        if (delta === 0) break;
      }
      if (nearest < 0 || nearest === drawn) return;
      const frame = cache.get(nearest)!;
      const scale = Math.max(width / frame.width, height / frame.height);
      const w = frame.width * scale;
      const h = frame.height * scale;
      context.drawImage(frame.image, (width - w) / 2, (height - h) / 2, w, h);
      drawn = nearest;
      canvas.dataset.frame = String(nearest);
      canvas.style.opacity = "1";
    };

    const loadWindow = () => {
      if (!enabled()) return;
      // Decode only a small window, but progressively download the complete sequence.
      // Aborting requests on every scroll change starves playback on real networks.
      const radius = connection?.saveData ? 1 : target === 0 ? 2 : mobile.matches ? 6 : 8;
      const wanted = [target];
      for (let offset = 1; offset <= radius; offset++) wanted.push(target + offset * direction);
      for (let offset = 1; offset <= Math.min(radius, 3); offset++) wanted.push(target - offset * direction);
      const keep = new Set(wanted);
      let nearest = -1;
      let distance = Infinity;
      for (const index of downloaded.keys()) {
        if (Math.abs(index - target) < distance) { nearest = index; distance = Math.abs(index - target); }
      }
      if (nearest >= 0) keep.add(nearest);
      for (const [index, frame] of cache) {
        if (!keep.has(index) && index !== drawn) { frame.release(); cache.delete(index); }
      }
      const decodeOrder = nearest >= 0 ? [target, nearest, ...wanted] : wanted;
      for (const index of decodeOrder) {
        if (decoding.size >= 2) break;
        const blob = downloaded.get(index);
        if (!blob || cache.has(index) || decoding.has(index)) continue;
        decoding.add(index);
        const startedGeneration = generation;
        void decodeFrame(blob).then((frame) => {
          if (disposed || startedGeneration !== generation) { frame.release(); return; }
          cache.set(index, frame);
        }).catch(() => {
          if (startedGeneration === generation) { downloaded.delete(index); recordFailure(index); }
        }).finally(() => {
          if (startedGeneration === generation) { decoding.delete(index); schedule(); }
        });
      }

      const queue = connection?.saveData ? wanted : [...wanted, ...preloadOrder];
      for (const index of queue) {
        if (pending.size >= (connection?.saveData ? 1 : 6)) break;
        const failure = failures.get(index);
        if (index < 0 || index >= sequence.frameCount || downloaded.has(index) || pending.has(index)
          || (failure && (failure.attempts >= 3 || performance.now() < failure.retryAt))) continue;
        const controller = new AbortController();
        pending.set(index, controller);
        const path = `/images/hero-sequence/${variant}/frame-${String(index + 1).padStart(4, "0")}.webp?v=${sequence.version}`;
        void fetch(path, { signal: controller.signal, priority: index === target ? "high" : "low" })
          .then((response) => {
            if (!response.ok) throw new Error(`Frame request failed: ${response.status}`);
            return response.blob();
          })
          .then((blob) => {
            if (controller.signal.aborted || disposed) return;
            downloaded.set(index, blob);
          })
          .catch(() => {
            if (controller.signal.aborted || disposed) return;
            recordFailure(index);
          })
          .finally(() => {
            if (pending.get(index) === controller) pending.delete(index);
            if (enabled()) schedule();
          });
      }
    };

    const update = () => {
      tick = 0;
      if (!enabled()) return;
      const progress = Math.max(0, Math.min(1, (window.scrollY - sectionTop) / scrollDistance));
      const next = Math.round(progress * (sequence.frameCount - 1));
      if (next !== target) direction = next > target ? 1 : -1;
      target = next;
      // Loaded frames and scroll events share one paint; no React render per frame.
      if (progress !== lastProgress) {
        lastProgress = progress;
        section.style.setProperty("--film-progress", String(progress));
        panels.forEach((panel, index) => {
          const center = index / 2;
          panel.style.opacity = String(Math.max(0, Math.min(1, (0.24 - Math.abs(progress - center)) / 0.09)));
          panel.style.transform = `translateY(${(center - progress) * 45}px)`;
        });
      }
      draw();
      loadWindow();
    };
    function schedule() { if (enabled() && !tick) tick = requestAnimationFrame(update); }
    const refresh = () => {
      if (!enabled()) { abortPending(); cancelAnimationFrame(tick); tick = 0; }
      else schedule();
    };
    const resize = () => {
      const nextVariant = mobile.matches ? "mobile" : "desktop";
      if (nextVariant !== variant) {
        variant = nextVariant;
        abortPending();
        clearCache();
        canvas.style.opacity = "0";
      }
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, (mobile.matches ? 1024 : 1440) / Math.max(1, cssWidth, cssHeight));
      const nextWidth = Math.round(cssWidth * ratio);
      const nextHeight = Math.round(cssHeight * ratio);
      if (nextWidth !== width || nextHeight !== height) {
        width = canvas.width = nextWidth;
        height = canvas.height = nextHeight;
        drawn = -1;
        draw();
      }
      sectionTop = section.getBoundingClientRect().top + window.scrollY;
      scrollDistance = Math.max(1, section.offsetHeight - cssHeight);
      schedule();
    };
    const onPreference = () => {
      if (preference.matches) { abortPending(); clearCache(); canvas.style.opacity = "0"; }
      lastProgress = -1;
      resize();
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      refresh();
    });
    const observer = new ResizeObserver(resize);
    intersection.observe(section);
    observer.observe(canvas);
    observer.observe(section);
    refreshRef.current = refresh;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", refresh);
    preference.addEventListener("change", onPreference);
    resize();

    return () => {
      disposed = true;
      window.clearTimeout(retryTimer);
      refreshRef.current = null;
      cancelAnimationFrame(tick);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", refresh);
      preference.removeEventListener("change", onPreference);
      abortPending();
      clearCache();
    };
  }, [sectionRef, canvasRef]);
}
