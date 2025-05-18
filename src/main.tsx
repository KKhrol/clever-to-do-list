import 'i18n';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import {
  handleCaughtError,
  handleUncaughtError,
} from '@context/error/utils/errorHandler';

import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container, {
    onUncaughtError: handleUncaughtError,
    onCaughtError: handleCaughtError,
  });

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
