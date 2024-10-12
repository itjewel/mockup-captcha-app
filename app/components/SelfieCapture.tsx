import React, { useEffect, useRef, useState } from 'react';

interface SelfieCaptureProps {
  onCapture: (image: string, squarePos: { top: number; left: number }) => void; // Expect two arguments
}

const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [squarePos, setSquarePos] = useState<{ top: number; left: number }>({ top: 30, left: 30 });

  useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }

    // Function to randomly move the square every 2 second
    const moveSquareRandomly = () => {
      setInterval(() => {
        const randomTop = Math.floor(Math.random() * 56);  
        const randomLeft = Math.floor(Math.random() * 56); 
        setSquarePos({ top: randomTop, left: randomLeft });
      }, 2000); // Moves every 2 second
    };
    

    getCameraStream();
    moveSquareRandomly(); // Start moving the square
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL('image/png');

      // Pass both imageSrc and squarePos to the onCapture function
      onCapture(imageSrc, squarePos);
    }
  };

  return (
    <>
      <h2 className="text-white text-lg mb-4">Take Selfie</h2>
      <div className="relative">
        <video ref={videoRef} autoPlay className="w-full h-64 bg-gray-300"></video>

        {/* Square-shaped area that moves randomly */}
        <div
          className="absolute border-2 border-white"
          style={{
            top: `${squarePos.top}%`,    // Use the dynamic top position
            left: `${squarePos.left}%`,   // Use the dynamic left position
            width: '20%',  // Fixed width of the square
            height: '20%', // Fixed height of the square
          }}
        ></div>
      </div>
      <button onClick={captureImage} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};

export default SelfieCapture;
