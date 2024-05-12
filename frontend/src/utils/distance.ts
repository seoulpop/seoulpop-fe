const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

/**
 * 두 위경도 지점의 거리(미터) 반환
 */
export const getDistanceFromLatLonInMeters = ({
  lat1,
  lon1,
  lat2,
  lon2,
}: {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}) => {
  // 지구 반지름 (km)
  const R = 6371.0;

  // 라디안으로 변환
  const radLat1 = deg2rad(lat1);
  const radLon1 = deg2rad(lon1);
  const radLat2 = deg2rad(lat2);
  const radLon2 = deg2rad(lon2);

  // 위도 및 경도 차이 계산
  const dLon = radLon2 - radLon1;
  const dLat = radLat2 - radLat1;

  // Haversine 공식 계산
  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // 거리 계산
  const distance = R * c;

  return distance;
};
