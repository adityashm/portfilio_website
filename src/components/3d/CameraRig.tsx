import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraRig() {
  useFrame((state, delta) => {
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    const maxScroll = typeof document !== 'undefined'
      ? Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      : 1;
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
