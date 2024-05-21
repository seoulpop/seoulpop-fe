/** @jsxImportSource @emotion/react */
import Button from '@/components/Button';
import { directionPanelSlideIn, directionPanelSlideOut } from '@/styles/animation';
import { FONT_SIZE, Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/marker';
import { css } from '@emotion/react';

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

  > div {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
`;

const FindDirections = ({
  markerInfo,
  handleFindDirectionClick,
}: {
  markerInfo: MarkerInfo;
  handleFindDirectionClick: () => void;
}) => {
  //   const [isVisible, setIsVisible] = useState(true);

  return (
    <div css={directionStyle(true)}>
      <div>
        <img
          src={`/assets/images/${markerInfo.category}.webp`}
          alt={markerInfo.name}
          width={30}
          height={30}
        />
        {markerInfo.name}
      </div>
      <Button color='var(--primary)' size='medium' type='button' onClick={handleFindDirectionClick}>
        길찾기
      </Button>
    </div>
  );
};

export default FindDirections;
