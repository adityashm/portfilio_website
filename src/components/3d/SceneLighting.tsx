export default function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[10, 10, 10]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 5, 2]} intensity={2.0} color="#00f0ff" distance={20} />
      <pointLight position={[5, -5, -2]} intensity={2.0} color="#8b5cf6" distance={20} />
    </>
  );
}
