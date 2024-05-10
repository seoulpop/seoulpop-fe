import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { FONT_SIZE } from '@/styles/common';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 2rem;
  background-color: var(--white);
  border-bottom: 0.1rem solid var(--lightgray);
  margin-bottom: 2rem;
  position: relative;
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
  font-size: ${FONT_SIZE.xxl};
  font-weight: bold;
`;

interface HeaderProps {
  pageName: string;
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  return (
    <HeaderContainer>
      <BackButton onClick={onBack}>&#x2190;</BackButton>
      <Title>{pageName}</Title>
    </HeaderContainer>
  );
};

export default Header;
