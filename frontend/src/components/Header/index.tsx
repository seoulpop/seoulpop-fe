import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { FONT_SIZE } from '@/styles/common';
import { IconLeftArrow } from '#/svgs';

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
