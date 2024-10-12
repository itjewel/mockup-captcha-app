import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import ShapeSector from '../ShapeSector';

// Define the test suite for the ShapeSector component
describe('ShapeSector Component', () => {
  // Create a mock function to simulate handleSectorClick behavior
  const handleSectorClick = jest.fn();

  // Define default props that will be reused across multiple tests
  const defaultProps = {
    idx: 0, // Index of the sector
    sector: {
      idx: 0, // Sector index
      shape: '△' as const, // Shape for the sector (triangle in this case)
      color: 'red', // Color of the shape (red)
    },
    userSelections: [], // User selections (empty initially)
    handleSectorClick, // Mocked handleSectorClick function
  };

  // Test case 1: Ensure that a triangle shape is rendered correctly
  test('renders triangle shape', () => {
    render(<ShapeSector {...defaultProps} />); // Render the component with default props

    const triangle = screen.getByRole('button'); // Get the button that represents the sector
    expect(triangle).toBeInTheDocument(); // Ensure the button is rendered

    const triangleDiv = triangle.querySelector('div'); // Find the div element inside the button that represents the triangle
    expect(triangleDiv).not.toBeNull(); // Ensure the triangle shape is rendered inside the button
  });

  // Test case 2: Ensure that a circle shape is rendered correctly
  test('renders circle shape', () => {
    const propsWithCircle = {
      ...defaultProps, // Copy default props
      sector: { idx: 1, shape: '◯' as const, color: 'green' }, // Update the sector to have a circle shape and green color
    };
    render(<ShapeSector {...propsWithCircle} />); // Render the component with the modified props

    const circle = screen.getByRole('button'); // Get the button representing the sector
    const circleDiv = circle.querySelector('div'); // Find the div element inside the button that represents the circle
    expect(circleDiv).not.toBeNull(); // Ensure the circle shape is rendered
  });

  // Test case 3: Ensure that a square shape is rendered correctly
  test('renders square shape', () => {
    const propsWithSquare = {
      ...defaultProps, // Copy default props
      sector: { idx: 2, shape: '□' as const, color: 'blue' }, // Update the sector to have a square shape and blue color
    };
    render(<ShapeSector {...propsWithSquare} />); // Render the component with the modified props

    const square = screen.getByRole('button'); // Get the button representing the sector
    const squareDiv = square.querySelector('div'); // Find the div element inside the button that represents the square
    expect(squareDiv).not.toBeNull(); // Ensure the square shape is rendered
  });

  // Test case 4: Ensure that handleSectorClick is called when a sector is clicked
  test('calls handleSectorClick when sector is clicked', () => {
    render(<ShapeSector {...defaultProps} />); // Render the component with default props

    const sectorButton = screen.getByRole('button'); // Get the button representing the sector
    fireEvent.click(sectorButton); // Simulate a click on the sector button

    expect(handleSectorClick).toHaveBeenCalledWith(0); // Ensure the mock function was called with the correct index (0)
  });

  // Test case 5: Ensure that the selected style is applied when the sector is selected
  test('applies selected style when the sector is selected', () => {
    const propsWithSelection = {
      ...defaultProps, // Copy default props
      userSelections: [0], // Update userSelections to include index 0, marking it as selected
    };
    render(<ShapeSector {...propsWithSelection} />); // Render the component with modified props

    const sectorButton = screen.getByRole('button'); // Get the button representing the sector
    expect(sectorButton).toHaveClass('bg-yellow-500'); // Ensure the selected style ('bg-yellow-500') is applied to the button
  });
});
