# Media credits

All scenery is free-licensed stock. Halo is a fictional product, and every person, company and quote on the site is a placeholder.

## Video (Mixkit Free License)

| File | Scene | Source |
| --- | --- | --- |
| `public/media/mist-*` | Clouds drifting over forested mountains (hero) | https://mixkit.co/free-stock-video/misty-mountains-and-clouds-100190/ (4K original: https://assets.mixkit.co/active_storage/video_items/100190/1721168872/100190-video-2160.mp4) |

It was cut from the 3840×2160 original into a seamless loop with `scripts/make-loop.sh` (16 s window, 3 s crossfade), then encoded as:

- `*-2560.webm`: AV1, 2560×1440, about 3 MB (desktop, preferred)
- `*-2560.mp4`: H.264, 2560×1440, about 7 MB (desktop fallback)
- `*-1280.mp4`: H.264, 1280×720, about 3 MB (phones)
- `*-poster.webp`: the loop's first frame at 2560 px, served through `next/image` as AVIF/WebP

## Photography (Unsplash License)

Masters are 3200 px wide; `next/image` serves them as AVIF/WebP at the right size for each screen.

| File | Scene | Source |
| --- | --- | --- |
| `public/media/blossom.jpg` | Cherry blossom against a pale sky (customers) | https://images.unsplash.com/photo-1522383225653-ed111181a951 |
| `public/media/hills.jpg` | Rolling green hills (footer, 2600 px master) | https://images.unsplash.com/photo-1501854140801-50d01698950b |

The Unsplash License doesn't require attribution. Each photo's page, with the photographer's name, can be found by opening the URL above on unsplash.com.

## Generated backgrounds

How it works, the live demo, the playground and the final CTA draw their backgrounds in code (`components/generative.tsx`): voice ridgelines, a halo-ring WebGL shader and a pointer-reactive dot field. Feature cards and use-case posters are flat CSS.

## Design references

The moodboard in `asset/` (provided by the project owner) guided the art direction: framed scenic heroes, two-tone headlines with a serif accent, mono meta readouts, smoky and frosted glass, grainy colour fields, time-of-day cards, and a torn-paper meadow footer. None of those images ship with the site.
