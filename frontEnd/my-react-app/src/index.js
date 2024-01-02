// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './app.tsx';

const root = document.getElementById('root');
if (root) {
  const appRoot = createRoot(root);
  appRoot.render(<App />);
} else {
  console.error('Root element not found');
}
