import React from 'react';
import * as THREE from 'three';

export const CityGrid: React.FC = () => {
  const gridRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    if (!gridRef.current) return;

    const gridHelper = new THREE.GridHelper(50, 50, 0x0066cc, 0xcce0ff);
    gridRef.current.add(gridHelper);

    return () => {
      gridRef.current?.clear();
    };
  }, []);

  return <group ref={gridRef} />;
};
