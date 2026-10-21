# Cinematic hero

The hero scrubs through 240 WebP frames extracted from `public/videos/IMG_4218.MP4`.
Desktop frames are 1440 pixels wide; mobile frames use a sharper portrait crop.
Only the appropriate variant is requested. The original MP4 is retained for regeneration
and is never downloaded by the hero.

The player starts with three frames, then loads a bounded window in the scroll direction.
It cancels stale requests after large scroll jumps, releases decoded frames outside the
window, and stops loading and rendering when paused, offscreen, or in a hidden tab.
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
