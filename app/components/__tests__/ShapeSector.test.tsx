import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShapeSector from '../ShapeSector';

describe('ShapeSector Component', () => {
  const handleSectorClick = jest.fn();

  const defaultProps = {
    idx: 0,
    sector: {
      idx: 0,
      shape: '△' as const, // Triangle shape
      color: 'red',
    },
    userSelections: [],
    handleSectorClick,
  };

  test('renders triangle shape', () => {
    render(<ShapeSector {...defaultProps} />);

    const triangle = screen.getByRole('button');
    expect(triangle).toBeInTheDocument();

    const triangleDiv = triangle.querySelector('div');
    expect(triangleDiv).not.toBeNull(); // Ensure the shape is rendered
  });

  test('renders circle shape', () => {
    const propsWithCircle = {
      ...defaultProps,
      sector: { idx: 1, shape: '◯' as const, color: 'green' }, // Circle shape
    };
    render(<ShapeSector {...propsWithCircle} />);

    const circle = screen.getByRole('button');
    const circleDiv = circle.querySelector('div');
    expect(circleDiv).not.toBeNull(); // Ensure the shape is rendered
  });

  test('renders square shape', () => {
    const propsWithSquare = {
      ...defaultProps,
      sector: { idx: 2, shape: '□' as const, color: 'blue' }, // Square shape
    };
    render(<ShapeSector {...propsWithSquare} />);

    const square = screen.getByRole('button');
    const squareDiv = square.querySelector('div');
    expect(squareDiv).not.toBeNull(); // Ensure the shape is rendered
  });

  test('calls handleSectorClick when sector is clicked', () => {
    render(<ShapeSector {...defaultProps} />);

    const sectorButton = screen.getByRole('button');
    fireEvent.click(sectorButton);

    expect(handleSectorClick).toHaveBeenCalledWith(0);
  });

  test('applies selected style when the sector is selected', () => {
    const propsWithSelection = {
      ...defaultProps,
      userSelections: [0],
    };
    render(<ShapeSector {...propsWithSelection} />);

    const sectorButton = screen.getByRole('button');
    expect(sectorButton).toHaveClass('bg-yellow-500'); // Check if selected style is applied
  });
});
