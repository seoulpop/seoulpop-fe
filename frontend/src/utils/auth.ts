import { reissue } from '@/api/login';

export const isAuthenticated = () => {
  const accessToken = document.cookie.split('; ').find((row) => row.startsWith('accessToken='));
  return !!accessToken;
};

export const hasRefreshToken = () => {
  const refreshToken = document.cookie.split('; ').find((row) => row.startsWith('refreshToken='));
  return !!refreshToken;
};

export const reissueAccessToken = async () => {
  try {
    const data = await reissue();
    const newAccessToken = data.accessToken;
    document.cookie = `accessToken=${newAccessToken}; max-age=86400; path=/; secure; SameSite=Strict`;
    return true;
  } catch (error) {
    throw new Error('Token reissue failed');
  }
};
