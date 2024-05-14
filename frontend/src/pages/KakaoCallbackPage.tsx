import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { getOauthId } from '@/api/login'; // getOauthId 함수 임포트

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKakaoToken = async () => {
      const code = new URLSearchParams(location.search).get('code');
      if (code) {
        try {
          const data = await getOauthId({ serverType: 'KAKAO', code });
          document.cookie = `accessToken=${data.accessToken}; max-age=86400; path=/; secure; SameSite=Strict`;
          console.log(data);
          // 로그인 성공 시 메인 페이지로 이동
          navigate('/');
        } catch (error) {
          console.error('Error fetching Kakao token:', error);
        }
      } else {
        console.error('No code found in URL');
      }
    };

    fetchKakaoToken();
  }, [location, navigate]);

  return <div>로그인 중...</div>;
};

export default KakaoCallback;
