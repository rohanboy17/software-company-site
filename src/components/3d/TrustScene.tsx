"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { mulberry32 } from "./_rng";

function DemandTicker({ fps = 24 }: { fps?: number }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const interval = 1000 / Math.max(1, fps);

    const loop = (t: number) => {
      raf = window.requestAnimationFrame(loop);
      if (document.visibilityState !== "visible") return;
      if (t - last < interval) return;
      last = t;
      invalidate();
    };

    raf = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(raf);
  }, [fps, invalidate]);

  return null;
}

function ParticleCloud({ count = 2000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { pointer, viewport } = useThree();
  const visibleRef = useRef(true);
  
  const positions = useMemo(() => {
    const rand = mulberry32(1337 + count);
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 * Math.cbrt(rand());
      const theta = rand() * 2 * Math.PI;
      const phi = Math.acos(2 * rand() - 1);
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = r * Math.cos(phi);
    }
    return p;
  }, [count]);

  useEffect(() => {
    const onVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useFrame((state, delta) => {
    if (!visibleRef.current) return;
    if (points.current) {
      // Very slow drift
      points.current.rotation.x -= delta / 25;
      points.current.rotation.y -= delta / 30;

      // Mouse interactivity (parallax) - slightly stronger than hero for this section
      const targetX = (pointer.x * viewport.width) / 4;
      const targetY = (pointer.y * viewport.height) / 4;
      
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
        color="#22d3ee"
        size={0.035}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

export default function TrustScene() {
  const env = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return { coarsePointer: false, reducedMotion: false, highPower: false };
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    type NavigatorWithMemory = Navigator & { deviceMemory?: number };
    const deviceMemory = (navigator as NavigatorWithMemory).deviceMemory ?? 0;
    const cores = typeof navigator.hardwareConcurrency === "number" ? navigator.hardwareConcurrency : 0;
    const highPower = deviceMemory >= 8 || cores >= 8;

    return { coarsePointer, reducedMotion, highPower };
  }, []);

  const enablePostProcessing = env.highPower && !(env.coarsePointer || env.reducedMotion);
  const dpr = env.highPower ? ([1, 1.35] as [number, number]) : 1;
  const particleCount = env.highPower ? 1500 : 1100;
  const fps = env.highPower ? 22 : 16;

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none bg-[#030712]">
      {/* Background gradients for extra depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
      
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={dpr} 
        performance={{ min: 0.5 }}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <DemandTicker fps={fps} />
        <ParticleCloud count={particleCount} />
        
        {/* Cinematic Post-Processing to match Hero look */}
        {enablePostProcessing ? (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={1.15}
              mipmapBlur
              blendFunction={BlendFunction.SCREEN}
            />
            <Noise opacity={0.04} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.001, 0.001)}
            />
          </EffectComposer>
        ) : null}

        <Preload all />
      </Canvas>
    </div>
  );
}
