import React, { useEffect, useRef } from 'react';

export function GrowingPlants() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createPlant = () => {
      const plant = document.createElement('div');
      plant.className = 'plant';
      plant.style.left = `${Math.random() * 100}%`;
      plant.style.height = `${50 + Math.random() * 100}px`;
      plant.style.animationDuration = `${2 + Math.random() * 3}s`;
      container.appendChild(plant);

      setTimeout(() => {
        plant.remove();
      }, 3000);
    };

    const interval = setInterval(createPlant, 300);
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="growing-plants" />;
}