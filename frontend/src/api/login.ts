import { api } from '@/api/index';
import { LoginInfo } from '@/types/login';

export const getOauthId = async ({
  serverType = 'KAKAO',
  code,
}: {
  serverType: string;
  code: string;
}): Promise<LoginInfo> => {
  const url = `/v1/oauth/login/${serverType}?code=${code}`;
  console.log('Request URL:', url); // 요청 URL 확인
  const response = await api.get(url);
  console.log('Response:', response); // 응답 확인
  return response.data;
};
