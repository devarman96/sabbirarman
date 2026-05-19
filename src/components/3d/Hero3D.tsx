import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, MeshDistortMaterial, Sparkles, Environment } from '@react-three/drei';
import * as THREE from 'three';

function LaptopModel() {
  const meshRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    meshRef.current.position.y = Math.sin(time) * 0.1;
  });

  return (
    <group ref={meshRef} scale={1.2}>
      {/* Laptop Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop Screen */}
      <group position={[0, 0.45, -0.5]} rotation={[-0.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.5, 1, 0.05]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Glow Surface */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[1.4, 0.9]} />
          <meshStandardMaterial 
            color="#6366f1" 
            emissive="#6366f1" 
            emissiveIntensity={2} 
            transparent 
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Floating Elements */}
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-1.2, 0.5, 0.5]} rotation={[0.4, 0.2, 0]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <MeshDistortMaterial color="#8b5cf6" speed={5} distort={0.4} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[1.2, -0.5, -0.5]} rotation={[0.1, 0.8, 0.4]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function Grid() {
  return (
    <gridHelper 
      args={[20, 20, "#1e293b", "#0f172a"]} 
      position={[0, -1, 0]} 
    />
  );
}

const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#020617"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            snap={true}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <group position={[1.5, 0, 0]}>
              <LaptopModel />
              <Sparkles count={50} scale={5} size={2} speed={0.4} color="#6366f1" />
            </group>
          </PresentationControls>
          <Grid />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Hero3D;

