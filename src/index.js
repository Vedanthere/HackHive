import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import store from './redux/store';
import App from './App';
import './index.css';

// Create a root element for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>
);