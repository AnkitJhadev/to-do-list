// Application Entry Point
// Configures Redux Provider to make the Redux store available to all components
// Uses React 18 createRoot API for rendering

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Redux Provider wraps the entire app to provide access to the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);