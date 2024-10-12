import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SelfieCapture from '../../components/SelfieCapture'; // Adjust the path based on your structure

// Mock the getUserMedia API
beforeAll(() => {
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: jest.fn(() =>
        Promise.resolve({
          getTracks: () => [{ stop: jest.fn() }],
        })
      ),
    },
  });

  // Mock the HTMLCanvasElement.toDataURL method
  Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
    value: jest.fn(() => 'data:image/png;base64,mockedImageData'),
  });
});

describe('SelfieCapture Component', () => {
  it('renders the video element', async () => {
    const { container } = render(<SelfieCapture onCapture={jest.fn()} />);
    const videoElement = container.querySelector('video');
    expect(videoElement).toBeInTheDocument();
  });

  it('moves the square randomly every 2 seconds', () => {
    jest.useFakeTimers();
    const { container } = render(<SelfieCapture onCapture={jest.fn()} />);
    
    let square = container.querySelector('.absolute.border-2');
    expect(square).toHaveStyle('top: 30%');
    expect(square).toHaveStyle('left: 30%');
    
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    square = container.querySelector('.absolute.border-2');
    expect(square).not.toHaveStyle('top: 30%');
    expect(square).not.toHaveStyle('left: 30%');

    jest.useRealTimers();
  });

  it('captures the image and calls onCapture with correct arguments', async () => {
    const mockOnCapture = jest.fn();

    // Mock video element dimensions
    Object.defineProperty(HTMLVideoElement.prototype, 'videoWidth', {
      value: 640,
    });
    Object.defineProperty(HTMLVideoElement.prototype, 'videoHeight', {
      value: 480,
    });

    const { container } = render(<SelfieCapture onCapture={mockOnCapture} />);

    // Mock the drawImage function
    const mockContext = {
      drawImage: jest.fn(),
      getImageData: jest.fn(),
    };
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(mockContext as any);

    // Click the "Continue" button to trigger the captureImage function
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    // Ensure the canvas was drawn and onCapture was called with mocked image data
    expect(mockContext.drawImage).toHaveBeenCalled();
    expect(mockOnCapture).toHaveBeenCalledWith('data:image/png;base64,mockedImageData', { top: 30, left: 30 });
  });
});
