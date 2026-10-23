# Production handoff

Use Node.js 22 LTS or a newer supported LTS release.

```sh
npm ci
npm run lint
npm run images:check
npm run build
npm run test:production
npm start
```

Deploy on a host supporting the Next.js server and image optimizer. Google Fonts
must be reachable during the build; Mukta Mahee is then served locally.
The canonical URL and sitemap use `https://cargoworkslogistics.com`.
Update `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts` if the domain changes.

## Enquiries

The contact form prepares an email to `info@cargoworkslogistics.com`; it does not
store submissions or send email from a backend. Visitors review and send drafts
in their own email applications.

To use WhatsApp instead, set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the verified business
number including country code before building. This number is public in the client
bundle. Do not put secrets in `NEXT_PUBLIC_*` variables.

Verify the domain, recipient mailbox, and any WhatsApp number before launch.
Social profiles and legal documents should only be linked after the business
provides real destinations; placeholder links have been removed.

## Assets and styling

Raster assets use WebP, apart from a legacy CSS-referenced JPEG. The network map
and logos use SVG. The map is illustrative, not a live shipment tracker.

Run `npm run images:optimize` after replacing or adding raster files directly in
`public/images`. The command caps dimensions at 1600 pixels without upscaling,
preserves transparency, strips metadata, and only writes smaller encodings.
Its tracked hash manifest prevents repeated lossy compression of unchanged files.
`npm run images:check` verifies that assets still match this manifest. Keep original
artwork separately or recover it from Git before changing compression settings.
The 2026-10-23 pass reduced 15 assets from 2,521,457 to 1,786,876 bytes (29.1%).

Hero frames are already encoded separately for desktop and mobile by
`scripts/extract-hero-frames.mjs`; the general optimizer intentionally skips them
to preserve their content version and immutable cache URLs.

`globals.css` contains base and legacy styles. Contact, Our Edge, and mobile
styles are imported separately in `app/page.tsx`. Avoid deleting legacy selectors
without checking all responsive layouts.

Run `npm audit --omit=dev` alongside lint and build checks before releases.

As of 2026-10-23, the production dependency audit is clean. The full audit reports
five high-severity development-only findings through `braces` in the Next.js lint
toolchain. The suggested forced fix downgrades `eslint-config-next` to version 14;
do not apply it to this Next.js 16 project. Recheck for a compatible upstream fix.
Browser visual testing is still needed on actual mobile devices before launch.

## Release verification

`npm run test:production` runs the hero motion/retry tests and checks desktop,
tablet, and mobile navigation, feature switching, layout overflow, enquiry draft
validation, metadata, security headers, and the production image optimizer.
Run `npx playwright install chromium` once if a browser is not installed.
Alternatively, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to an installed Chromium
browser. Tests start the built app on port 3002; set `HERO_TEST_URL` to check an
already running production server. Enquiry tests only prepare drafts and block
external destinations; they do not send messages.
