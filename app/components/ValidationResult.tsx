import React from 'react';

interface ValidationResultProps {
  isValidated: boolean; // A boolean to indicate whether the validation passed or failed
}

// Functional component to display validation result and provide a retry option
const ValidationResult: React.FC<ValidationResultProps> = ({ isValidated }) => {
  return (
    <>
      {/* Conditionally render the validation result message */}
      {isValidated ? (
        // If validation passed, display "Validation Passed!"
        <h2 className="text-white text-lg mb-4">Validation Passed!</h2>
      ) : (
        // If validation failed, display "Validation Failed! Try Again."
        <h2 className="text-white text-lg mb-4">Validation Failed! Try Again.</h2>
      )}

      {/* Button to retry validation by reloading the page */}
      <button 
        onClick={() => window.location.reload()} // Reload the page when the user clicks the button
        className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded" // Tailwind CSS classes for styling
      >
        Retry
      </button>
    </>
  );
};

export default ValidationResult;
