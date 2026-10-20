# Production handoff

Use Node.js 22 LTS or a newer supported LTS release.

```sh
npm ci
npm run lint
npm run build
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

`globals.css` contains base and legacy styles. Contact, Our Edge, and mobile
styles are imported separately in `app/page.tsx`. Avoid deleting legacy selectors
without checking all responsive layouts.

Run `npm audit --omit=dev` alongside lint and build checks before releases.

As of 2026-10-20, the production dependency audit is clean. The full audit reports
five high-severity development-only findings through `braces` in the Next.js lint
toolchain. The suggested forced fix downgrades `eslint-config-next` to version 14;
do not apply it to this Next.js 16 project. Recheck for a compatible upstream fix.
Browser visual testing is still needed on actual mobile devices before launch.
