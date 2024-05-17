import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { IconLeftArrow } from '#/svgs';
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
