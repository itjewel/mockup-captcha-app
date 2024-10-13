import React from 'react';
import { render, screen } from '@testing-library/react'; 
import ShapeSelectionHeader from '../../components/ShapeSelectionHeader'; 

describe('ShapeSelectionHeader Component', () => {
  // Test case: Verify that the component renders the correct shape and color
  it('renders the correct shape and color', () => {
    // Arrange: Set up the test data (props)
    const selectedShape = '△'; // Example shape (triangle)
    const selectedColor = 'blue'; // Example color (blue)

    // Act: Render the ShapeSelectionHeader component with the test data
    render(<ShapeSelectionHeader selectedShape={selectedShape} selectedColor={selectedColor} />);

    // Assert: Verify that the text "Select all shape" appears in the document
    // Use a regular expression with `getByText` to match the "Select all shape" text (case-insensitive)
    expect(screen.getByText(/Select all shape/i)).toBeInTheDocument();

    // Assert: Verify that the selected shape (△) is displayed in the document
    expect(screen.getByText(selectedShape)).toBeInTheDocument();

    // Assert: Verify that the selected color (blue) is displayed and styled correctly
    const colorText = screen.getByText(selectedColor); // Find the element displaying the selected color
    expect(colorText).toBeInTheDocument(); // Ensure the color text is in the document
    expect(colorText).toHaveStyle(`color: ${selectedColor}`); // Ensure the text has the correct inline color style
  });
});
