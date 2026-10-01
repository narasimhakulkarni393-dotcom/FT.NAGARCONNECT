import React from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CityGrid } from './CityGrid';
import { CivicNetwork } from './CivicNetwork';

export const CityScene: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden bg-gradient-to-b from-sky-200 to-sky-50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 10, 20]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 15]} intensity={1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        
        <CityGrid />
        <CivicNetwork />
        
        {!prefersReducedMotion && (
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={2}
          />
        )}
      </Canvas>
    </div>
  );
};
