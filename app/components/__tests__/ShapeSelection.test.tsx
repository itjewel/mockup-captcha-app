import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShapeSelection from '../../components/ShapeSelection';

describe('ShapeSelection Component', () => {
  const props = {
    capturedImage: 'test-image.jpg',
    selectedShape: '△' as const,
    selectedColor: 'red',
    squarePosition: { top: 50, left: 50 },
    onValidate: jest.fn(),
  };

  test('renders a grid with 16 sectors', () => {
    render(<ShapeSelection {...props} />);

    // Ensure we're only selecting the sector buttons and not others (e.g., "Validate" button)
    const sectors = screen.getAllByRole('button', { hidden: false });
    
    // Filter out the Validate button (if any) by making sure we only get the sector buttons
    const sectorButtons = sectors.filter((button) => button.closest('.grid'));
    
    // Make sure there are exactly 16 sector buttons
    expect(sectorButtons.length).toBe(16);
  });

  test('selects a sector when clicked', () => {
    render(<ShapeSelection {...props} />);

    const sectors = screen.getAllByRole('button', { hidden: false });
    fireEvent.click(sectors[0]);

    expect(sectors[0]).toHaveClass('bg-yellow-500');
  });

  test('validates the selection correctly', () => {
    render(<ShapeSelection {...props} />);

    const sectors = screen.getAllByRole('button', { hidden: false });
    fireEvent.click(sectors[0]);
    fireEvent.click(sectors[1]);

    const validateButton = screen.getByText('Validate');
    fireEvent.click(validateButton);

    expect(props.onValidate).toHaveBeenCalledWith(expect.any(Boolean));
  });
});
