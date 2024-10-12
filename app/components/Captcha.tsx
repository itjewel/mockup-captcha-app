import React, { useState } from 'react';
import SelfieCapture from './SelfieCapture';
import ShapeSelection from './ShapeSelection';
import ValidationResult from './ValidationResult';

type Shape = '△' | '◯' | '□';  

const Captcha: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState<boolean | null>(null); // null = not validated, true = passed, false = failed
  const [selectedShape, setSelectedShape] = useState<Shape>('△'); 
  const [selectedColor, setSelectedColor] = useState<string>('red');
  const [squarePosition, setSquarePosition] = useState<{ top: number; left: number } | null>(null);

  const handleSelfieCaptured = (image: string, squarePos: { top: number; left: number }) => {
    setCapturedImage(image);
    setSquarePosition(squarePos);  
    setSelectedShape(getRandomShape());
    setSelectedColor(getRandomColor()); 
  };

  // Random shape generator here
  const getRandomShape = (): Shape => {
    const shapes: Shape[] = ['△', '◯', '□'];  
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  // Random color generator here
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue']; 
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
            selectedColor={selectedColor} 
            squarePosition={squarePosition!}  
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
