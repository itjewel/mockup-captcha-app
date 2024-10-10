import React, { useState, useEffect } from 'react';

interface ShapeSelectionProps {
  capturedImage: string;
  selectedShape: string;
  squarePosition: { top: number; left: number };  // Add squarePosition prop to align with the moving square
  onValidate: (isValid: boolean) => void;
}

const ShapeSelection: React.FC<ShapeSelectionProps> = ({
  capturedImage,
  selectedShape,
  squarePosition,
  onValidate,
}) => {
  const [watermarkedSectors, setWatermarkedSectors] = useState<{ idx: number; shape: string }[]>([]);
  const [userSelections, setUserSelections] = useState<number[]>([]);

  useEffect(() => {
    randomizeWatermarkedSectors();
  }, []);

  const getRandomShape = () => {
    const shapes = ['△', '◯', '□']; // Triangle, Circle, Square
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

    const isCorrect =
      correctSectors.every((sector) => userSelections.includes(sector)) &&
      userSelections.every((selection) => correctSectors.includes(selection));

    onValidate(isCorrect);
  };

  return (
    <>
      <h2 className="text-white text-lg mb-4">
        Select all for validate <span className="text-2xl">{selectedShape}</span>
      </h2>
      <div className="relative flex justify-center items-center">
        {/* Display the captured selfie */}
        <img src={capturedImage} alt="Captured Selfie" className="w-full h-64 object-cover" />

        {/* Align the selection grid to the squarePosition */}
        <div
          className="absolute border-2 bg-slate-300 bg-opacity-40 rounded-lg"
          style={{
            top: `${squarePosition.top}%`,   // Use the passed squarePosition for top
            left: `${squarePosition.left}%`, // Use the passed squarePosition for left
            width: '50%',                    // Same width as the moving square
            height: '50%',                   // Same height as the moving square
          }}
        >
          {/* Grid layout for sectors */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full p-1">
            {Array.from({ length: 16 }).map((_, idx) => (
              <div
                key={idx}
                className={`border border-white flex items-center justify-center cursor-pointer ${
                  userSelections.includes(idx) ? 'bg-yellow-500' : ''
                }`}
                onClick={() => handleSectorClick(idx)}
              >
                {/* Render shapes (triangle, circle, square) */}
                <div className="w-6 h-6 flex items-center justify-center">
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '△' && (
                    <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent border-b-white"></div>
                  )}
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '◯' && (
                    <div className="w-full h-full rounded-full border-2 border-white"></div>
                  )}
                  {watermarkedSectors.find((sector) => sector.idx === idx)?.shape === '□' && (
                    <div className="w-full h-full border-2 border-white"></div>
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
