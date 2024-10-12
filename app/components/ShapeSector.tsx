import React from 'react';

// Define the type for the possible shapes used in the grid
type Shape = '△' | '◯' | '□';

// Define the props that the ShapeSector component will receive
interface ShapeSectorProps {
  idx: number; // The index of the sector (0 to 15 in a 4x4 grid)
  sector: { idx: number; shape: Shape; color: string }; // The sector object containing shape and color details
  userSelections: number[]; // Array of user-selected sector indices
  handleSectorClick: (idx: number) => void; // Function to handle the sector click event
}

// Functional component to render a single sector (cell) in the 4x4 grid
const ShapeSector: React.FC<ShapeSectorProps> = ({ idx, sector, userSelections, handleSectorClick }) => (
  <div
    key={idx} // Unique key for the sector
    role="button" // Accessible role to indicate the sector is clickable
    className={`border border-white flex items-center justify-center cursor-pointer ${
      userSelections.includes(idx) ? 'bg-yellow-500' : '' // Highlight the sector if the user has selected it
    }`}
    onClick={() => handleSectorClick(idx)} // Call the click handler with the sector index when clicked
  >
    {/* Conditionally render the shape inside the sector, if it exists */}
    {sector?.shape && (
      <div className="w-6 h-6 flex items-center justify-center">
        {/* If the shape is a triangle (△), render the triangle with the correct color */}
        {sector.shape === '△' && (
          <div
            className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-l-transparent border-r-transparent"
            style={{ borderBottomColor: sector.color }} // Apply the color from the sector's color property
          ></div>
        )}
        {/* If the shape is a circle (◯), render the circle with the correct color */}
        {sector.shape === '◯' && (
          <div
            className="w-full h-full rounded-full border-2"
            style={{ borderColor: sector.color }} // Apply the color to the circle's border
          ></div>
        )}
        {/* If the shape is a square (□), render the square with the correct color */}
        {sector.shape === '□' && (
          <div
            className="w-full h-full border-2"
            style={{ borderColor: sector.color }} // Apply the color to the square's border
          ></div>
        )}
      </div>
    )}
  </div>
);

export default ShapeSector;
