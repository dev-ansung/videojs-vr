import { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import * as THREE from 'three';
import VR from '../videojs-vr/plugin.js';
import '../videojs-vr/plugin.scss';
import './index.css';

// Plugin Setup (Global shims required for Video.js legacy compatibility)
(window as any).THREE = THREE;
(window as any).videojs = videojs;

if (!videojs.getPlugin('vr')) {
  videojs.registerPlugin('vr', VR);
}

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const playerRef = useRef<any>(null);
  const [status, setStatus] = useState('Ready');

  useEffect(() => {
    if (!videoRef.current) return;

    const player = videojs(videoRef.current, {
      controls: true,
      fluid: true,
      playbackRates: [0.5, 1, 1.5, 2]
    });

    playerRef.current = player;

    player.ready(() => {
      player.mediainfo = { projection: '360' };
      player.vr({ projection: '360', debug: false });
    });

    return () => player.dispose();
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && playerRef.current) {
      const url = URL.createObjectURL(file);
      playerRef.current.src({ src: url, type: file.type || 'video/mp4' });
      playerRef.current.play();
      setStatus(`Playing: ${file.name}`);
    }
  };

  return (
    <div className="demo-container">
      <h1>videojs-vr</h1>
      
      <div className="player-card">
        <video ref={videoRef} className="video-js vjs-big-play-centered" playsInline />
      </div>

      <div className="controls">
        <input type="file" ref={fileInputRef} onChange={handleFile} accept="video/*" style={{ display: 'none' }} />
        <button className="btn-primary" onClick={() => fileInputRef.current?.click()}>
          Open 360° Video
        </button>
        <div className="status">{status}</div>
      </div>
    </div>
  );
}
