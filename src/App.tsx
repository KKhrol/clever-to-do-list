import { AuthProvider } from '@context/auth/AuthContext';
import { ThemeProviderWrapper } from '@context/theme/ThemeContext';

import AppRouter from './router';

function App() {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>
        <AppRouter />
      </ThemeProviderWrapper>
    </AuthProvider>
  );
}

export default App;
