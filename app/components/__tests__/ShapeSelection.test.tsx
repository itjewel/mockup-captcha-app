import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShapeSelection from '../../components/ShapeSelection'; 

// Define a test suite for the ShapeSelection component
describe('ShapeSelection Component', () => {
  // Define the common props to be used across all tests
  const props = {
    capturedImage: 'test-image.jpg', // Mocked image URL
    selectedShape: '△' as const, // Predefined shape (triangle)
    selectedColor: 'red', // Predefined color (red)
    squarePosition: { top: 50, left: 50 }, // Mocked position of the square
    onValidate: jest.fn(), // Mocked validation callback function (jest.fn() creates a mock function)
  };

  // Test case 1: Verify that the grid renders exactly 16 sectors
  test('renders a grid with 16 sectors', () => {
    render(<ShapeSelection {...props} />); // Render the ShapeSelection component with the given props

    // Get all elements that have the role 'button' (this includes sectors and possibly other buttons)
    const sectors = screen.getAllByRole('button', { hidden: false });
    
    // Filter out the Validate button by ensuring we only get the sector buttons inside the grid
    const sectorButtons = sectors.filter((button) => button.closest('.grid'));
    
    // Check that there are exactly 16 sector buttons in the grid
    expect(sectorButtons.length).toBe(16);
  });

  // Test case 2: Check if a sector gets selected when clicked
  test('selects a sector when clicked', () => {
    render(<ShapeSelection {...props} />); // Render the component with the given props

    // Get all the sector buttons (sectors are represented as buttons)
    const sectors = screen.getAllByRole('button', { hidden: false });

    // Simulate a click event on the first sector
    fireEvent.click(sectors[0]);

    // Verify that the first sector has the 'bg-yellow-500' class applied (indicating it was selected)
    expect(sectors[0]).toHaveClass('bg-yellow-500');
  });

  // Test case 3: Ensure that validation works correctly when clicking the Validate button
  test('validates the selection correctly', () => {
    render(<ShapeSelection {...props} />); // Render the component with the given props

    // Get all sector buttons
    const sectors = screen.getAllByRole('button', { hidden: false });

    // Simulate a click event on two sectors
    fireEvent.click(sectors[0]);
    fireEvent.click(sectors[1]);

    // Find the Validate button by its text content
    const validateButton = screen.getByText('Validate');
    
    // Simulate a click event on the Validate button
    fireEvent.click(validateButton);

    // Check if the onValidate function has been called with a boolean (indicating success or failure)
    expect(props.onValidate).toHaveBeenCalledWith(expect.any(Boolean));
  });
});
