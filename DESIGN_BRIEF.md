# Master Design Brief: Aditya Sharma Portfolio Redesign
## 2024–2025 Cosmic Dark-Space Experience & Technical Specification

**Project Name:** Aditya Sharma Developer Portfolio Redesign  
**Document Status:** Authoritative Design Brief & Technical Blueprint  
**Version:** 1.0.0  
**Target File Location:** `d:/Aditya/coding/project/portfolio webtite/DESIGN_BRIEF.md`  
**Date of Synthesis:** July 31, 2026  
**Authoring Unit:** Worker 1 (`worker_m1_1`) synthesizing Explorer 1, 2, and 3 research reports  

---

## 1. Executive Vision & Inspiration Benchmark

### 1.1 Executive Vision Statement
The primary objective of the redesign is to elevate Aditya Sharma's developer portfolio into a 2024–2025 modern, award-winning interactive WebGL experience. Inspired by top-tier Awwwards, FWA, and CSS Design Award showcases, the redesign blends a **cosmic dark-space aesthetic** (deep obsidian void, dynamic particle starfield GLSL shaders, cyan nebula glows, volumetric spatial lighting, and selective post-processing bloom) with **glassmorphic UI ergonomics** and **physics-driven motion kinetics**.

Crucially, the 3D scene architecture operates as a persistent full-screen background layer (`z-index: 0`, `pointer-events: none`), decoupling heavy WebGL graphics from DOM readability. This guarantees 100% text accessibility, seamless Formspree contact form submissions, full theme switching support, and route integrity across all sub-applications (`/expense-tracker` and `/price-comparison`).

### 1.2 2024–2025 Industry Trends Benchmark
Modern WebGL portfolio design has evolved beyond heavy monolithic 3D game models toward performant, spatial-depth web layouts. Key industry trends benchmarked for this project include:
- **Spatial Deep-Space Canvas:** Unobtrusive, infinite 3D starfields and volumetric particle clouds that respond dynamically to scroll depth and mouse parallax.
- **Glassmorphism & Neon Glow Accents:** Dark obsidian elevated glass cards (`backdrop-blur-md`, `bg-white/[0.03]`, `border-white/10`) illuminated by high-contrast cyan (`#00f0ff`) and deep violet (`#8b5cf6`) glowing borders.
- **Micro-Kinetics & Spatial Tilt:** Physics-based magnetic CTAs (`useMagnetic`), 3D card tilt driven by cursor coordinates (`perspective(1000px) rotateX(...) rotateY(...)`), and staggered entrance reveals (`scale: 0.94 -> 1`, `rotateX: 8deg -> 0deg`).
- **Strict Performance Guardrails:** Adaptive Device Pixel Ratio (DPR) monitoring, instanced shader particles, raycasting optimization, and 60 FPS budgets across desktop and mobile devices.

### 1.3 Strategic Trend Evaluation & Adaptation Strategy

| Visual Strategy / Trend | Core Characteristics | Advantages | Technical Risks | Portfolio Adaptation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Bruno Simon Style** (Interactive Physics World) | Driveable 3D vehicle, rigid-body physics, complex GLTF models. | Memorable gamified experience. | Heavy assets (5–20MB), high CPU physics overhead, distorts text readability. | **Adapted:** Extract pointer force-field repulsion and hover physics applied to lightweight DOM badges and floating primitives. |
| **Interactive Starfields & Cosmic Space** | Instanced 3D point cloud with distance-based attenuation and GLSL twinkle shaders. | Perfect dark-space match; zero DOM overlap; scalable via instancing. | Moiré patterns or GPU overdraw on 4K high-DPI displays. | **Selected Core Theme:** Primary background experience using 8,000 instanced GLSL particles with dynamic DPR scaling. |
| **Particle Nebulas & Volumetric Noise** | Swirling interstellar dust with alpha-blended color gradients. | Rich vibrance behind glass cards; spatial depth. | High fill-rate cost if sprite planes overlap excessively. | **Selected Sub-System:** Controlled particle count (1,500–2,500) using custom vertex noise displacement and additive blending. |
| **Floating 3D Geometries** | Wireframe and glass primitive meshes (Icosahedron, Torus, Octahedron). | Cybernetic aesthetic; responsive to rim lighting; zero asset download overhead. | Glass transmission materials (`MeshPhysicalMaterial`) require extra render passes. | **Selected Hero Visual:** Floating glassmorphic icosahedrons and wireframe tech rings hovering near hero/section headers using Drei `<Float>`. |
| **Spatial Rim Lighting & Color Shift** | Moving point lights synchronized with cursor and section scroll. | Adds dramatic 3D volume; highlights material edges. | Multiple dynamic lights (>4-5) degrade mobile GPU framerates. | **Selected Lighting Model:** 1 Ambient light + 1 Key directional light + 2 dynamic colored PointLights (Cyan & Purple). |
| **Selective Post-Processing Bloom** | Emissive bloom applied to stars and neon hulls via EffectComposer. | AAA cinematic polish; vibrant glow on active nodes. | Unoptimized post-processing drops FPS on Retina/4K displays. | **Selected Effects Stack:** `@react-three/postprocessing` with `Bloom` (`luminanceThreshold ~0.35`) and `Vignette`. |

---

## 2. Cosmic Dark-Space Design System

### 2.1 Color Tokens & Palette Architecture

The portfolio design system is anchored in deep dark-space tones paired with neon cyber highlights.

| Token Name | Hex Code | HSL / RGBA Equivalent | Design Role & Usage |
| :--- | :--- | :--- | :--- |
| `bg-void` | `#030712` | `hsl(224, 71%, 4%)` | Absolute base background (HTML body canvas) |
| `bg-space-dark` | `#090d16` | `hsl(222, 42%, 6%)` | Section containers & primary layout backdrops |
| `bg-space-card` | `#0b0f19` | `hsl(222, 38%, 7%)` | Base elevation for glass cards, dropdowns, and modals |
| `accent-cyan` | `#00f0ff` | `hsl(184, 100%, 50%)` | Primary neon cyan glow, active states, key CTAs |
| `accent-teal` | `#06b6d4` | `hsl(188, 86%, 43%)` | Secondary cyan accent, text highlights |
| `accent-violet` | `#8b5cf6` | `hsl(263, 90%, 66%)` | Secondary deep purple gradient color |
| `accent-purple` | `#7c3aed` | `hsl(262, 83%, 58%)` | Deep violet brand glow, secondary CTAs |
| `border-glass` | `rgba(255,255,255,0.1)` | `rgba(255, 255, 255, 0.10)` | Quiet glass border for unhovered cards |
| `border-cyan-glow` | `rgba(0,240,255,0.4)` | `rgba(0, 240, 255, 0.40)` | Interactive cyan border on hover/focus |
| `border-violet-glow` | `rgba(139,92,246,0.4)` | `rgba(139, 92, 246, 0.40)` | Interactive violet border on hover/focus |

### 2.2 Neon Glow & Shadow Accent Tokens
- **Cyan Glow Drop Shadow (`glow-cyan`):** `0 0 20px rgba(0, 240, 255, 0.35), 0 0 40px rgba(0, 240, 255, 0.15)`
- **Violet Glow Drop Shadow (`glow-violet`):** `0 0 20px rgba(139, 92, 246, 0.35), 0 0 40px rgba(139, 92, 246, 0.15)`
- **Cosmic Dual Glow (`glow-cosmic`):** `0 0 25px rgba(0, 240, 255, 0.25), 0 0 50px rgba(124, 58, 237, 0.25)`

### 2.3 Glassmorphism System Specifications

Three distinct glassmorphic card utility classes are established:

#### 1. Standard Cosmic Glass Card (`.glass-card-cosmic`)
Used for project cards, experience items, education details, and skill category panels.
```css
.glass-card-cosmic {
  background-color: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  transition: all 300ms ease-out;
}
.glass-card-cosmic:hover {
  border-color: rgba(0, 240, 255, 0.40);
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.20);
}
```

#### 2. Nebula Spotlight Glass Card (`.glass-card-spotlight`)
Includes a cursor-following radial spotlight pseudo-element (`--mouse-x`, `--mouse-y`).
```css
.glass-card-spotlight {
  position: relative;
  background-color: #0b0f19;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
}
.glass-card-spotlight::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 240, 255, 0.15),
    transparent 80%
  );
  pointer-events: none;
  transition: opacity 300ms ease;
  opacity: var(--glow-opacity, 0);
}
```

#### 3. High-Contrast Modal Glass (`.glass-modal-cosmic`)
Used for dialogs, alert popups, and high-priority overlays.
```css
.glass-modal-cosmic {
  background-color: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(0, 240, 255, 0.30);
  box-shadow: 0 0 50px rgba(0, 240, 255, 0.15);
}
```

### 2.4 Typography Hierarchy & Badge Aesthetics

- **Display / Headings:** `Plus Jakarta Sans` or `Inter` (`font-sans tracking-tight font-extrabold`)
  - **Hero Title:** `text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400`
  - **Section Headings:** `text-3xl md:text-4xl font-bold tracking-tight text-white`
  - **Section Eyebrows:** `text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-cyan-400`
- **Body Typography:** `Inter` (`font-sans leading-relaxed text-slate-300`)
- **Code & Tech Specs:** `ui-monospace, SFMono-Regular, Menlo, Fira Code, monospace` (`font-mono text-cyan-300`)

#### Badge Aesthetics
1. **Tech Stack Chip (`.badge-tech`):**
   `inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-950/40 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all`
2. **Pulsing Status Pill (`.badge-status-live`):**
   `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/50 text-emerald-300 border border-emerald-500/40 backdrop-blur-md` with animated inner dot:
   `<span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>`
3. **Gradient Frame Badge (`.badge-cosmic-gradient`):**
   `relative inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white bg-slate-900 border border-transparent bg-clip-padding before:absolute before:inset-0 before:-z-10 before:rounded-full before:p-[1px] before:bg-gradient-to-r before:from-cyan-400 before:to-violet-600`

---

## 3. Three.js / React Three Fiber Scene Architecture

### 3.1 Component Hierarchy & Layering Architecture

To maintain performance and accessibility, the WebGL canvas is isolated into a fixed background overlay, while HTML elements float above it.

```
App.tsx
├── ThemeProvider (Dark / Light mode state context)
├── SpaceCanvas (Fixed full-screen canvas background, inset-0, z-index: 0, pointer-events: none)
│   └── Canvas (@react-three/fiber)
│       ├── PerformanceMonitor (Drei - dynamic DPR throttling)
│       ├── Suspense (Async texture & shader asset loader)
│       ├── SceneLighting (AmbientLight, DirectionalLight, dynamic PointLights)
│       ├── StarfieldParticles (Custom GLSL shader point cloud - 8,000 particles)
│       ├── NebulaDustCloud (Instanced particle cloud with vertex noise displacement)
│       ├── FloatingGeometries (Drei <Float> wrappers around Icosahedron & Torus meshes)
│       ├── CameraRig (Smooth lerped mouse parallax & section scroll tracking)
│       └── PostProcessingStack (EffectComposer with selective Bloom, Vignette, Noise)
└── HTMLContentOverlay (Relative wrapper, z-index: 10, pointer-events: auto)
    ├── Header (Glassmorphic navbar + ThemeToggle + MobileMenu)
    ├── Hero (Headline, CTAs, Social links, Resume download)
    ├── About (Bio text, 3 feature cards)
    ├── Education (Degree, institution, CGPA 8.6/10)
    ├── Skills (6 categories, interactive technology chips)
    ├── Projects (Featured projects, tech filter tabs, 3D tilt cards)
    ├── Stats (GitHub API integration, 4 metric cards)
    ├── Experience (4 work/internship items)
    ├── Certifications (7 credentials with verification links)
    ├── GitHubStats (Profile overview card & tech list)
    ├── Contact (Formspree form & contact info)
    └── Footer (Copyright, quick links, site manifest links)
```

### 3.2 Global Canvas Setup (`SpaceCanvas.tsx`)
```tsx
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import SceneLighting from './SceneLighting';
import StarfieldParticles from './StarfieldParticles';
import FloatingGeometries from './FloatingGeometries';
import CameraRig from './CameraRig';
import PostProcessingStack from './PostProcessingStack';

export default function SpaceCanvas() {
  const [dpr, setDpr] = useState<number>(1.5);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gray-950">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 1000 }}
        dpr={dpr}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          <Suspense fallback={null}>
            <SceneLighting />
            <StarfieldParticles count={8000} />
            <FloatingGeometries />
            <CameraRig />
            <PostProcessingStack />
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
```

### 3.3 Starfield GLSL Shader (`StarfieldParticles.tsx`)

#### Vertex Shader (`starVertexShader`)
```glsl
uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute vec3 aColor;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Subtle horizontal & vertical float oscillation
  modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 2.0) * 0.15;
  modelPosition.x += cos(uTime * 0.3 + modelPosition.y * 1.5) * 0.10;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  
  // Distance-based particle point sizing attenuation
  gl_PointSize = aScale * uPixelRatio * (20.0 / -viewPosition.z);
}
```

#### Fragment Shader (`starFragmentShader`)
```glsl
varying vec3 vColor;

void main() {
  // Distance from center of point coordinate for circular falloff
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.0, dist);
  gl_FragColor = vec4(vColor, alpha * 0.85);
}
```

#### React Component Mechanics
```tsx
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function StarfieldParticles({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const baseColors = [
      new THREE.Color('#00f0ff'), // Cyan
      new THREE.Color('#8b5cf6'), // Purple
      new THREE.Color('#38bdf8'), // Sky Blue
      new THREE.Color('#ffffff'), // White Star
    ];

    for (let i = 0; i < count; i++) {
      const radius = 10 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const color = baseColors[Math.floor(Math.random() * baseColors.length)];
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;

      sca[i] = Math.random() * 1.8 + 0.5;
    }

    return { positions: pos, colors: col, scales: sca };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  }), []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      (pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value += delta;
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
```

### 3.4 Floating 3D Geometries (`FloatingGeometries.tsx`)
```tsx
import React, { useRef } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingGeometries() {
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.2;
      meshRef1.current.rotation.y += delta * 0.3;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.15;
      meshRef2.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group>
      {/* Glassmorphic Icosahedron floating near Hero */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[4, 2, -3]}>
        <mesh ref={meshRef1}>
          <icosahedronGeometry args={[1.8, 0]} />
          <meshPhysicalMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.2}
            roughness={0.1}
            metalness={0.1}
            transmission={0.6}
            thickness={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      </Float>

      {/* Cyber Wireframe Torus floating near Skills */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[-5, -8, -4]}>
        <mesh ref={meshRef2}>
          <torusGeometry args={[2.2, 0.4, 16, 50]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}
```

### 3.5 Spatial Lighting System (`SceneLighting.tsx`)
- **Ambient Light:** Intensity `0.4` (`#ffffff`) for soft global visibility.
- **Key Directional Light:** Position `[10, 10, 10]`, intensity `1.2`, color `#ffffff`.
- **Dynamic Cyan Point Light:** Position `[-5, 5, 2]`, intensity `2.0`, color `#00f0ff`.
- **Dynamic Purple Point Light:** Position `[5, -5, -2]`, intensity `2.0`, color `#8b5cf6`.

### 3.6 Camera Parallax Rig (`CameraRig.tsx`)
```tsx
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig() {
  useFrame((state, delta) => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    const targetY = -scrollProgress * 20;
    const targetZ = 12 - Math.sin(scrollProgress * Math.PI) * 3;
    const targetMouseX = state.pointer.x * 1.5;
    const targetMouseY = state.pointer.y * 1.0;

    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, targetMouseX, 4, delta);
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, targetY + targetMouseY, 4, delta);
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, targetZ, 4, delta);

    state.camera.lookAt(0, targetY, 0);
  });

  return null;
}
```

### 3.7 Selective Post-Processing Stack (`PostProcessingStack.tsx`)
```tsx
import React from 'react';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessingStack() {
  return (
    <EffectComposer disableNormalPass multisampling={0}>
      <Bloom
        intensity={1.2}
        luminanceThreshold={0.35}
        luminanceSmoothing={0.9}
        mipmapBlur
      />
      <Vignette
        offset={0.2}
        darkness={0.85}
        blendFunction={BlendFunction.NORMAL}
      />
      <Noise
        opacity={0.02}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}
```

### 3.8 Performance & Frame Rate Protocol
1. **Frame Rate Budget:** Target steady 60 FPS on desktop GPUs (GTX 1050 / Apple M1 equivalent); minimum 30 FPS fallback on budget mobile devices.
2. **DPR Scaling Guardrail:** Capped at `Math.min(window.devicePixelRatio, 2.0)`. Capped to `1.0` dynamically via `PerformanceMonitor` if FPS drops below 45.
3. **Memory Ceiling:** Total WebGL VRAM and memory allocation capped at `< 150MB`.
4. **Garbage Collection:** Geometry and material instances declared statically at module scope or properly disposed of on unmount (`geometry.dispose()`, `material.dispose()`).

---

## 4. Scroll-Driven Animation & Motion Framework

### 4.1 Framer Motion 3D Section Entry Reveal (`sectionRevealVariant`)
Applies subtle 3D depth tilt, initial compression scale, and vertical offset when sections scroll into view.

```typescript
export const sectionRevealVariant = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    rotateX: 8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for smooth deceleration
    },
  },
};
```

### 4.2 Staggered Container & Item Variants
```typescript
export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const cardItemVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
```

### 4.3 Floating Badge Physics Loop (`floatingBadgeVariant`)
```typescript
export const floatingBadgeVariant = (index: number) => ({
  animate: {
    y: [-4, 6, -4],
    rotate: [-1, 1, -1],
    transition: {
      duration: 3.5 + (index % 3) * 0.8,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
  },
});
```

### 4.4 Cursor Magnetic CTA Hook (`useMagnetic`)
Calculates magnetic attraction distance between cursor position and button center.
```typescript
import { useRef, useState, useEffect } from 'react';

export function useMagnetic(stiffness = 150, damping = 15) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    if (Math.abs(distanceX) < width && Math.abs(distanceY) < height) {
      setPosition({ x: distanceX * 0.35, y: distanceY * 0.35 });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return { ref, position, handleMouseMove, handleMouseLeave };
}
```

### 4.5 3D Depth Tilt Card Mechanics (`TiltCard`)
Applies cursor-driven perspective transform using exact formulas:
$$\text{rotateX} = - \left(\frac{y - y_{\text{center}}}{\text{height} / 2}\right) \times 10^{\circ}$$
$$\text{rotateY} = \left(\frac{x - x_{\text{center}}}{\text{width} / 2}\right) \times 10^{\circ}$$

```tsx
import React, { useRef } from 'react';

export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = (-y / (rect.height / 2)) * 10;
    const rotateY = (x / (rect.width / 2)) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    cardRef.current.style.setProperty('--glow-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    cardRef.current.style.setProperty('--glow-opacity', '0');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out preserve-3d ${className}`}
    >
      {children}
    </div>
  );
}
```

### 4.6 Dual Scroll Progress Indicators
1. **Top Reading Progress Bar:** Fixed `top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400 z-50 origin-left` driven by Framer Motion `useScroll()` & `useSpring()`.
2. **Floating Cosmic Progress Ring:** Fixed at `bottom-6 right-6 z-40`. SVG circle showing percentage filled with cyan neon shadow, plus scroll-to-top button integration.

---

## 5. Content Preservation & Route Integrity Blueprint

### 5.1 Content Inventory Across 11 Main Sections

1. **Header & Navigation (`Header.tsx`):**
   - Brand Logo: `"AS"`
   - Anchor Links: `#about`, `#education`, `#skills`, `#projects`, `#experience`, `#certifications`, `#contact`
   - Controls: Active section tracking (150px threshold), Theme Toggle Button, Mobile Menu Drawer with body overflow lock & focus trap.
2. **Hero Section (`Hero.tsx`):**
   - Headline: `Hi, I'm Aditya Sharma`
   - Tagline: `Final-year B.Tech Computer Science Engineering Student`
   - Subtitle: `Passionate about software development and technology innovation. Currently exploring web development, machine learning, and cloud computing.`
   - CTAs: Download Resume (`/Aditya_Sharma_Resume.pdf`), Contact Me (`#contact`)
   - Social Links: GitHub (`https://github.com/ADITYASHM`), LinkedIn (`https://www.linkedin.com/in/adityashm/`)
   - Profile Portrait: `/IMG_1033.JPG`
3. **About Me Section (`About.tsx`):**
   - Feature Cards (3): *Software Development* (`Code2`), *Continuous Learning* (`Brain`), *Problem Solving* (`Coffee`)
   - Bio Paragraphs (2): B.Tech CSE student background & technical focus areas.
4. **Education Section (`Education.tsx`):**
   - Degree: `Bachelor of Technology - BTech, Computer Science`
   - Institution: `IMS ENGINEERING COLLEGE, GHAZIABAD`
   - Period: `2023 - 2027`
   - Highlights: `CGPA: 8.6/10`, Member of Technical Society, Active participant in coding competitions.
5. **Skills Section (`Skills.tsx`):**
   - Categories (6): Programming Languages, Web Development, Backend & Databases, Cloud & DevOps, Tools & Technologies, Version Control.
6. **Featured Projects Section (`Projects.tsx` & `ProjectCard.tsx`):**
   - Interactive Technology Filter tabs.
   - Projects (5): Price Comparison (`/price-comparison`), Smart Expense Tracker (`/expense-tracker`), Data Analysis Dashboard, Web Scraper, REST API Backend.
7. **Key Statistics Section (`Stats.tsx`):**
   - Live GitHub API fetch (`https://api.github.com/users/adityashm`).
   - Cards (4): Projects (`repositories` / fallback 12), GitHub Followers (`followers` / fallback 5), Experience (`2+`), Contributions (`150+`).
8. **Experience Section (`Experience.tsx`):**
   - Work items (4): Space Tech Intern (India Space Lab), Summer Internship (India Space Lab), Web Development Intern (Tech Innovators), Technical Team Lead (College Technical Society). All bullet points preserved verbatim.
9. **Certifications Section (`Certifications.tsx`):**
   - Credentials (7): Deloitte Cyber, Deloitte Data Analytics, Tata Data Visualisation, UMich Programming for Everybody, HackerRank Python (Basic), Google Responsible AI, Google Intro to LLMs.
10. **GitHub Stats Section (`GitHubStats.tsx`):**
    - Profile Overview (`@adityashm`) & Quick Tech Summary list.
11. **Contact Section (`Contact.tsx`) & Footer (`Footer.tsx`):**
    - Info: `adityashm09@gmail.com`, `+91 8130110355`, `New Delhi, India`.
    - Formspree POST endpoint: `https://formspree.io/f/mpqqalpl`.
    - Footer links: Sitemap (`https://adityashm.tech/sitemap.xml`), Robots (`https://adityashm.tech/robots.txt`).

### 5.2 Contact Formspree Integration Specification
- **Form Action:** `https://formspree.io/f/mpqqalpl`
- **Method:** `POST` with `Content-Type: application/json`
- **Request Payload Interface:**
  ```typescript
  interface ContactPayload {
    name: string;
    email: string;
    message: string;
  }
  ```
- **State Handling:** Loading state ("Sending..."), Success alert banner (5s timeout), Error banner with mailto fallback.

### 5.3 ThemeContext Integration Architecture
- `ThemeContext.tsx` manages `isDark` boolean state.
- Stores preference in `localStorage.getItem('theme')` (`'dark'` / `'light'`).
- Toggles `.dark` class on `document.documentElement` (`<html>`).
- **3D Canvas Adapter:** `SpaceCanvas` subscribes to `isDark` state:
  - In Dark Mode (`isDark === true`): Background `#030712`, star particles emissive intensity 1.0, post-processing bloom enabled.
  - In Light Mode (`isDark === false`): Background soft slate `#f8fafc`, particle color shifted to deep indigo `#4338ca`, bloom intensity lowered to 0.4.

### 5.4 Sub-Route Architecture & SPA Fallback Handler
- React Router 3 main routes: `/`, `/price-comparison`, `/expense-tracker`.
- `public/404.html` intercepts GitHub Pages direct sub-route refreshes:
  ```html
  <script>
    var pathSegmentsToKeep = 0;
    var l = window.location;
    l.replace(
      l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
      l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?route=' +
      l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/') +
      (l.search ? '&' + l.search.slice(1) : '') +
      l.hash
    );
  </script>
  ```
- `SpaRedirectHandler` in `App.tsx` reads `?route=` query param on initial render and calls `navigate(route, { replace: true })`.

### 5.5 SEO & JSON-LD Structured Data Schemas

#### Person Schema (`index.html`)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Aditya Sharma",
  "givenName": "Aditya",
  "familyName": "Sharma",
  "url": "https://adityashm.tech",
  "image": "https://adityashm.tech/IMG_1033.JPG",
  "email": "adityashm09@gmail.com",
  "telephone": "+91-8130110355",
  "jobTitle": "Final-year B.Tech CSE Student",
  "worksFor": {
    "@type": "EducationalOrganization",
    "name": "IMS Engineering College"
  },
  "sameAs": [
    "https://github.com/adityashm",
    "https://www.linkedin.com/in/adityashm/",
    "https://adityashm.tech"
  ],
  "knowsAbout": [
    "Python", "Go", "TypeScript", "Machine Learning", "Cybersecurity", 
    "Scikit-learn", "Streamlit", "Docker", "Linux", "Web Development", "Data Science"
  ]
}
```

#### WebSite Schema (`index.html`)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aditya Sharma Portfolio",
  "url": "https://adityashm.tech"
}
```

### 5.6 The 6 Mandatory Content Preservation Rules
1. **Rule 1 — Zero Data & Text Loss:** All biographic text, experience bullet points, credential IDs, and education details must be preserved verbatim.
2. **Rule 2 — 100% URL & Link Integrity:** All external credentials links, GitHub repo links, Railway demo links, and internal `/Aditya_Sharma_Resume.pdf` links must remain active.
3. **Rule 3 — Sub-Route Preservation:** `/expense-tracker` and `/price-comparison` must remain fully accessible via SPA client routing and 404 fallback redirects.
4. **Rule 4 — Theme Context Parity:** Dark/light mode switching, `localStorage` persistence, and 3D canvas theme adaptations must remain functional.
5. **Rule 5 — Formspree Submission Integrity:** `Contact.tsx` must post to `https://formspree.io/f/mpqqalpl` with exact JSON fields.
6. **Rule 6 — SEO & Structured Data Parity:** JSON-LD schemas, Open Graph, Twitter cards, and `react-helmet-async` header tags must be maintained.

---

## 6. Component Architecture & Implementation Roadmap

### 6.1 Target Directory & File Layout
```
d:/Aditya/coding/project/portfolio webtite/
├── DESIGN_BRIEF.md                       <-- Authoritative Master Design Brief (Project Root)
├── package.json                          <-- Add three, @react-three/fiber, @react-three/drei, framer-motion, gsap
├── tailwind.config.js                    <-- Extend cosmic colors, glows, backgrounds
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── SpaceCanvas.tsx           <-- Main R3F Canvas container
│   │   │   ├── StarfieldParticles.tsx    <-- Custom GLSL shader starfield (8,000 points)
│   │   │   ├── FloatingGeometries.tsx    <-- Floating icosahedron & wireframe torus
│   │   │   ├── SceneLighting.tsx         <-- Ambient, Directional, Cyan/Purple PointLights
│   │   │   ├── CameraRig.tsx             <-- Dampened mouse parallax & scroll camera tracking
│   │   │   └── PostProcessingStack.tsx   <-- EffectComposer (Bloom, Vignette, Noise)
│   │   ├── ui/
│   │   │   ├── TiltCard.tsx              <-- 3D perspective tilt container with mouse spotlight
│   │   │   ├── ScrollProgress.tsx        <-- Dual scroll bar & floating circular ring
│   │   │   ├── SectionWrapper.tsx        <-- Framer Motion section entry reveal wrapper
│   │   │   └── MagneticButton.tsx        <-- Physics-driven magnetic CTA wrapper
│   │   ├── Header.tsx                    <-- Glassmorphic header & nav links
│   │   ├── Hero.tsx                      <-- Hero content with 3D spatial alignment
│   │   ├── About.tsx                     <-- Bio & feature glass cards
│   │   ├── Education.tsx                 <-- Education details
│   │   ├── Skills.tsx                    <-- 6 Skill categories & floating tech badges
│   │   ├── Projects.tsx                  <-- Featured projects with category tabs & TiltCard
│   │   ├── Stats.tsx                     <-- GitHub API metrics
│   │   ├── Experience.tsx                <-- Timeline items
│   │   ├── Certifications.tsx            <-- 7 Credentials
│   │   ├── GitHubStats.tsx               <-- Profile card
│   │   ├── Contact.tsx                   <-- Formspree form & details
│   │   └── Footer.tsx                    <-- Social links & sitemap
│   ├── context/
│   │   └── ThemeContext.tsx              <-- Theme provider with 3D canvas sync
│   ├── pages/
│   │   ├── HomePage.tsx                  <-- Single-page portfolio wrapper
│   │   ├── ExpenseTracker.tsx            <-- Railway API expense sub-app
│   │   └── PriceComparison.tsx           <-- Railway API price comparison sub-app
│   ├── index.css                         <-- Glassmorphism CSS utilities & neon glows
│   └── App.tsx                           <-- Router & SPA fallback handler
```

### 6.2 Milestone Implementation Roadmap

#### Milestone 2: WebGL Canvas Infrastructure & Package Setup
- Install required WebGL dependencies (`three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `framer-motion`, `gsap`, `@types/three`).
- Implement `SpaceCanvas`, `StarfieldParticles` GLSL shaders, `SceneLighting`, `CameraRig`, `FloatingGeometries`, and `PostProcessingStack` inside `src/components/canvas/`.
- Configure `tailwind.config.js` and `src/index.css` with cosmic color tokens, glassmorphic card classes, and neon glow utility rules.

#### Milestone 3: Glassmorphic UI Overhaul & Section Migration
- Wrap all 11 content sections in `SectionWrapper` with Framer Motion entry reveals (`scale: 0.94 -> 1`, `rotateX: 8deg -> 0deg`).
- Upgrade project cards and skill category containers to use `TiltCard` with cursor spotlighting.
- Add magnetic physics CTAs (`useMagnetic`) for primary action buttons.
- Implement dual scroll progress indicators (top reading line + floating bottom-right percentage circle).
- Verify 100% content preservation, sub-route functionality (`/expense-tracker`, `/price-comparison`), and Formspree submission endpoint.

#### Milestone 4: Performance Profiling, Quality Assurance & Handoff
- Execute TypeScript compilation (`npm run build` / `tsc -b`).
- Run ESLint checks (`npm run lint`).
- Profile WebGL frame rate using Chrome DevTools Performance tab to guarantee 60 FPS on desktop and dynamic DPR throttling on mobile.
- Verify WCAG AA contrast compliance for text readability over glassmorphic panels.

---
*End of Authoritative Master Design Brief.*
