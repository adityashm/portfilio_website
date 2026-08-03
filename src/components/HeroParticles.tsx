import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Helper: Soft Circular Glow Texture for Cyber Nodes ---
function createGlowingTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(34, 211, 238, 0.9)');
    gradient.addColorStop(0.7, 'rgba(168, 85, 247, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// --- 1. Holographic Cyber Core (Geodesic Sphere + Vertex Nodes) ---
function CyberCore({ isMobile }: { isMobile: boolean }) {
  const coreRef = useRef<THREE.Group>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const pointsRef = useRef<THREE.Points>(null!);

  const circleTexture = useMemo(() => createGlowingTexture(), []);

  // Generate glowing points on an icosahedron surface
  const { positions, colors } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 4);
    const pos = geo.attributes.position.array as Float32Array;
    const count = pos.length / 3;
    const col = new Float32Array(count * 3);

    const cyan = new THREE.Color('#22d3ee');
    const purple = new THREE.Color('#a855f7');
    const tempColor = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const y = pos[i * 3 + 1];
      const ratio = (y + 2.2) / 4.4;
      tempColor.copy(cyan).lerp(purple, Math.max(0, Math.min(1, ratio)));
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return { positions: pos, colors: col };
  }, []);

  // Mouse NDC coordinates for interactive tilt
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const handlePointerLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  useFrame((state, delta) => {
    if (!coreRef.current) return;
    const time = state.clock.getElapsedTime();

    // Smooth autonomous rotation
    coreRef.current.rotation.y += delta * 0.15;
    coreRef.current.rotation.x = Math.sin(time * 0.3) * 0.15;

    // Smooth interactive mouse tilt
    const targetRotY = mouse.current.x * 0.45;
    const targetRotX = -mouse.current.y * 0.35;
    coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, coreRef.current.rotation.y + targetRotY * 0.05, 0.1);
    coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, targetRotX, 0.05);

    // Pulse inner core emissive glow
    if (innerRef.current && innerRef.current.material) {
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(time * 2.0) * 0.25;
    }

    // Counter-rotate wireframe for layered depth
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.08;
      wireRef.current.rotation.z = Math.cos(time * 0.25) * 0.1;
    }
  });

  const position: [number, number, number] = isMobile ? [0, -0.6, -2.5] : [3.2, 0, -1.5];
  const scale = isMobile ? 0.72 : 1.0;

  return (
    <group ref={coreRef} position={position} scale={scale}>
      {/* 1. Inner Plasma Core */}
      <Sphere ref={innerRef} args={[1.45, 32, 32]}>
        <meshStandardMaterial
          color="#0f172a"
          emissive="#22d3ee"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.65}
        />
      </Sphere>

      {/* 2. Geodesic Cyber Wireframe Cage */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshStandardMaterial
          wireframe
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.6}
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* 3. Glowing Quantum Vertex Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.11}
          map={circleTexture}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 4. Tilted Orbital Data Rings */}
      <OrbitalRings />
    </group>
  );
}

// --- 2. Tilted Orbital Rings (Cybersecurity Data Orbits) ---
function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const ring3Ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.rotation.x += delta * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.35;
      ring2Ref.current.rotation.y += delta * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.18;
      ring3Ref.current.rotation.x -= delta * 0.12;
    }
  });

  return (
    <group>
      {/* Cyan Inner Orbit */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.7, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Purple Middle Orbit */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.3, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Outer Cyan-Purple Orbit */}
      <mesh ref={ring3Ref} rotation={[0, Math.PI / 4, Math.PI / 3]}>
        <torusGeometry args={[3.9, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

// --- 3. Ambient Cyber Dust (Tiny Floating Particles - No Lines!) ---
function AmbientCyberDust({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const circleTexture = useMemo(() => createGlowingTexture(), []);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color('#22d3ee');
    const purple = new THREE.Color('#a855f7');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const color = Math.random() > 0.5 ? cyan : purple;
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        map={circleTexture}
        vertexColors
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- Lightweight Fallback for Suspense or Reduced Motion ---
function HeroParticlesFallback() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-[#030712] via-[#0b1120] to-[#030712]" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
    </div>
  );
}

// --- Main Hero 3D Component ---
export default function HeroParticles() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (prefersReducedMotion) {
    return <HeroParticlesFallback />;
  }

  const dustCount = isMobile ? 60 : 160;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Suspense fallback={<HeroParticlesFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 55, near: 0.1, far: 100 }}
          dpr={[1, 2]} // Requirement 6: Cap pixel ratio at 2
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
        >
          {/* Ambient + Dual Accent Lighting in Cyan (#22d3ee) & Purple (#a855f7) */}
          <ambientLight intensity={0.7} />
          <pointLight position={[10, 10, 10]} intensity={2.5} color="#22d3ee" />
          <pointLight position={[-10, -10, -10]} intensity={2.5} color="#a855f7" />
          <pointLight position={[3, 0, 2]} intensity={1.5} color="#38bdf8" />

          {/* Core Cybersecurity Sculpture with Smooth Floating Animation */}
          <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
            <CyberCore isMobile={isMobile} />
          </Float>

          {/* Ambient Cosmic Data Speckles (No Spiderweb Lines) */}
          <AmbientCyberDust count={dustCount} />

          {/* Soft Bloom Postprocessing */}
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              intensity={0.75}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
}
