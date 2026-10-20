import type { Metadata, Viewport } from "next";
import { Mukta_Mahee } from "next/font/google";
import "./globals.css";

/* ─────────────────────────────────────────────────────────────
   FONTS
   preload: true is the default — only the subsets/weights listed
   will be downloaded, keeping LCP fast.
───────────────────────────────────────────────────────────── */
const muktaMahee = Mukta_Mahee({
  variable: "--font-mukta-mahee",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

/* ─────────────────────────────────────────────────────────────
   SITE CONSTANTS
───────────────────────────────────────────────────────────── */
const SITE_URL = "https://cargoworkslogistics.com";
const SITE_NAME = "Cargoworks";
const TITLE = "Cargoworks — Simpler, Faster, More Reliable Cargo Movement";
const DESC =
  "Cargoworks is a modern logistics and supply chain company providing freight " +
  "forwarding, transportation, warehousing, customs clearance, and 3PL solutions " +
  "across India, UAE, the Middle East, Asia, and global trade routes.";

/* ─────────────────────────────────────────────────────────────
   METADATA  (Next.js 13+ Metadata API)
   Covers: basic SEO, Open Graph, Twitter Card, robots, canonical,
   icons, authors, and structured verification placeholders.
───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  /* ── Core ──────────────────────────────────────────────── */
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    // Subpages can use:  export const metadata = { title: "Page Name" }
    // and it will render as  "Page Name | Cargoworks"
    template: `%s | ${SITE_NAME}`,
  },
  description: DESC,
  keywords: [
    "logistics company India",
    "freight forwarding Kochi",
    "cargo movement",
    "supply chain solutions",
    "warehousing India",
    "customs clearance",
    "3PL provider",
    "freight forwarder UAE",
    "last-mile delivery",
    "import export logistics",
    "Middle East freight",
    "sea freight air freight",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /* ── Canonical & Robots ────────────────────────────────── */
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  /* ── Open Graph (Facebook, LinkedIn, WhatsApp previews) ── */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: TITLE,
    description: DESC,
    images: [{
      url: "/images/hero_bg.webp",
      width: 1376,
      height: 768,
      alt: "Cargoworks global logistics",
    }],
  },

  /* ── Twitter / X Card ──────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/images/hero_bg.webp"],
  },

  /* ── Search Console / Webmaster verification ───────────── */
  // PLACEHOLDER: Paste your verification codes here when you connect
  // Google Search Console and Bing Webmaster Tools.
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  //   yandex: "YOUR_YANDEX_CODE",
  // },
};

/* ─────────────────────────────────────────────────────────────
   VIEWPORT  (separate export required in Next.js 14+)
   Sets the theme-color for mobile browser chrome to match
   the site's black background.
───────────────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#1f2928",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─────────────────────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={muktaMahee.variable}
    >
      <body>{children}</body>
    </html>
  );
}
