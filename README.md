# Face Detection

A small browser-based face detection demo using `face-api.js`.

## Project structure

- `face-api.min.js` — bundled face-api library
- `index.html` — app page and layout
- `script.js` — webcam access and detection logic
- `models/` — face-api model files
  - `face_expression_model-shard1`
  - `face_expression_model-weights_manifest.json`
  - `face_landmark_68_model-shard1`
  - `face_landmark_68_model-weights_manifest.json`
  - `face_landmark_68_tiny_model-shard1`
  - `face_landmark_68_tiny_model-weights_manifest.json`
  - `face_recognition_model-shard1`
  - `face_recognition_model-shard2`
  - `face_recognition_model-weights_manifest.json`
  - `tiny_face_detector_model-shard1`
  - `tiny_face_detector_model-weights_manifest.json`

## Local setup

1. Open this folder in your editor.
2. Start a local web server from the project root.
   - With a browser extension or static server tool such as VS Code Live Server, `http-server`, or similar.
3. Open the server URL in your browser, for example `http://localhost:8000`.
4. Allow webcam access when prompted.

## Notes

- The app requires a secure context for webcam access, so using a local server is required.
- If deploying to GitHub Pages, serve the repository branch as a static site and ensure the files remain in the repository root.

## Live Demo

https://azizulhakim31.github.io/face-detection/
