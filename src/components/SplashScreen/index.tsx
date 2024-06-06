import styled from '@emotion/styled';
import { ComponentType, useEffect, useState } from 'react';

import DefaultLayout from '@/Layouts/DetailLayout';

const SplashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100svh;

  background: var(--primary);
`;
const Logo = styled.div`
  width: 20rem;
  height: 20rem;

  background: url('/assets/images/logo.png') no-repeat center;
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

const withSplashScreen = (Component: ComponentType) => {
  const WrappedComponent = () => {
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

    return <Component />;
  };

  return WrappedComponent;
};

export default withSplashScreen;
