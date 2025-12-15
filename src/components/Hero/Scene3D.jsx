import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Scene3D = ({ mousePosition }) => {
  const sphereRef = useRef();
  const lightRef = useRef();
  const geometryRef = useRef();

  useFrame((state) => {
    if (!sphereRef.current) return;

    const time = state.clock.getElapsedTime();

    sphereRef.current.rotation.x = time * 0.2;
    sphereRef.current.rotation.y = time * 0.3;

    const targetX = (mousePosition.x / window.innerWidth - 0.5) * 2;
    const targetY = -(mousePosition.y / window.innerHeight - 0.5) * 2;

    sphereRef.current.position.x = THREE.MathUtils.lerp(
      sphereRef.current.position.x,
      targetX * 0.5,
      0.05
    );
    sphereRef.current.position.y = THREE.MathUtils.lerp(
      sphereRef.current.position.y,
      targetY * 0.5,
      0.05
    );

    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);

        const distance = Math.sqrt(x * x + y * y + z * z);
        const offset = Math.sin(distance * 2 - time * 2) * 0.1;

        positions.setXYZ(
          i,
          x * (1 + offset),
          y * (1 + offset),
          z * (1 + offset)
        );
      }
      positions.needsUpdate = true;
    }

    if (lightRef.current) {
      lightRef.current.position.x = targetX * 3;
      lightRef.current.position.y = targetY * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#7c3aed" />

      <mesh ref={sphereRef} scale={2.5}>
        <sphereGeometry ref={geometryRef} args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#4f46e5"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[20, 20, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
    </>
  );
};

export default Scene3D;
