# videojs-vr

A professional [Video.js](http://videojs.com/) plugin that adds 360° and VR video support using [Three.js](https://threejs.org/).

## Features
- Support for **360° equirectangular** videos.
- Support for **360° 3D** (Stereoscopic) videos (Left-Right and Top-Bottom).
- Support for **180°** and **Cube map** projections.
- VR mode support via **legacy WebVR APIs** (with `webvr-polyfill`).
- Integrated **Orbit Controls** for desktop and **Orientation Controls** for mobile.

## Installation

```bash
npm install videojs-vr
# or
bun add videojs-vr
```

## Usage

### Standard `<script>` tag
Include Video.js, Three.js, and the plugin. The plugin will automatically register itself.

Note: immersive mode in this codebase is currently driven by legacy WebVR APIs
(`navigator.getVRDisplays`, `requestPresent`, `vrdisplay*` events), not native WebXR.

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
  (function(window, videojs) {
    var player = window.player = videojs('video-player');
    player.mediainfo = { projection: '360' };
    player.vr({ projection: '360', debug: false });
  }(window, window.videojs));
</script>
```

### ES Modules (React, Vite, etc.)
```javascript
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import * as THREE from 'three';
import VR from 'videojs-vr';
import 'videojs-vr/dist/lib/videojs-vr.css';

// Plugin requires THREE and videojs to be available globally for certain internals
window.THREE = THREE;
window.videojs = videojs;

// Register the plugin manually if not already registered
if (!videojs.getPlugin('vr')) {
  videojs.registerPlugin('vr', VR);
}

const player = videojs('my-player');
player.vr({ projection: '360' });
```

## Plugin Options
- `projection`: (String) Default projection. Options: `'360'`, `'360_LR'`, `'360_TB'`, `'360_CUBE'`, `'180'`, `'NONE'`. Default: `'AUTO'`.
- `debug`: (Boolean) Enable logging. Default: `false`.
- `forceCardboard`: (Boolean) Force the cardboard button to appear. Default: `false`.
- `sphereDetail`: (Number) Number of segments for the 360 sphere. Default: `32`.

## Development
```bash
# Build the library and demo
bun run dist

# Outputs:
# - dist/lib  (library bundles)
# - dist/demo (demo build artifacts)

# Start dev server
bun run dev
```

After building, `dist/demo` includes both demo entry points:
- `dist/demo/index.html` (React demo)
- `dist/demo/static.html` (plain static demo)

## Source Layout
- `src/videojs-vr`: library source code and WebVR adapters.
- `src/demo`: React + static demo source files.
- `dist/lib`: built library artifacts.
- `dist/demo`: built demo artifacts.

## License
MIT.
