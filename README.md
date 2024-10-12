Project Documentation for Custom CAPTCHA Component

# 1. Project Overview

This project involves the creation of a custom CAPTCHA component that utilizes a selfie video stream, a moving square area, and a puzzle-based validation system. The goal is to differentiate between human users and bots by asking users to select sectors containing specific shapes and colors. The project also includes automated tests for some parts of the functionality.

# 2. Prerequisites

Before starting this project, ensure that the following tools and technologies are set up:

- `Node.js`: Ensure Node.js (version 16 or higher) is installed to run the project.

- `Next.js`: This project is built using Next.js, a React framework that supports server-side rendering (SSR) and static site generation (SSG). You should have experience with Next.js, including its pages or app directory structure, and concepts like API routes.

- `Tailwind CSS`: Tailwind CSS will be used for styling the component. Install and configure Tailwind CSS in your project.

- `TypeScript`: TypeScript will be used for static typing. Ensure that TypeScript is installed and properly configured in your project.

- `Testing Libraries`:
  Jest: For writing unit and integration tests.

- `React Testing Library`: For testing React components.

- `ts-jest`: Ensure Jest is configured with ts-jest for TypeScript compatibility.
  Web Camera Access: The navigator.mediaDevices.getUserMedia API is required to access the user's webcam.

# 3. Technical Approach

## 3.1. Component Structure

The CAPTCHA component follows the structure below:

- `app/captcha/Captcha.tsx`: The main component handling the steps of the CAPTCHA process.
- `app/captcha/SelfieCapture.tsx`: The component responsible for capturing the selfie and the square area.
- `app/captcha/ShapeSelection.tsx`: The component where the user selects the shapes from the watermarked sectors.
- `app/captcha/ValidationResult.tsx`: The result screen showing whether the user passed or failed the validation.

## 3.2. Randomization Algorithm

- `Square Position`: The position of the square is randomized every 2 seconds using a timer inside SelfieCapture.tsx.

- `Watermark Randomization`: In ShapeSelection.tsx, random shapes and colors are assigned to half of the sectors using helper functions like getRandomShape and getRandomColor.

## 3.3. Testing Strategy

`Test Coverage`:
Unit tests for randomization functions (e.g., getRandomShape, getRandomColor).
Component rendering tests, including verifying interactions like button clicks.
Tests for correct display of shapes and validation logic in ValidationResult.tsx.

# 4. Setup and Installation

## 4.1. Clone the Repository:

- git clone https://github.com/itjewel/mockup-captcha-app
- cd mockup-captcha-app

## 4.2. Install Dependencies:

`npm install `

## 4.3. Run the Project:

Since this project uses Next.js, use the following command to start the development server:

`npm run dev`
The application will run on [http://localhost:3000](http://localhost:3000).

## 4.4. Run Tests:

To execute the Jest test suite:

``npm test`

# 5. Usage Instructions

`Start the CAPTCHA Component`: The Captcha.tsx component initializes the validation process. It first presents the selfie camera and moving square, followed by the shape selection puzzle.

`Customization`: You can adjust the randomization logic for both the square movement and the shape/color selections by modifying the getRandomShape, getRandomColor, and moveSquareRandomly functions.

`Retry Mechanism`: Upon failure, users can retry the CAPTCHA puzzle, and the logic for reducing mistake tolerance can be found in the ValidationResult.tsx component. 6. Potential Improvements

`Advanced Security`: Consider adding time-based tokens or CAPTCHA solving time limits to prevent automated attempts.

`User Experience`: Enhance the UI/UX with animations, clearer feedback for errors, and more detailed instructions for first-time users.
