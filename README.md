# videojs-vr

Video.js plugin for 360° and VR playback with Three.js.

> Modernization note: this repository was updated to replace vendored Three.js
> copies with dependency-based modules. Library source lives in `src/videojs-vr`,
> demo source lives in `src/demo`, and build outputs are split across `dist/lib`
> and `dist/demo`.

## Overview

This plugin adds 360° equirectangular, stereoscopic 360° (left-right and top-bottom),
180°, cube map, and VR playback support to Video.js.

The runtime uses legacy WebVR APIs (`navigator.getVRDisplays`, `requestPresent`, and
`vrdisplay*` events) together with `webvr-polyfill`. It is compatible with modern
Video.js releases, but it does not use native WebXR.

## Install

```bash
npm install videojs-vr video.js
# or
bun add videojs-vr video.js
```

If you use the script-tag bundle, include Three.js separately.

## Quick Start

### Bundlers

The package registers the `vr` plugin when imported.

```javascript
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import VR from 'videojs-vr';
import 'videojs-vr/dist/lib/videojs-vr.css';

const player = videojs('my-player', {
  controls: true,
  fluid: true
});

player.mediainfo = { projection: '360' };
player.vr({ projection: '360' });
```

### Script Tag

```html
<link href="https://unpkg.com/video.js/dist/video-js.css" rel="stylesheet">
<link href="dist/lib/videojs-vr.css" rel="stylesheet">

<video id="video-player" class="video-js vjs-default-skin" controls>
  <source src="your-360-video.mp4" type="video/mp4">
</video>

<script src="https://unpkg.com/video.js/dist/video.min.js"></script>
<script src="https://unpkg.com/three/build/three.min.js"></script>
<script src="dist/lib/videojs-vr.js"></script>

<script>
  (function (window, videojs) {
    var player = window.player = videojs('video-player');
    player.mediainfo = { projection: '360' };
    player.vr({ projection: '360', debug: false });
  }(window, window.videojs));
</script>
```

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `projection` | string | `AUTO` | Default projection. Supported values include `360`, `360_LR`, `360_TB`, `360_CUBE`, `180`, `180_LR`, `180_MONO`, `EAC`, `EAC_LR`, `NONE`, and `AUTO`. |
| `debug` | boolean | `false` | Enable plugin logging. |
| `forceCardboard` | boolean | `false` | Force the cardboard control to appear. |
| `omnitone` | boolean | `false` | Enable Omnitone ambisonic audio support. |
| `omnitoneOptions` | object | `{}` | Options passed to the Omnitone controller. |
| `sphereDetail` | number | `32` | Sphere tessellation detail for 360° rendering. |
| `disableTogglePlay` | boolean | `false` | Disable click/tap toggling between play and pause. |

## Build And Demo

```bash
# Build library + demo outputs
bun run build

# Build the library only
bun run build:lib

# Build the demo only
bun run build:demo

# Start the demo dev server
bun run dev

# Preview the built demo output
bun run serve
```

Build output is written to:

- `dist/lib` for library bundles and styles
- `dist/demo` for the React and static demo outputs

## Repository Layout

- `src/videojs-vr` - library source code and WebVR adapters
- `src/demo` - React demo and static demo source files
- `dist/lib` - built library artifacts
- `dist/demo` - built demo artifacts

## Notes

- The codebase was modernized by replacing legacy vendored Three.js usage.
- Immersive mode remains WebVR-based for compatibility; native WebXR is not used.
- Demo source and build output are intentionally separated to keep the library tree clean.

## License

MIT.
