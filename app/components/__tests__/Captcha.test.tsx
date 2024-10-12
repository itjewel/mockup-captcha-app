import React from 'react';
import { render, screen } from '@testing-library/react';  
import Captcha from '../../components/Captcha'; 

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

describe('Captcha Component', () => {
  it('renders the Take Selfie button initially', () => {
    render(<Captcha />); 
    expect(screen.getByText('Take Selfie')).toBeInTheDocument();
  });
});
