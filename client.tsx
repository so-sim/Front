import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './src/App';
window.React = React;

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./src/mocks/browser');
  worker.start();
} else if (typeof window === 'undefined') {
  const { server } = require('./src/mocks/server');
  server.listen();
}

const container = document.getElementById('app');
const root = createRoot(container as Element);

root.render(<App />);
