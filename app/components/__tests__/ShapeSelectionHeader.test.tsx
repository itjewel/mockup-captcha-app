import React from 'react';
import { render, screen } from '@testing-library/react';
import ShapeSelectionHeader from '../../components/ShapeSelectionHeader'; 

describe('ShapeSelectionHeader Component', () => {
  it('renders the correct shape and color', () => {
    // Arrange: set up the props
    const selectedShape = '△';
    const selectedColor = 'blue';

    // Act: render the component
    render(<ShapeSelectionHeader selectedShape={selectedShape} selectedColor={selectedColor} />);

    // Assert: check if the shape and color are displayed correctly
    // Use regular expressions to match the parts of the text
    expect(screen.getByText(/Select all shape/i)).toBeInTheDocument();
    expect(screen.getByText(selectedShape)).toBeInTheDocument();
    
    const colorText = screen.getByText(selectedColor);
    expect(colorText).toBeInTheDocument();
    expect(colorText).toHaveStyle(`color: ${selectedColor}`);
  });
});
