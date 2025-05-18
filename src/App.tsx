import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from '@context/auth/AuthContext';
import { ErrorProvider } from '@context/error/ErrorContext';
import { ThemeProviderWrapper } from '@context/theme/ThemeContext';

import AppRouter from './router';

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <ThemeProviderWrapper>
          <AppRouter />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProviderWrapper>
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
