import React, { useRef } from 'react';

interface SelfieCaptureProps {
  onCapture: (image: string) => void;
}

const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    async function getCameraStream() {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    }
    getCameraStream();
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
      onCapture(imageSrc); // Call the parent to set the captured image
    }
  };

  return (
    <>
      <h2 className="text-white text-lg mb-4">Take Selfie</h2>
      <div className="relative">
        <video ref={videoRef} autoPlay className="w-full h-64 bg-gray-300"></video>
      </div>
      <button onClick={captureImage} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Continue
      </button>
    </>
  );
};

export default SelfieCapture;
