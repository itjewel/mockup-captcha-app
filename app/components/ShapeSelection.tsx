import React, { useState, useEffect } from 'react';
import ShapeSelectionHeader from './ShapeSelectionHeader';
import ShapeSector from './ShapeSector';
// Assain 3 shape
type Shape = '△' | '◯' | '□';

interface ShapeSelectionProps {
  capturedImage: string;
  selectedShape: Shape;
  selectedColor: string;
  squarePosition: { top: number; left: number };
  onValidate: (isValid: boolean) => void;
}

const ShapeSelection: React.FC<ShapeSelectionProps> = ({
  capturedImage,
  selectedShape,
  squarePosition,
  onValidate,
}) => {
  const [watermarkedSectors, setWatermarkedSectors] = useState<{ idx: number; shape: Shape; color: string }[]>([]);
  const [userSelections, setUserSelections] = useState<number[]>([]);

  useEffect(() => {
    randomizeWatermarkedSectors();
  }, []);

  const shapeColorMap: Record<Shape, string> = {
    '△': 'red',
    '◯': 'green',
    '□': 'blue',
  };

  const randomizeWatermarkedSectors = () => {
    const shapes: Shape[] = ['△', '◯', '□'];
    const sectorsWithShapes = Array.from({ length: 16 }).map((_, idx) => {
      const fillShape = Math.random() < 0.5;
      if (fillShape) {
        const shape: Shape = shapes[Math.floor(Math.random() * shapes.length)];
        return { idx, shape, color: shapeColorMap[shape] };
      }
      return { idx, shape: '' as Shape, color: '' };
    });

    setWatermarkedSectors(sectorsWithShapes);
  };

  const handleSectorClick = (idx: number) => {
    if (!userSelections.includes(idx)) {
      setUserSelections([...userSelections, idx]);
    }
  };

  const validateSelection = () => {
    const correctSectors = watermarkedSectors
      .filter((sector) => sector.shape === selectedShape)
      .map((sector) => sector.idx);

    const isCorrect =
      correctSectors.every((sector) => userSelections.includes(sector)) &&
      userSelections.every((selection) => correctSectors.includes(selection));

    onValidate(isCorrect);
  };

  return (
    <>
      <ShapeSelectionHeader selectedShape={selectedShape} selectedColor={shapeColorMap[selectedShape]} />
      <div className="relative flex justify-center items-center">
        <img src={capturedImage} alt="Captured Selfie" className="w-full h-64 object-cover" />
        <div
          className="absolute border-2 bg-slate-100 bg-opacity-50 rounded-lg"
          style={{
            top: `${squarePosition.top}%`,
            left: `${squarePosition.left}%`,
            width: '45%',
            height: '45%',
          }}
        >
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full p-1">
            {Array.from({ length: 16 }).map((_, idx) => {
              const sector = watermarkedSectors.find((sector) => sector.idx === idx);
              if (!sector) return null;
              return (
                <ShapeSector
                  key={sector.idx}
                  idx={sector.idx}
                  sector={sector}
                  userSelections={userSelections}
                  handleSectorClick={handleSectorClick}
                />
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={validateSelection} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Validate
      </button>
    </>
  );
};

export default ShapeSelection;
