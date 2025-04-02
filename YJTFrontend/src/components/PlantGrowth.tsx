import React from 'react';
import { Sprout, Plane as Plant, Trees as Tree } from 'lucide-react';

interface PlantGrowthProps {
  stage: number;
  totalStages: number;
}

export function PlantGrowth({ stage, totalStages }: PlantGrowthProps) {
  const progress = (stage / totalStages) * 100;

  const getPlantIcon = () => {
    if (progress < 33) return <Sprout className="w-12 h-12 text-emerald-500" />;
    if (progress < 66) return <Plant className="w-12 h-12 text-emerald-600" />;
    return <Tree className="w-12 h-12 text-emerald-700" />;
  };

  return (
    <div className="flex flex-col items-center">
      {getPlantIcon()}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
        <div
          className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Growth Progress: {Math.round(progress)}%
      </p>
    </div>
  );
}