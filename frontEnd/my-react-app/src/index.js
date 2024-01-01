// index.js (or your main entry file)
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import ReactDOM from 'react-dom';
import App from './app.tsx'; // Import your main App component

// Import createRoot from react-dom/client
import { createRoot } from 'react-dom/client';

// Use createRoot to render the app
const root = document.getElementById('root');
const rootContainer = createRoot(root);

// Render the app inside the root container
rootContainer.render(<App />);
