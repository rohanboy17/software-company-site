"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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

function RobotCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  const { pointer, viewport, camera } = useThree();

  useFrame(() => {
    if (!coreRef.current || !ringRef1.current || !ringRef2.current) return;

    // 1. Scroll rotation for the outer rings
    const scrollY = window.scrollY;
    ringRef1.current.rotation.x = scrollY * 0.002;
    ringRef1.current.rotation.y = scrollY * 0.003;
    ringRef2.current.rotation.x = -scrollY * 0.001;
    ringRef2.current.rotation.y = -scrollY * 0.0025;

    // 2. The Core "looks" at the pointer
    // We create a target point in 3D space based on mouse position
    const targetX = (pointer.x * viewport.width) / 2;
    const targetY = (pointer.y * viewport.height) / 2;
    
    // The target is at Z = 0 (same as the object's general plane), but slightly forward
    const target = new THREE.Vector3(targetX, targetY, camera.position.z);
    
    const dummy = new THREE.Object3D();
    dummy.position.copy(coreRef.current.position);
    dummy.lookAt(target);
    
    // Smoothly slerp the rotation to follow the mouse
    coreRef.current.quaternion.slerp(dummy.quaternion, 0.08);
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <group ref={coreRef} position={[0, 0, -2]}>
          {/* Main Head/Eye casing */}
          <mesh>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
          </mesh>
          
          {/* Glowing Eye Base (placed on +Z axis, since lookAt points +Z towards target by default) */}
          <mesh position={[0, 0, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshBasicMaterial color="#082f49" />
          </mesh>

          {/* The bright glowing pupil */}
          <mesh position={[0, 0, 1.46]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
            <meshBasicMaterial color="#22d3ee" />
          </mesh>
          
          {/* Inner white core */}
          <mesh position={[0, 0, 1.48]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.1, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>

          {/* Abstract floating "ears" or armor */}
          <mesh position={[-1.7, 0, 0]}>
            <boxGeometry args={[0.2, 1.5, 1]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[1.7, 0, 0]}>
            <boxGeometry args={[0.2, 1.5, 1]} />
            <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>

        {/* Outer rotating scroll rings */}
        <mesh ref={ringRef1} position={[0, 0, -2]}>
          <torusGeometry args={[2.8, 0.02, 16, 100]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
        </mesh>
        
        <mesh ref={ringRef2} position={[0, 0, -2]}>
          <torusGeometry args={[3.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

export default function WorkScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-screen">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 60 }} 
        dpr={[1, 1.25]}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        performance={{ min: 0.5 }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <DemandTicker fps={20} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#0ea5e9" />
        <RobotCore />
      </Canvas>
    </div>
  );
}
