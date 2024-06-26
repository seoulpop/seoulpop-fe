/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

import { directionPanelSlideIn, directionPanelSlideOut } from '@/styles/animation';
import { FONT_SIZE, Z_INDEX } from '@/styles/common';
import { IconCancel } from '#/svgs';
import { Coords, DestinationInfo } from '@/types/location';
import { usePolyLine } from '@/hooks/usePolyLine';

const directionStyle = (visible: boolean) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 8.8rem;
  z-index: ${Z_INDEX.modal};
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--shadow);
  animation: ${visible ? directionPanelSlideIn : directionPanelSlideOut} 0.5s
    cubic-bezier(0.86, 0, 0.07, 1) forwards;
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;

  div {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    align-items: center;

    > div:nth-of-child(2) {
      margin-right: 1rem;
    }
  }

  img {
    height: 2rem;
  }
`;

interface Props {
  map: kakao.maps.Map;
  origin: Coords;
  destination: DestinationInfo;
  setOrigin: React.Dispatch<React.SetStateAction<Coords | null>>;
  setDestination: React.Dispatch<React.SetStateAction<DestinationInfo | null>>;
}

const Navigation = ({ map, origin, setOrigin, destination, setDestination }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { polyLine, bounds } = usePolyLine(origin, destination);

  const closeNavigation = () => {
    setIsVisible(false);
    setTimeout(() => {
      polyLine?.setMap(null);
      setDestination(null);
      setOrigin(null);
    }, 500);
  };

  useEffect(() => {
    if (bounds) map.setBounds(bounds);
  }, [bounds]);

  // 경로 안내
  useEffect(() => {
    if (polyLine) polyLine.setMap(map);
  }, [polyLine]);

  useEffect(() => {
    return () => {
      polyLine?.setMap(null);
      setDestination(null);
      setOrigin(null);
    };
  }, []);

  return (
    <div css={directionStyle(isVisible)}>
      <div>
        <div>
          <img src='/assets/images/placeMarker.png' alt='marker' /> 도착지
        </div>
        <div>{destination.name}</div>
      </div>
      <IconCancel width={16} onClick={closeNavigation} />
    </div>
  );
};

export default Navigation;
