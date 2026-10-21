# Cinematic hero

The hero scrubs through 240 WebP frames extracted from `public/videos/IMG_4218.MP4`.
Desktop frames are 1440 pixels wide; mobile frames use a sharper portrait crop.
Only the appropriate variant is requested. The original MP4 is retained for regeneration
and is never downloaded by the hero.

The player progressively downloads the selected sequence, prioritizing the current window
and a sparse set of frames across the film before filling in the rest. Compressed bytes
are retained separately from a bounded window of decoded images. This keeps reverse
scrolling responsive without retaining 240 full-resolution decoded images.
In-flight downloads are allowed to finish while scrolling; cancelling them whenever the
target changes can freeze playback on production networks. Downloads and rendering stop
when paused, offscreen, or in a hidden tab. Temporary failures are retried up to three times.
Reduced-motion preferences use the poster without requesting animation frames.
Data Saver limits prefetching to adjacent frames and a single concurrent request.

Frame URLs include a content version from `app/hero-sequence.json`. Production headers
allow one year of browser caching for the current version. Regenerating the sequence
updates that version automatically, so changed frames receive fresh URLs.

To regenerate, install FFmpeg with WebP support and run:

```sh
node scripts/extract-hero-frames.mjs
# Or provide the path to FFmpeg:
node scripts/extract-hero-frames.mjs /path/to/ffmpeg
```

Commit the generated frames, poster, and JSON manifest together. Then run
`npm run lint` and `npm run build`. Check desktop and mobile scroll in both directions,
pause/resume, a resize across the mobile breakpoint, and reduced-motion mode.

Run `npx playwright install chromium` once, then `npm run test:hero` after building.
The regression suite starts the production server on port 3002 and tests continuous
scrolling with 220 ms of latency per frame request, reversal, pause/resume, transient
request failures, and reduced motion. Set `HERO_TEST_URL` to test an already-running
server instead, or `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to use an existing Chromium.
