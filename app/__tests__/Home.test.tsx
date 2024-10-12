import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../page';  
import Captcha from '../components/Captcha'; 

// Mocking the Captcha component
jest.mock('../components/Captcha', () => () => <div>Mock Captcha</div>);

describe('Home Component', () => {
  test('renders the Captcha component', () => {
    render(<Home />);

    // Check if the Captcha component is rendered
    const captchaElement = screen.getByText('Mock Captcha');
    expect(captchaElement).toBeInTheDocument();
  });
});
