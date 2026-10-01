import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface LocationMarker3DProps {
  position?: [number, number, number];
}

export const LocationMarker3D: React.FC<LocationMarker3DProps> = ({ position = [0, 2, 0] }) => {
  const groupRef = React.useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.01;
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3 + position[1];
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshPhongMaterial color={0xff6b6b} emissive={0xff4444} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshPhongMaterial color={0xffffff} emissive={0xff9999} />
      </mesh>
    </group>
  );
};
