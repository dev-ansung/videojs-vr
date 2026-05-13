import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

const globals = {
  'video.js': 'videojs',
  'three': 'THREE',
  'global/window': 'window',
  'global/document': 'document'
};

export default {
  input: 'src/videojs-vr/plugin.js',
  output: [
    {
      file: 'dist/lib/videojs-vr.js',
      format: 'umd',
      name: 'videojs-vr',
      globals
    },
    {
      file: 'dist/lib/videojs-vr.es.js',
      format: 'es',
      globals
    }
  ],
  external: ['video.js', 'three'],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs(),
    json()
  ]
};
