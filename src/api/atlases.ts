import { api } from '.';

export const getAtlases = async () => {
  const response = await api.get(`v1/atlases`);
  return response.data;
};
