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
  const R = 6371 * 1000; // 지구의 반지름 (미터로 변환)
  const dLat = deg2rad(lat2 - lat1); // 위도 차이
  const dLon = deg2rad(lon2 - lon1); // 경도 차이
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 거리 (미터)
  return d;
};
