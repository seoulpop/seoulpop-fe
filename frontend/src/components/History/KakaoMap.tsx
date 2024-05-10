import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface KakaoMapProps {
  markerLat: number;
  markerLng: number;
  imageSrc: string;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ markerLat, markerLng, imageSrc }) => {
  return (
    <Map
      center={{ lat: markerLat, lng: markerLng }}
      style={{ width: '100%', height: '25rem', marginTop: '2rem', marginBottom: '5rem' }}
      level={3}
    >
      <MapMarker
        position={{ lat: markerLat, lng: markerLng }}
        image={{
          src: imageSrc,
          size: { width: 48, height: 60 },
          options: { offset: { x: 27, y: 69 } },
        }}
      />
    </Map>
  );
};

export default KakaoMap;
