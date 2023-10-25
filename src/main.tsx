import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import { App } from './App';
import ErrorBoundary from './components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </div>
  </React.StrictMode>
);
