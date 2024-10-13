import React, { useEffect, useRef, useState } from 'react';

interface SelfieCaptureProps {
  // onCapture is a callback function that will receive the captured image and square position
  onCapture: (image: string, squarePos: { top: number; left: number }) => void;
}

// Functional component for capturing a selfie using the webcam
const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture }) => {
const videoRef = useRef<HTMLVideoElement | null>(null); // Ref to access the video element
const [squarePos, setSquarePos] = useState<{ top: number; left: number }>({ top: 30, left: 30 }); // State to store the position of the square

  // useEffect hook to set up the webcam stream and move the square randomly
  useEffect(() => {
    // Function to access the user's webcam and set the video stream
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Get webcam video stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the stream as the source for the video element
      }
    }

    // Function to randomly move the square every 2 seconds
    const moveSquareRandomly = () => {
      setInterval(() => {
        const randomTop = Math.floor(Math.random() * 56);  // Randomly calculate top position (0-55%)
        const randomLeft = Math.floor(Math.random() * 56); // Randomly calculate left position (0-55%)
        setSquarePos({ top: randomTop, left: randomLeft }); // Update square's position with random values
      }, 2000); // Move the square every 2 seconds
    };

    getCameraStream(); // Start the webcam stream
    moveSquareRandomly(); // Start moving the square randomly
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to capture an image from the webcam feed
  const captureImage = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas'); // Create an offscreen canvas element
      canvas.width = video.videoWidth; // Set the canvas width to the video width
      canvas.height = video.videoHeight; // Set the canvas height to the video height
      const ctx = canvas.getContext('2d'); // Get the 2D drawing context for the canvas
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height); // Draw the current frame from the video onto the canvas
      const imageSrc = canvas.toDataURL('image/png'); // Convert the canvas to a PNG data URL

      // Pass both the captured image and square position to the onCapture callback
      onCapture(imageSrc, squarePos);
    }
  };

  return (
    <>
      {/* Header text instructing the user to take a selfie */}
      <h2 className="text-white text-lg mb-4">Take Selfie</h2>
      
      {/* Container for the video stream and the moving square */}
      <div className="relative">
        {/* Video element displaying the webcam feed */}
        <video ref={videoRef} autoPlay className="w-full h-64 bg-gray-300"></video>

        {/* Square-shaped area that moves randomly within the video */}
        <div
          className="absolute border-2 border-white" // Styling the square with a white border
          style={{
            top: `${squarePos.top}%`,    // Dynamically set the top position based on state
            left: `${squarePos.left}%`,   // Dynamically set the left position based on state
            width: '20%',  // Fixed width of the square (20% of video width)
            height: '20%', // Fixed height of the square (20% of video height)
          }}
        ></div>
      </div>
      
      {/* Button to capture the selfie and pass it to the parent component */}
      <button onClick={captureImage} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};

export default SelfieCapture;
