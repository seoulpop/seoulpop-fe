import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { IconLeftArrow } from '#/svgs';
import PC_LAYOUT, { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';
import { BORDER_RADIUS, Z_INDEX } from '@/styles/common';

const GoBackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 1rem;
  left: 1.6rem;
  z-index: ${Z_INDEX.float};

  width: 4rem;
  height: 4rem;
  border-radius: ${BORDER_RADIUS.circle};

  background: var(--white);

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    max-width: 480px;
    margin: 0 0 0 calc(50vw + ${PC_LAYOUT.OFFSET}rem);
  }
`;

const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <GoBackButtonContainer onClick={() => navigate('/')}>
      <IconLeftArrow width={30} />
    </GoBackButtonContainer>
  );
};
export default GoBackButton;
