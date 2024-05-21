import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconLeftArrow } from '#/svgs';
import PC_LAYOUT, { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';
import { FONT_SIZE, Z_INDEX } from '@/styles/common';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2rem;
  background-color: var(--white);
  border-bottom: 0.1rem solid var(--lightgray);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${Z_INDEX.layout};

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    max-width: 480px;
    margin: 0 0 0 calc(50vw + ${PC_LAYOUT.OFFSET}rem);
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: ${FONT_SIZE.xl};
  cursor: pointer;
  position: absolute;
  left: 2rem;
`;

const Title = styled.h1`
  font-size: ${FONT_SIZE.lg};
  font-weight: bold;
`;

interface HeaderProps {
  hasPrevious?: boolean;
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ hasPrevious = false, pageName }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      {hasPrevious && (
        <BackButton onClick={onBack}>
          <IconLeftArrow />
        </BackButton>
      )}
      <Title>{pageName}</Title>
    </HeaderContainer>
  );
};

export default Header;
