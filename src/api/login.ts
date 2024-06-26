import { apiUser } from '@/api/index';
import { LoginInfo, reissueInfo } from '@/types/login';

export const getOauthId = async ({
  serverType = 'KAKAO',
  code,
}: {
  serverType: string;
  code: string;
}): Promise<LoginInfo> => {
  const url = `/v1/oauth/login/${serverType}?code=${code}`;
  const response = await apiUser.get(url);
  return response.data;
};

export const reissue = async (): Promise<reissueInfo> => {
  const url = `/v1/members/reissue`;
  const response = await apiUser.post(url);
  return response.data;
};
