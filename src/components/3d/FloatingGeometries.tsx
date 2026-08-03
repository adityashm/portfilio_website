import { useRef } from 'react';
import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingGeometries() {
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (state && meshRef1.current) {
      meshRef1.current.rotation.x += delta * 0.2;
      meshRef1.current.rotation.y += delta * 0.3;
    }
    if (state && meshRef2.current) {
      meshRef2.current.rotation.x -= delta * 0.15;
      meshRef2.current.rotation.z += delta * 0.25;
    }
  });


  return (
    <group>
      {/* Glassmorphic Icosahedron floating near About/Skills section */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2} position={[5, -10, -5]}>
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

      {/* Glassmorphic Octahedron floating near Projects section */}
      <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} position={[-6, -18, -4]}>
        <mesh ref={meshRef2}>
          <octahedronGeometry args={[2.0, 0]} />
          <meshPhysicalMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={0.3}
            roughness={0.15}
            metalness={0.2}
            transmission={0.5}
            thickness={1.0}
            transparent
            opacity={0.65}
          />
        </mesh>
      </Float>
    </group>
  );
}
