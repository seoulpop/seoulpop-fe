import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ClipLoader } from 'react-spinners';

import { FONT_SIZE } from '@/styles/common';
import DefaultLayout from '@/layouts/DetailLayout';
import { getOauthId } from '@/api/login'; // getOauthId 함수 임포트

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -10vh;
`;

const LoaderText = styled.div`
  margin-bottom: 4rem;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
  color: var(--black);
`;

const CustomClipLoader = styled(ClipLoader)`
  border-width: 1.2rem !important;
`;

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        try {
          const data = await getOauthId({ serverType: 'KAKAO', code });
          document.cookie = `accessToken=${data.accessToken}; max-age=86400; path=/; secure; SameSite=Strict`;
          setLoading(false);
          setRedirecting(true);
          setTimeout(() => {
            navigate('/');
          }, 1000); // 1초 대기
        } catch (error) {
          console.error('Error fetching Kakao token:', error);
          setLoading(false);
        }
      } else {
        console.error('No code found in URL');
        setLoading(false);
      }
    };

    fetchKakaoToken();
  }, [location, navigate]);

  return (
    <DefaultLayout>
      <LoaderContainer>
        {(loading || redirecting) && (
          <>
            <LoaderText>로그인 중입니다...</LoaderText>
            <CustomClipLoader color='var(--primary)' loading={loading || redirecting} size={200} />
          </>
        )}
      </LoaderContainer>
    </DefaultLayout>
  );
};

export default KakaoCallback;
