import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function PostProcessingStack() {
  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
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
