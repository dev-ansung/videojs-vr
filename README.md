The modernized `README.md` has been updated to include instructions for the requested CDN links, the updated copyright for your fork, and a section highlighting the mouse wheel zoom functionality implemented in the source code.

-----

# videojs-vr

A [video.js](https://videojs.com) plugin that turns a video element into an HTML5 Panoramic 360 video player. Project video onto different shapes and enjoy an immersive experience with optional VR headset support for Oculus Rift, HTC Vive, and GearVR.

[](https://www.google.com/search?q=https://www.npmjs.com/package/videojs-vr)
[](https://www.google.com/search?q=https://github.com/dev-ansung/videojs-vr/blob/main/LICENSE)

-----

## Features

  * **360 & 180 Support:** Panorama viewing for spherical and half-spherical videos.
  * **VR Headset Integration:** Supports native WebVR HMDs like Meta Quest, HTC Vive, and Oculus Rift.
  * **Interactive Zoom:** Smoothly zoom in and out of the scene using the mouse wheel (adjusts FOV between 20 and 120).
  * **Motion Controls:** Built-in support for gyro and motion sensors on iOS and Android devices.
  * **Cross-Platform:** Responsive VR experience powered by Three.js and webvr-polyfill.

-----

## Usage

### Using CDN (Recommended)

Include the CSS and JavaScript directly from JSDelivr. Ensure you include the plugin **after** the `video.js` library.

```html
<head>
  <link href="https://vjs.zencdn.net/7.20.3/video-js.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/gh/dev-ansung/videojs-vr@main/dist/videojs-vr.css" rel="stylesheet">
</head>

<body>
  <video id="my-video" class="video-js" controls playsinline>
    <source src="path/to/your/360-video.mp4" type="video/mp4">
  </video>

  <script src="https://vjs.zencdn.net/7.20.3/video.min.js"></script>
  <script src="https://cdn.jsdelivr.net/gh/dev-ansung/videojs-vr@main/dist/videojs-vr.js"></script>

  <script>
    var player = videojs('my-video');
    
    // Initialize the plugin
    player.vr({
      projection: '360'
    });
  </script>
</body>
```

### Module Bundlers (NPM/ES6)

```js
import videojs from 'video.js';
import 'videojs-vr';

const player = videojs('my-video');
player.vr({projection: '360'});
```

-----

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `projection` | `string` | `'AUTO'` | The video projection type (e.g., '360', '180', 'EAC'). |
| `motionControls` | `boolean` | `true` | Enables gyro/motion controls on mobile. |
| `forceCardboard` | `boolean` | `false` | Forces the cardboard button to show on all devices. |
| `sphereDetail` | `number` | `32` | Number of segments in the spherical mesh. |
| `debug` | `boolean` | `false` | Enables debug logging in the console. |

-----

## Accessing THREE.js Objects

You can access the underlying Three.js scene components directly through the plugin instance:

```js
const vr = player.vr();
console.log(vr.camera);   // THREE.PerspectiveCamera
console.log(vr.scene);    // THREE.Scene
console.log(vr.renderer); // THREE.WebGLRenderer
```

-----

## Caveats

  * **Safari HLS:** Captions may not be visible as they are located inside the shadowRoot of the video element, which cannot be accessed by the plugin.
  * **CORS:** 360 videos must be served with appropriate CORS headers to be used as WebGL textures.

## Credits

This project is a fork of the original `videojs-vr` and leverages several open-source libraries:

  * [Video.js](http://videojs.com)
  * [Three.js](http://threejs.org)
  * [webvr-polyfill](https://github.com/borismus/webvr-polyfill)
  * [Omnitone](https://googlechrome.github.io/omnitone)

## License

MIT