"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

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

function ScrollRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create 40 concentric dashed rings to look like a data tunnel/cylinder
  const ringsCount = 40;
  
  const rings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ringsCount; i++) {
      arr.push(i);
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    const scrollY = window.scrollY;
    
    // Smooth, slow mapped rotation for the whole group
    const targetZ = scrollY * 0.0004;
    const targetX = Math.sin(scrollY * 0.0002) * 0.3 + 1.2; // Gentle wavy tilt
    
    // Extremely smooth interpolation (lower number = smoother follow)
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.02;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.02;

    // We can also animate individual rings based on scroll
    groupRef.current.children.forEach((ring, i) => {
      // The offset based on scroll gives a feeling of moving through them. Much slower now.
      const zOffset = ((i * 0.5 + scrollY * 0.002) % 20) - 10;
      
      // Target scale changes as it gets closer
      const scale = 1 + (zOffset + 10) * 0.1;
      
      // Smoothly interpolate Z position to avoid jerky scroll steps
      ring.position.z += (zOffset - ring.position.z) * 0.05;
      ring.scale.set(scale, scale, scale);
      
      // Alternate rotation directions for odds/evens. Slower rotation.
      const dir = i % 2 === 0 ? 1 : -1;
      const targetRotationZ = scrollY * 0.0002 * dir + (i * 0.1);
      ring.rotation.z += (targetRotationZ - ring.rotation.z) * 0.05;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {rings.map((i) => (
        <mesh key={i}>
          <ringGeometry args={[2.5, 2.52, 64, 1, 0, Math.PI * 1.8]} />
          <meshBasicMaterial 
            color={new THREE.Color().setHSL(0.55 + (i * 0.005), 0.8, 0.5)} // Cyan to Blue gradient
            transparent
            opacity={0.15 + (i % 3 === 0 ? 0.2 : 0)}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      
      {/* Central Abstract Core */}
      <mesh>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color="#0ea5e9" 
          wireframe={true} 
          transparent 
          opacity={0.05}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function ServicesScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen">
      <Canvas 
        camera={{ position: [0, 0, 0], fov: 60 }} 
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        performance={{ min: 0.5 }}
      >
        <DemandTicker fps={22} />
        <ScrollRings />
      </Canvas>
    </div>
  );
}
