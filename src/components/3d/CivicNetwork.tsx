import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const CivicNetwork: React.FC = () => {
  const lineRef = React.useRef<THREE.LineSegments>(null);
  const pointsRef = React.useRef<THREE.Points>(null);

  React.useEffect(() => {
    // Create network lines
    const points = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * 15, 0.5, Math.sin(angle) * 15));
    }
    points.push(points[0]);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x0066cc, linewidth: 2 });
    const line = new THREE.LineSegments(geometry, material);

    if (lineRef.current) {
      lineRef.current.add(line);
    }

    // Create network points
    const pointGeometry = new THREE.BufferGeometry();
    const pointPositions = new Float32Array(points.flatMap(p => [p.x, p.y + 1, p.z]));
    pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));

    const pointMaterial = new THREE.PointsMaterial({
      color: 0x0099ff,
      size: 0.5,
      sizeAttenuation: true,
    });

    const pts = new THREE.Points(pointGeometry, pointMaterial);
    if (pointsRef.current) {
      pointsRef.current.add(pts);
    }

    return () => {
      geometry.dispose();
      material.dispose();
      pointGeometry.dispose();
      pointMaterial.dispose();
    };
  }, []);

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.rotation.y += 0.0005;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <>
      <group ref={lineRef} />
      <group ref={pointsRef} />
    </>
  );
};
