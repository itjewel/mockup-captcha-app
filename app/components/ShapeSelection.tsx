import React, { useState, useEffect } from 'react';

interface ShapeSelectionProps {
  capturedImage: string;
  selectedShape: string;
  onValidate: (isValid: boolean) => void;
}

const ShapeSelection: React.FC<ShapeSelectionProps> = ({ capturedImage, selectedShape, onValidate }) => {
  const [watermarkedSectors, setWatermarkedSectors] = useState<{ idx: number; shape: string }[]>([]);
  const [userSelections, setUserSelections] = useState<number[]>([]);

  useEffect(() => {
    randomizeWatermarkedSectors();
  }, []);

  const getRandomShape = () => {
    const shapes = ['△', '◯', '□'];  // Triangle, Circle, Square
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const randomizeWatermarkedSectors = () => {
    const sectors = Array.from({ length: 16 }).map((_, idx) => ({
      idx,
      shape: getRandomShape(),
    }));
    const randomSectors = sectors.sort(() => 0.5 - Math.random()).slice(0, 8); // Randomly select 8 sectors
    setWatermarkedSectors(randomSectors);
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

    const isCorrect = correctSectors.every((sector) => userSelections.includes(sector)) &&
                      userSelections.every((selection) => correctSectors.includes(selection));

    onValidate(isCorrect);
  };

  return (
    <>
      <h2 className="text-white text-lg mb-4">Select all {selectedShape}</h2>
      <div className="relative flex justify-center items-center">
        {/* Display the captured selfie */}
        <img src={capturedImage} alt="Captured Selfie" className="w-full h-64 object-cover" />
        
        {/* Full grid background with opacity */}
        <div className="absolute right-5 bg-slate-300 bg-opacity-50 p-4 rounded-lg">  {/* Apply opacity here */}
          {/* Grid layout for sectors */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-[150px] h-[150px]">
            {Array.from({ length: 16 }).map((_, idx) => (
              <div
                key={idx}
                className={`border border-white flex items-center justify-center cursor-pointer ${
                  userSelections.includes(idx) ? 'bg-yellow-500' : ''
                }`}
                onClick={() => handleSectorClick(idx)}
              >
                {/* Render shapes (triangle, circle, square) */}
                <div className="w-5 h-5 flex items-center justify-center">
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '△' && (
                     <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[12px] border-l-transparent border-r-transparent border-b-white bg-opacity-50"></div>
                  )}
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '◯' && (
                    <div className="w-full h-full rounded-full border-2 border-white bg-slate-50 bg-opacity-50"></div>
                  )}
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '□' && (
                     <div className="w-full h-full border-2 border-white bg-slate-50 bg-opacity-50"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Validate button */}
      <button onClick={validateSelection} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Validate
      </button>
    </>
  );
};

export default ShapeSelection;
