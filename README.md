Project Documentation for Custom CAPTCHA Component

# 1. Project Overview

This project involves the creation of a custom CAPTCHA component that utilizes a selfie video stream, a moving square area, and a puzzle-based validation system. The goal is to differentiate between human users and bots by asking users to select sectors containing specific shapes and colors. The project also includes automated tests for some parts of the functionality.

# 2. Prerequisites

Before starting this project, ensure that the following tools and technologies are set up:

- `Node.js`: Need to Node.js (version 16 or higher) is installed to run the project.

- `Next.js`: This project is built using Next.js, a React framework.

- `Tailwind CSS`: Tailwind CSS used for styling the component.

- `TypeScript`: TypeScript is used for static typing.

- `Testing Libraries`:
- `Jest`: For writing unit and integration tests.

- `React Testing Library`: For testing React components.

- `ts-jest`: Jest is configured with ts-jest for TypeScript compatibility.

- `Web Camera Access`: The `navigator.mediaDevices.getUserMedia` API is used to access the user's webcam.

# 3. Technical Approach

## 3.1. Component Structure

The CAPTCHA component follows the structure below:

- `app/captcha/Captcha.tsx`: The main component handling the steps of the CAPTCHA process.
- `app/captcha/SelfieCapture.tsx`: The component responsible for capturing the selfie and the square area.
- `app/captcha/ShapeSelection.tsx`: The component where the user selects the shapes from the watermarked sectors.
- `app/captcha/ValidationResult.tsx`: The result screen showing whether the user passed or failed the validation.

## 3.2. Randomization Algorithm

- `Square Position`: The position of the square is randomized every 2 seconds using a timer inside `SelfieCapture.tsx`.

- `Watermark Randomization`: In `ShapeSelection.tsx`, random shapes and colors are assigned to half of the sectors using helper functions like `getRandomShape` and `getRandomColor`.

## 3.3. Testing Strategy

`Test Coverage`:

- `Home Page`
  -- `Mocking`: Mocks the Captcha component using jest.mock to verify that the Captcha component is rendered within the Home page.
  -- `Test`: Confirms that the mocked Captcha component is rendered by checking for the presence of "Mock Captcha" in the document

- `Captcha Component`:
  -- `Initial Render Test`: Ensures the "Take Selfie" button is displayed when the component is first rendered.
  -- `Mocking Media Devices`: Mocks navigator.mediaDevices.getUserMedia for the test environment.

- `SelfieCapture Component`:
  -- `Video Element`: Ensures the video element renders.
  -- `Square Movement`: Verifies the square moves randomly every 2 seconds.
  -- `Image Capture`: Confirms image capture and the correct call to onCapture.

- `ShapeSelectionHeader Component`:
  -- `Shape and Color Rendering Test`: Verifies that the correct shape and color are displayed and styled according to the props.

- `ShapeSelection Component`:
  -- `Grid Rendering Test`: Verifies that the component renders a grid with exactly 16 sectors (buttons).
  -- `Sector Selection Test`: Ensures that a sector gets highlighted when clicked.
  -- `Validation Test`: Confirms that the onValidate function is called when the user validates their selection.

  - `ShapeSector Component`:
    -- `Shape Rendering`: Ensures triangle, circle, and square shapes are rendered correctly.
    -- `Click Handler`: Verifies handleSectorClick is called when a sector is clicked.
    -- `Selection Styling`: Checks if the selected sector is styled with the correct class.

- `ValidationResult Component`:
  -- `Validation Messages`: Tests the display of "Validation Passed!" or "Validation Failed!" based on the isValidated prop.
  -- `Retry Button`: Ensures clicking the "Retry" button reloads the page.

# 4. Setup and Installation

## 4.1. Clone the Repository:

- ```sh
  git clone https://github.com/itjewel/mockup-captcha-app
  ```

- cd `mockup-captcha-app`

## 4.2. Install Dependencies:

- ```sh
   npm install
  ```

## 4.3. Run the Project:

After install project, use the following command to start the development server:

- ```sh
      npm run dev
  ```
  The application will run on [http://localhost:3000](http://localhost:3000).

## 4.4. Run Tests:

To execute the Jest test suite:

```sh
    npm test
```

# 5. Usage Instructions

`Start the CAPTCHA Component`: The `Captcha.tsx` component initializes the validation process. It first presents the selfie camera and moving square, followed by the shape selection puzzle.

`Customization`: You can adjust the randomization logic for both the square movement and the shape/color selections by modifying the `getRandomShape`, `getRandomColor`, and `moveSquareRandomly` functions.

`Retry Mechanism`: Upon failure, users can retry the CAPTCHA puzzle, and the logic for reducing mistake tolerance can be found in the `ValidationResult.tsx` component.

# 6. Potential Improvements

`Advanced Security`: Consider adding time-based tokens or CAPTCHA solving time limits to prevent automated attempts.

`User Experience`: Enhance the UI/UX with animations, clearer feedback for errors, and more detailed instructions for first-time users.
