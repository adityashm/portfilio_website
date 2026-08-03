import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import SceneLighting from './SceneLighting';
import StarfieldParticles from './StarfieldParticles';
import FloatingGeometries from './FloatingGeometries';
import CameraRig from './CameraRig';
import PostProcessingStack from './PostProcessingStack';

export default function SpaceCanvas() {
  const { isDark } = useTheme();
  const [dpr, setDpr] = useState<number>(1.5);

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-500 ${
        isDark ? 'bg-[#030712]' : 'bg-[#f8fafc]'
      }`}
    >
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
            <StarfieldParticles count={2500} />
            <FloatingGeometries />
            <CameraRig />
            {isDark && <PostProcessingStack />}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}
