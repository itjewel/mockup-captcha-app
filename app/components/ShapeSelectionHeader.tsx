import React from 'react';

interface ShapeSelectionHeaderProps {
  selectedShape: string; // The shape selected by the user (e.g., △, ◯, □)
  selectedColor: string; // The color associated with the selected shape (e.g., red, green, blue)
}

// Functional component to display the header with selected shape and its color
const ShapeSelectionHeader: React.FC<ShapeSelectionHeaderProps> = ({ selectedShape, selectedColor }) => (
  // Header text to instruct the user to select all instances of the selected shape
  // Using Tailwind CSS classes for styling
  <h2 className="text-white text-lg mb-4">
    {/* Instruction text with the selected shape displayed in a larger font */}
    Select all shape <span className="text-2xl">{selectedShape}</span> color is {' '}
    {/* Display the color text with the actual selected color applied as inline style */}
    <span className="text-2xl" style={{ color: selectedColor }}>{selectedColor}</span>
  </h2>
);

export default ShapeSelectionHeader;
