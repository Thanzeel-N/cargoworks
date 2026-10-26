"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("cargoworks_cookie_consent");
      if (!saved) {
        setConsentGiven(false);
      }
    } catch {
      // Ignore localStorage exceptions in restricted contexts
    }

    const onOpen = () => setConsentGiven(false);
    window.addEventListener("cargoworks:open-cookie-preferences", onOpen);
    return () => window.removeEventListener("cargoworks:open-cookie-preferences", onOpen);
  }, []);

  const handleChoice = (choice: "accepted" | "essential") => {
    try {
      localStorage.setItem("cargoworks_cookie_consent", choice);
      document.cookie = `cargoworks_cookie_consent=${choice}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore
    }
    setConsentGiven(true);
  };

  if (!mounted || consentGiven) return null;

  return (
    <AnimatePresence>
      <motion.aside
        role="region"
        aria-label="Cookie preferences"
        className="cookie-banner"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cookie-banner__content">
          <div className="cookie-banner__header">
            <span className="cookie-banner__icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M7 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M16 16v.01" />
              </svg>
            </span>
            <span className="cookie-banner__title">Cookie &amp; Privacy Choices</span>
          </div>
          <p className="cookie-banner__desc">
            We use essential and analytics cookies to optimize site navigation, measure cargo routing telemetry, and enhance your logistics service experience.
          </p>
        </div>
        <div className="cookie-banner__actions">
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--accept"
            onClick={() => handleChoice("accepted")}
          >
            Accept All
          </button>
          <button
            type="button"
            className="cookie-banner__btn cookie-banner__btn--essential"
            onClick={() => handleChoice("essential")}
          >
            Essential Only
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
