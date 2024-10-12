import React from 'react';
import { render, screen } from '@testing-library/react';  
import Captcha from '../../components/Captcha'; 

// Mock the getUserMedia API before running any tests
beforeAll(() => {
  // Define a mock for the mediaDevices API, specifically the getUserMedia method
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      // Mock implementation of getUserMedia that resolves with a mock stream and mock track management
      getUserMedia: jest.fn(() =>
        Promise.resolve({
          getTracks: () => [{ stop: jest.fn() }], // Mock function for track management (stopping the stream)
        })
      ),
    },
  });
});

// Define the test suite for the Captcha component
describe('Captcha Component', () => {
  // Test case: Ensure that the "Take Selfie" button is rendered initially when the component loads
  it('renders the Take Selfie button initially', () => {
    // Render the Captcha component
    render(<Captcha />); 
    
    // Assert that the "Take Selfie" button is present in the document
    expect(screen.getByText('Take Selfie')).toBeInTheDocument();
  });
});
