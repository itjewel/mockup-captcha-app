import React, { useState, useEffect } from 'react';
import ShapeSelectionHeader from './ShapeSelectionHeader';
import ShapeSector from './ShapeSector';

// The shape can either be a triangle (△), circle (◯), or square (□)
type Shape = '△' | '◯' | '□';

// Define the props that the ShapeSelection component will receive
interface ShapeSelectionProps {
  capturedImage: string; // URL or base64 string of the captured image (selfie)
  selectedShape: Shape; // The shape that the user must validate (e.g., △)
  selectedColor: string; // The color associated with the selected shape
  squarePosition: { top: number; left: number }; // Position of the validation square (in percentage)
  onValidate: (isValid: boolean) => void; // Callback function to handle validation result
}

const ShapeSelection: React.FC<ShapeSelectionProps> = ({
  capturedImage,
  selectedShape,
  squarePosition,
  onValidate,
}) => {
  // State to manage the sectors containing shapes with watermarks
  const [watermarkedSectors, setWatermarkedSectors] = useState<{ idx: number; shape: Shape; color: string }[]>([]);

  // State to track the sectors clicked by the user
  const [userSelections, setUserSelections] = useState<number[]>([]);

  // useEffect hook to randomize the watermarked sectors when the component mounts
  useEffect(() => {
    randomizeWatermarkedSectors();
  }, []);

  // Map of shapes to their corresponding colors for the UI
  const shapeColorMap: Record<Shape, string> = {
    '△': 'red',
    '◯': 'green',
    '□': 'blue',
  };

  // Function to randomize sectors with shapes (some sectors will contain shapes, others will be empty)
  const randomizeWatermarkedSectors = () => {
    const shapes: Shape[] = ['△', '◯', '□']; // Array of available shapes
    const sectorsWithShapes = Array.from({ length: 16 }).map((_, idx) => {
      // Randomly decide if the sector should contain a shape (50% chance)
      const fillShape = Math.random() < 0.5;
      if (fillShape) {
        // Randomly pick a shape from the shapes array
        const shape: Shape = shapes[Math.floor(Math.random() * shapes.length)];
        return { idx, shape, color: shapeColorMap[shape] }; // Assign shape and color to the sector
      }
      return { idx, shape: '' as Shape, color: '' }; // Empty sector (no shape or color)
    });

    // Set the randomized sectors with shapes to the state
    setWatermarkedSectors(sectorsWithShapes);
  };

  // Handle clicks on individual sectors
  const handleSectorClick = (idx: number) => {
    // Add the sector index to user selections if it hasn't been selected already
    if (!userSelections.includes(idx)) {
      setUserSelections([...userSelections, idx]);
    }
  };

  // Function to validate the user's selection against the correct sectors
  const validateSelection = () => {
    // Find the sectors that contain the correct shape (matching selectedShape)
    const correctSectors = watermarkedSectors
      .filter((sector) => sector.shape === selectedShape)
      .map((sector) => sector.idx);

    // Check if the user's selections match the correct sectors exactly
    const isCorrect =
      correctSectors.every((sector) => userSelections.includes(sector)) &&
      userSelections.every((selection) => correctSectors.includes(selection));

    // Call the onValidate callback with the validation result (true or false)
    onValidate(isCorrect);
  };

  return (
    <>
      {/* Render the header displaying the selected shape and its corresponding color */}
      <ShapeSelectionHeader selectedShape={selectedShape} selectedColor={shapeColorMap[selectedShape]} />
      
      {/* Container for the captured image and the grid of sectors */}
      <div className="relative flex justify-center items-center">
        {/* Display the captured selfie image */}
        <img src={capturedImage} alt="Captured Selfie" className="w-full h-64 object-cover" />
        
        {/* Overlay square (with randomized position) that contains the sectors with shapes */}
        <div
          className="absolute border-2 bg-slate-100 bg-opacity-50 rounded-lg"
          style={{
            top: `${squarePosition.top}%`, // Set square's top position as a percentage
            left: `${squarePosition.left}%`, // Set square's left position as a percentage
            width: '45%', // Width of the square
            height: '45%', // Height of the square
          }}
        >
          {/* 4x4 grid to display the sectors (16 sectors in total) */}
          <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full p-1">
            {Array.from({ length: 16 }).map((_, idx) => {
              // Find the sector data (shape and color) for the current index
              const sector = watermarkedSectors.find((sector) => sector.idx === idx);
              if (!sector) return null; // Skip if no sector data found

              // Render each sector using the ShapeSector component
              return (
                <ShapeSector
                  key={sector.idx} // Unique key for each sector
                  idx={sector.idx} // Sector index
                  sector={sector} // Sector data (shape and color)
                  userSelections={userSelections} // User's selected sectors
                  handleSectorClick={handleSectorClick} // Function to handle sector click
                />
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Button to trigger validation of the user's selection */}
      <button onClick={validateSelection} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Validate
      </button>
    </>
  );
};

export default ShapeSelection;
