import React from 'react';
import { useFrame } from '@react-three/fiber';

export const FloatingMapLayer: React.FC = () => {
  const planeRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (planeRef.current) {
      planeRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.2;
    }
  });

  return (
    <mesh ref={planeRef} position={[0, 0.1, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshPhongMaterial color={0xeef2f5} side={2} />
    </mesh>
  );
};
