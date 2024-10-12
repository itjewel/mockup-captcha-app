import React from 'react'; // Add this import if it's missing

interface ValidationResultProps {
  isValidated: boolean;
}

const ValidationResult: React.FC<ValidationResultProps> = ({ isValidated }) => {
  return (
    <>
      {isValidated ? (
        <h2 className="text-white text-lg mb-4">Validation Passed!</h2>
      ) : (
        <h2 className="text-white text-lg mb-4">Validation Failed! Try Again.</h2>
      )}
      <button onClick={() => window.location.reload()} className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded">
        Retry
      </button>
    </>
  );
};

export default ValidationResult;
