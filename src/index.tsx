import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <div className='wrapper'>
      <App />
    </div>
  </React.StrictMode>
);

