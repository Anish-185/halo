# Media credits

All scenery is free-licensed stock. Halo is a fictional product, and every person, company and quote on the site is a placeholder.

## Video (Mixkit Free License)

| File | Scene | Source |
| --- | --- | --- |
| `public/media/mist-*` | Clouds drifting over forested mountains (hero) | https://mixkit.co/free-stock-video/misty-mountains-and-clouds-100190/ (4K original: https://assets.mixkit.co/active_storage/video_items/100190/1721168872/100190-video-2160.mp4) |
| `public/media/dusk-*` | Golden sunset over open sea (final CTA) | https://mixkit.co/free-stock-video/sunset-in-the-open-sea-from-the-top-of-a-38948/ (4K original: https://assets.mixkit.co/videos/38948/38948-2160.mp4) |

Both were cut from the 3840×2160 originals into seamless loops with `scripts/make-loop.sh` (mist: 16 s window, 3 s crossfade; dusk: 14 s window, 2.5 s crossfade), then encoded as:

- `*-2560.webm`: AV1, 2560×1440, about 3 MB (desktop, preferred)
- `*-2560.mp4`: H.264, 2560×1440, about 7 MB (desktop fallback)
- `*-1280.mp4`: H.264, 1280×720, about 3 MB (phones)
- `*-poster.webp`: the loop's first frame at 2560 px, served through `next/image` as AVIF/WebP

## Photography (Unsplash License)

Masters are 3200 px wide; `next/image` serves them as AVIF/WebP at the right size for each screen.

| File | Scene | Source |
| --- | --- | --- |
| `public/media/meadow.jpg` | Golden meadow at sunrise (live demo) | https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe |
| `public/media/lonetree.jpg` | Lone tree in morning mist (customers) | https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a |
| `public/media/field.jpg` | Green field at golden hour (footer) | https://images.unsplash.com/photo-1495107334309-fcf20504a5ab |

The Unsplash License doesn't require attribution. Each photo's page, with the photographer's name, can be found by opening the URL above on unsplash.com.

## Design references

The moodboard in `asset/` (provided by the project owner) guided the art direction: framed scenic heroes, two-tone headlines with a serif accent, mono meta readouts, smoky and frosted glass, grainy colour fields, time-of-day cards, and a torn-paper meadow footer. None of those images ship with the site.
