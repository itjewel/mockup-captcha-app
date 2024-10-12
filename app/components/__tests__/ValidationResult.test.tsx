import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react'; 
import ValidationResult from '../../components/ValidationResult'; 

// Define the test suite for the ValidationResult component
describe('ValidationResult Component', () => {
  
  // Test case 1: Check if the "Validation Passed!" message is rendered when isValidated is true
  test('renders validation passed message when isValidated is true', () => {
    // Render the component with isValidated set to true
    render(<ValidationResult isValidated={true} />);

    // Find the success message "Validation Passed!" in the document
    const successMessage = screen.getByText('Validation Passed!');
    expect(successMessage).toBeInTheDocument(); // Assert that the message is present

    // Find the "Retry" button in the document
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument(); // Assert that the Retry button is present
  });

  // Test case 2: Check if the "Validation Failed! Try Again." message is rendered when isValidated is false
  test('renders validation failed message when isValidated is false', () => {
    // Render the component with isValidated set to false
    render(<ValidationResult isValidated={false} />);

    // Find the failure message "Validation Failed! Try Again." in the document
    const failureMessage = screen.getByText('Validation Failed! Try Again.');
    expect(failureMessage).toBeInTheDocument(); // Assert that the failure message is present

    // Find the "Retry" button in the document
    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument(); // Assert that the Retry button is present
  });

  // Test case 3: Check if the window reloads when the "Retry" button is clicked
  test('reloads the window when Retry button is clicked', () => {
    // Mock the window.location.reload function to track if it is called
    const mockReload = jest.fn(); // Create a mock function for reload
    Object.defineProperty(window, 'location', {
      value: {
        reload: mockReload, // Replace the reload method with the mock function
      },
      writable: true, // Allow modification of the location object
    });

    // Render the component with isValidated set to false (to display the Retry button)
    render(<ValidationResult isValidated={false} />);

    // Find and click the "Retry" button
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton); // Simulate a click on the Retry button

    // Assert that the window.location.reload function was called
    expect(mockReload).toHaveBeenCalled();
  });
});
