import styled from '@emotion/styled';

import DefaultLayout from '@/Layouts/DetailLayout';
import { BORDER_RADIUS, FONT_SIZE } from '@/styles/common';

const LoginButton = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 40vh; // TODO: 버튼 위치

  margin: 0 auto;
  width: 30rem;
  height: 4.5rem;
  border-radius: ${BORDER_RADIUS.xs};
  border: none;
  text-align: center;

  background: #fee500;
  font-size: ${FONT_SIZE.md};
  font-weight: 600;
  color: #000000 85%;
`;

const SigninPage = () => {
  return (
    <DefaultLayout>
      <LoginButton href={import.meta.env.VITE_KAKAO_REDIRECT_URI}>카카오 로그인</LoginButton>
    </DefaultLayout>
  );
};

export default SigninPage;
