"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
  const globalAny = window as unknown as {
    __novaaxis_patchedWarn?: boolean;
  };

  if (!globalAny.__novaaxis_patchedWarn) {
    globalAny.__novaaxis_patchedWarn = true;
    const originalWarn = console.warn.bind(console);

    console.warn = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        first.includes("Clock: This module has been deprecated") &&
        first.includes("THREE.Timer")
      ) {
        return;
      }

      originalWarn(...args);
    };
  }
}

function ParticleCloud({ count = 2000, tickFps = 30 }: { count?: number; tickFps?: number }) {
  const points = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();
  const invalidate = useThree((state) => state.invalidate);
  
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // eslint-disable-next-line react-hooks/purity
      const r = 4 * Math.cbrt(Math.random());
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * 2 * Math.PI;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  // Throttle rendering to reduce CPU/GPU power draw.
  // With `frameloop="demand"` on <Canvas>, calling `invalidate()` triggers a single frame render.
  useEffect(() => {
    if (tickFps <= 0) return undefined;
    let raf = 0;
    let last = 0;
    const interval = 1000 / tickFps;

    const loop = (t: number) => {
      raf = window.requestAnimationFrame(loop);
      if (t - last < interval) return;
      last = t;
      invalidate();
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [invalidate, tickFps]);

  useFrame((state, delta) => {
    if (points.current) {
      // Base rotation
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;

      // Mouse interactivity (parallax)
      const targetX = (pointer.x * viewport.width) / 2;
      const targetY = (pointer.y * viewport.height) / 2;
      
      points.current.position.x += (targetX * 0.1 - points.current.position.x) * 0.05;
      points.current.position.y += (targetY * 0.1 - points.current.position.y) * 0.05;
    }
  });

  return (
    <Points 
      ref={points} 
      positions={positions} 
      stride={3} 
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#0ea5e9"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene() {
  const env = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return { coarsePointer: false, reducedMotion: false };
    }

    return {
      coarsePointer: window.matchMedia("(pointer: coarse)").matches,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    };
  }, []);

  const particleCount = env.coarsePointer || env.reducedMotion ? 900 : 1500;
  const enablePostProcessing = !(env.coarsePointer || env.reducedMotion);
  const dpr = env.coarsePointer ? 1 : ([1, 1.5] as [number, number]);
  const tickFps = env.coarsePointer || env.reducedMotion ? 20 : 30;

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={dpr} 
        performance={{ min: 0.5 }}
        frameloop="demand"
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ParticleCloud count={particleCount} tickFps={tickFps} />
        
        {/* Post Processing for Cinematic Look */}
        {enablePostProcessing ? (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={1.5}
              mipmapBlur
              blendFunction={BlendFunction.SCREEN}
            />
            <Noise opacity={0.05} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.002, 0.002)}
            />
          </EffectComposer>
        ) : null}

        <Preload all />
      </Canvas>
    </div>
  );
}
