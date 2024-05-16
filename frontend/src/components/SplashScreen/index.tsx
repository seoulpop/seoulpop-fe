import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import DefaultLayout from '@/Layouts/DetailLayout';

const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;

  background: #fafcfe;
`;
const Logo = styled.div`
  width: 20rem;
  height: 20rem;

  background: url('/assets/images/logo.webp') no-repeat center;
  background-size: contain;
`;

const SplashScreen = () => {
  return (
    <DefaultLayout>
      <SplashContainer>
        <Logo />
      </SplashContainer>
    </DefaultLayout>
  );
};

const _SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;

  background: var(--primary);

  color: var(--white);
  font-size: 32px;
`;

const _SplashScreen = () => {
  return (
    <DefaultLayout>
      <SplashContainer>서울 팝</SplashContainer>
    </DefaultLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react/function-component-definition
const withSplashScreen = (Component: React.FC<any>) => (props: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  if (loading) return <SplashScreen />;

  return <Component {...props} />;
};

export default withSplashScreen;
