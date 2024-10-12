import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SelfieCapture from '../SelfieCapture';
import '@testing-library/jest-dom/extend-expect'; 

// Mock getUserMedia function
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
});

describe('SelfieCapture Component', () => {
  it('renders the video element', () => {
    render(<SelfieCapture onCapture={jest.fn()} />);
    const videoElement = screen.getByRole('video');
    expect(videoElement).toBeInTheDocument();
  });

 
});
