/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';

import DefaultLayout from '@/Layouts/DetailLayout';

const LoginContainer = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 40vh; // TODO: 버튼 위치
`;

const SigninPage = () => {
  const REST_API_KEY = import.meta.env.VITE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const loginUri = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    <DefaultLayout>
      <LoginContainer href={loginUri}>
        <img src='/assets/images/kakao_login_medium_wide.png' />
      </LoginContainer>
    </DefaultLayout>
  );
};

export default SigninPage;
