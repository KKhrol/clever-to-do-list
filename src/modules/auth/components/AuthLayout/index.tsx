import Header from '@components/Header';
import LayoutContainer from '@components/LayoutContainer';

import { AuthPaper, AuthWrapper, StyledContainer } from './AuthLayout.styled';

interface AuthLayoutProps {
  children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <LayoutContainer>
      <Header />

      <AuthWrapper>
        <StyledContainer
          disableGutters
          maxWidth={false}
        >
          <AuthPaper elevation={3}>{children}</AuthPaper>
        </StyledContainer>
      </AuthWrapper>
    </LayoutContainer>
  );
}

export default AuthLayout;
