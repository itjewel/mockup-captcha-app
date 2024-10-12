import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react'; 
import SelfieCapture from '../../components/SelfieCapture';

// Mock the getUserMedia API before running any tests
beforeAll(() => {
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      // Mock implementation of getUserMedia that resolves with a mock stream
      getUserMedia: jest.fn(() =>
        Promise.resolve({
          getTracks: () => [{ stop: jest.fn() }], // Mock track management functions
        })
      ),
    },
  });

  // Mock the toDataURL method for the canvas to simulate image capturing
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    value: jest.fn(() => 'data:image/png;base64,mockedImageData'), // Mock base64 image data
  });
});

// Define the test suite for the SelfieCapture component
describe('SelfieCapture Component', () => {
  // Test case 1: Ensure the video element renders
  it('renders the video element', async () => {
    const { container } = render(<SelfieCapture onCapture={jest.fn()} />); // Render the component
    const videoElement = container.querySelector('video'); // Select the video element
    expect(videoElement).toBeInTheDocument(); // Assert that the video element is in the document
  });

  // Test case 2: Ensure the square moves randomly every 2 seconds
  it('moves the square randomly every 2 seconds', () => {
    jest.useFakeTimers(); // Use fake timers to control time-based behavior
    const { container } = render(<SelfieCapture onCapture={jest.fn()} />); // Render the component
    
    // Initially, check the default position of the square
    let square = container.querySelector('.absolute.border-2');
    expect(square).toHaveStyle('top: 30%'); // Initial top position
    expect(square).toHaveStyle('left: 30%'); // Initial left position
    
    // Move the timer forward by 2 seconds
    act(() => {
      jest.advanceTimersByTime(2000); // Simulate time passing by 2 seconds
    });

    // After the timer advances, the square should have moved to a new random position
    square = container.querySelector('.absolute.border-2');
    expect(square).not.toHaveStyle('top: 30%'); // The new top position should be different
    expect(square).not.toHaveStyle('left: 30%'); // The new left position should be different

    jest.useRealTimers(); // Reset to real timers
  });

  // Test case 3: Ensure the image is captured and the onCapture callback is called with correct arguments
  it('captures the image and calls onCapture with correct arguments', async () => {
    const mockOnCapture = jest.fn(); // Create a mock function for the onCapture callback

    // Mock the dimensions of the video element
    Object.defineProperty(HTMLVideoElement.prototype, 'videoWidth', {
      value: 640, // Set the video width
    });
    Object.defineProperty(HTMLVideoElement.prototype, 'videoHeight', {
      value: 480, // Set the video height
    });

    const { container } = render(<SelfieCapture onCapture={mockOnCapture} />); // Render the component with the mock onCapture

    // Mock the drawing context for the canvas
    const mockContext = {
      drawImage: jest.fn(), // Mock the drawImage function
      getImageData: jest.fn(), // Mock the getImageData function
    };
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as any); // Spy on and mock getContext

    // Find and click the "Continue" button to trigger image capture
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    // Ensure that drawImage was called to capture the video frame
    expect(mockContext.drawImage).toHaveBeenCalled();

    // Ensure that onCapture was called with the mocked image data and the correct square position
    expect(mockOnCapture).toHaveBeenCalledWith('data:image/png;base64,mockedImageData', { top: 30, left: 30 });
  });
});
