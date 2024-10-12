import React, { useState } from 'react';
import SelfieCapture from './SelfieCapture'; 
import ShapeSelection from './ShapeSelection'; 
import ValidationResult from './ValidationResult';

// Define the type for shapes, which can be a triangle (△), circle (◯), or square (□)
type Shape = '△' | '◯' | '□';

// Main Captcha component
const Captcha: React.FC = () => {
  // State to store the captured image (initially null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // State to manage the validation result: null = not validated yet, true = passed, false = failed
  const [isValidated, setIsValidated] = useState<boolean | null>(null);

  // State to store the selected shape for validation
  const [selectedShape, setSelectedShape] = useState<Shape>('△'); // Default shape is '△' (triangle)

  // State to store the selected color for the shape
  const [selectedColor, setSelectedColor] = useState<string>('red'); // Default color is 'red'

  // State to store the position of the square (top and left values) on the selfie
  const [squarePosition, setSquarePosition] = useState<{ top: number; left: number } | null>(null);

  // Function to handle the selfie capture event
  const handleSelfieCaptured = (image: string, squarePos: { top: number; left: number }) => {
    setCapturedImage(image); // Save the captured image to state
    setSquarePosition(squarePos);  // Save the square's position to state
    setSelectedShape(getRandomShape()); // Randomly select a shape for validation
    setSelectedColor(getRandomColor()); // Randomly select a color for the shape
  };

  // Function to randomly select a shape (△, ◯, or □)
  const getRandomShape = (): Shape => {
    const shapes: Shape[] = ['△', '◯', '□'];  // Available shapes
    return shapes[Math.floor(Math.random() * shapes.length)]; // Pick a random shape
  };

  // Function to randomly select a color ('red', 'green', or 'blue')
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue'];  // Available colors
    return colors[Math.floor(Math.random() * colors.length)]; // Pick a random color
  };

  return (
    // Main container for the Captcha component with full screen height and centered content
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* Inner container with padding, rounded corners, and a shadow for better UI */}
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg">
        {/* If no image has been captured yet, show the SelfieCapture component */}
        {capturedImage === null ? (
          <SelfieCapture onCapture={handleSelfieCaptured} />  // Selfie capture phase

        /* If the image has been captured but validation hasn't happened yet, show the ShapeSelection component */
        ) : isValidated === null ? (
          <ShapeSelection
            capturedImage={capturedImage}  // Pass the captured image
            selectedShape={selectedShape}  // Pass the selected shape for validation
            selectedColor={selectedColor}  // Pass the selected color for the shape
            squarePosition={squarePosition!}  // Pass the position of the square (non-null assertion since it's guaranteed)
            onValidate={setIsValidated}  // Pass the function to handle validation result
          />
        ) : (
          /* If validation has occurred (either passed or failed), show the ValidationResult component */
          <ValidationResult isValidated={isValidated} />  // Show validation result
        )}
      </div>
    </div>
  );
};

export default Captcha;
