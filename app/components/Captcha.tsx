import React, { useState } from 'react';
import SelfieCapture from './SelfieCapture';
import ShapeSelection from './ShapeSelection';
import ValidationResult from './ValidationResult';

type Shape = '△' | '◯' | '□';  // Define valid shape types

const Captcha: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState<boolean | null>(null); // null = not validated, true = passed, false = failed
  const [selectedShape, setSelectedShape] = useState<Shape>('△'); // Shape for validation
  const [selectedColor, setSelectedColor] = useState<string>('red'); // Color for validation
  const [squarePosition, setSquarePosition] = useState<{ top: number; left: number } | null>(null);

  // Handle when selfie is captured
  const handleSelfieCaptured = (image: string, squarePos: { top: number; left: number }) => {
    setCapturedImage(image);
    setSquarePosition(squarePos);  // Ensure square position is captured here
    setSelectedShape(getRandomShape());
    setSelectedColor(getRandomColor()); // Generate random color
  };

  // Random shape generator
  const getRandomShape = (): Shape => {
    const shapes: Shape[] = ['△', '◯', '□'];  // Triangle, Circle, Square
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  // Random color generator
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue'];  // Red, Green, Blue
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-blue-900 p-8 rounded-lg shadow-lg">
        {capturedImage === null ? (
          <SelfieCapture onCapture={handleSelfieCaptured} />
        ) : isValidated === null ? (
          <ShapeSelection
            capturedImage={capturedImage}
            selectedShape={selectedShape}
            selectedColor={selectedColor} // Pass the color to ShapeSelection
            squarePosition={squarePosition!}  // Ensure square position is passed here
            onValidate={setIsValidated}
          />
        ) : (
          <ValidationResult isValidated={isValidated} />
        )}
      </div>
    </div>
  );
};

export default Captcha;
