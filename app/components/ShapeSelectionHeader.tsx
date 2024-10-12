import React from 'react';

interface ShapeSelectionHeaderProps {
  selectedShape: string;
  selectedColor: string;
}

const ShapeSelectionHeader: React.FC<ShapeSelectionHeaderProps> = ({ selectedShape, selectedColor }) => (
    <h2 className="text-white text-lg mb-4">
    Select all shape <span className="text-2xl">{selectedShape}</span>  color is {' '}
    <span className="text-2xl" style={{ color: selectedColor }}>{selectedColor}</span> {/* Display correct color */}
  </h2>
);

export default ShapeSelectionHeader;
