<<<<<<< HEAD
// index.js

import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './app.tsx';

const root = document.getElementById('root');
if (root) {
  const appRoot = createRoot(root);
  appRoot.render(<App />);
} else {
  console.error('Root element not found');
}
=======
  // index.js

  import React from 'react';
  import ReactDOM from 'react-dom';
  import { createRoot } from 'react-dom/client';
import App from './app.tsx';
  import 'bootstrap/dist/css/bootstrap.min.css';


  const root = document.getElementById('root');
  if (root) {
    const appRoot = createRoot(root);
    appRoot.render(<App />);
  } else {
    console.error('Root element not found');
  }
>>>>>>> Fayed_Final
