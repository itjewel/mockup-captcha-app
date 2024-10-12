'use client' // This directive tells Next.js to treat this file as a client-side component

import React from 'react'; // Import React to define functional components

// Import the Captcha component, which contains the logic for capturing a selfie and shape validation
import Captcha from './components/Captcha';

// The Home component is the main page component
export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Render the Captcha component, which will handle the entire CAPTCHA process */}
      <Captcha />
    </div>
  );
}
