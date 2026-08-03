import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const starVertexShader = `
uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute vec3 aColor;
varying vec3 vColor;

void main() {
  vColor = aColor;
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  // Smooth float oscillation across particles
  modelPosition.y += sin(uTime * 0.5 + modelPosition.x * 2.0) * 0.15;
  modelPosition.x += cos(uTime * 0.3 + modelPosition.y * 1.5) * 0.10;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  
  // Distance-based particle point size attenuation
  gl_PointSize = aScale * uPixelRatio * (20.0 / -viewPosition.z);
}
`;

const starFragmentShader = `
varying vec3 vColor;

void main() {
  // Circular falloff calculation
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;
  
  float alpha = smoothstep(0.5, 0.0, dist);
  gl_FragColor = vec4(vColor, alpha * 0.85);
}
`;

export default function StarfieldParticles({ count = 8000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, colors, scales } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sca = new Float32Array(count);

    const baseColors = [
      new THREE.Color('#00f0ff'), // Cyan
      new THREE.Color('#8b5cf6'), // Violet/Purple
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
    uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
  }), []);

  useFrame((state, delta) => {
    if (state && pointsRef.current) {
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
