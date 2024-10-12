import React from 'react'; // Add this import if it's missing
import { render, screen, fireEvent } from '@testing-library/react';
import ValidationResult from '../../components/ValidationResult';

describe('ValidationResult Component', () => {
  test('renders validation passed message when isValidated is true', () => {
    render(<ValidationResult isValidated={true} />);

    // Check if the validation passed message is rendered
    const successMessage = screen.getByText('Validation Passed!');
    expect(successMessage).toBeInTheDocument();

    // Check if the Retry button is rendered
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();
  });

  test('renders validation failed message when isValidated is false', () => {
    render(<ValidationResult isValidated={false} />);

    // Check if the validation failed message is rendered
    const failureMessage = screen.getByText('Validation Failed! Try Again.');
    expect(failureMessage).toBeInTheDocument();

    // Check if the Retry button is rendered
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();
  });

  test('reloads the window when Retry button is clicked', () => {
    // Mock the window.location.reload function
    const mockReload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload,
      },
      writable: true,
    });

    render(<ValidationResult isValidated={false} />);

    // Click the Retry button
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    // Check if window.location.reload was called
    expect(mockReload).toHaveBeenCalled();
  });
});
