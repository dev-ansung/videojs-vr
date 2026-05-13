# videojs-vr

A fork of [videojs/videojs-vr](https://github.com/videojs/videojs-vr) that works with **Video.js 8** and **current Three.js releases**.

The upstream package has not been maintained since 2021. It breaks with Video.js 8 due to lifecycle API changes, and fails with modern Three.js due to removed and renamed APIs. This fork fixes both.

![videojs-vr animated preview](assets/videojs-vr-preview.gif)

## What was fixed

- **Video.js 8 compatibility** — updated plugin registration, player lifecycle hooks, and event handling to match the Video.js 8 API
- **Three.js compatibility** — replaced removed and renamed Three.js APIs with current equivalents; Three.js is now a proper peer dependency instead of a vendored copy
- **Build tooling** — modernized from legacy grunt/rollup setup to Vite + Rollup with ES module output

## Features

- 360° equirectangular (monoscopic and stereoscopic)
- 180° video (left-right and mono)
- Cube map and EAC projections
- Cardboard / WebVR headset support via `webvr-polyfill`
- Optional Omnitone ambisonic audio
- Mouse, touch, and device-orientation camera controls

## Install

```bash
bun add videojs-vr
# or
npm install videojs-vr
```

> **Peer dependencies:** `video.js` `^7 || ^8` and `three` `^0.125` must be installed separately.

## Quick Start

### Bundler

```javascript
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-vr/dist/lib/videojs-vr.css';
import VR from 'videojs-vr';

const player = videojs('my-player', { controls: true, fluid: true });

player.mediainfo = { projection: '360' };
player.vr({ projection: '360' });
```

### Script tag

```html
<link rel="stylesheet" href="https://unpkg.com/video.js/dist/video-js.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/dev-ansung/videojs-vr@main/dist/lib/videojs-vr.css">

<video id="player" class="video-js vjs-default-skin" controls>
  <source src="your-360-video.mp4" type="video/mp4">
</video>

<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script src="https://unpkg.com/three/build/three.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/dev-ansung/videojs-vr@main/dist/lib/videojs-vr.js"></script>

<script>
  var player = videojs('player');
  player.mediainfo = { projection: '360' };
  player.vr({ projection: '360' });
</script>
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `projection` | string | `'AUTO'` | Projection mode. See [Projections](#projections) for valid values. |
| `debug` | boolean | `false` | Enable verbose plugin logging to the console. |
| `forceCardboard` | boolean | `false` | Always show the cardboard/VR button, even on non-mobile devices. |
| `omnitone` | boolean | `false` | Enable Omnitone ambisonic audio support. |
| `omnitoneOptions` | object | `{}` | Options forwarded to the Omnitone controller. |
| `sphereDetail` | number | `32` | Tessellation level of the sphere mesh used for 360° rendering. |
| `disableTogglePlay` | boolean | `false` | Prevent click/tap from toggling play/pause (useful for VR mode). |

## Projections

Pass one of these strings to the `projection` option or set it via `player.mediainfo.projection`:

| Value | Description |
| --- | --- |
| `360` | Equirectangular monoscopic |
| `360_LR` | Equirectangular stereoscopic, left-right split |
| `360_TB` | Equirectangular stereoscopic, top-bottom split |
| `360_CUBE` | Cube map |
| `180` | 180° equirectangular |
| `180_LR` | 180° stereoscopic, left-right split |
| `180_MONO` | 180° monoscopic |
| `EAC` | Equi-Angular Cubemap |
| `EAC_LR` | Equi-Angular Cubemap stereoscopic |
| `NONE` | Disable the plugin for this source |
| `AUTO` | Detect from `player.mediainfo.projection` at play time |

## Development

```bash
# Install dependencies
bun install

# Start the Vite dev server with the React demo
bun run dev

# Build library + demo
bun run build

# Build only the library (dist/lib)
bun run build:lib

# Build only the demo (dist/demo)
bun run build:demo

# Preview the built demo
bun run serve
```

## Repository Layout

```
src/
  videojs-vr/   # Plugin source (JS, SCSS, WebVR adapters)
  demo/         # React demo and static HTML demo
dist/
  lib/          # Built library — videojs-vr.js, videojs-vr.es.js, videojs-vr.css
  demo/         # Built demo assets
```

## Notes

- This plugin uses legacy WebVR APIs (`navigator.getVRDisplays`, `requestPresent`) polyfilled by `webvr-polyfill`. Native WebXR is not currently supported.
- Three.js is a peer dependency and must be loaded separately when using the script-tag bundle.

## License

MIT
