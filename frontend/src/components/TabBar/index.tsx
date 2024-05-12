import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { BORDER_RADIUS, Z_INDEX } from '@/styles/common';
import { IconBook, IconSetting, IconNotification, IconMap } from '#/svgs';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  background-color: var(--white);
  z-index: ${Z_INDEX.float};
`;

const NavigationButton = styled.button`
  width: 4.8rem;
  height: 5.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
  color: gray;
  cursor: pointer;

  svg {
    fill: currentColor;
  }

  span {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }

  &:hover {
    color: black;
  }
`;

const TabBar = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <NavigationButton onClick={() => navigate('/example')}>
        <IconMap />
        <span>지도</span>
      </NavigationButton>
      <NavigationButton onClick={() => navigate('/')}>
        <IconBook />
        <span>도감</span>
      </NavigationButton>
      <NavigationButton onClick={() => navigate('/ardemo')}>
        <IconNotification />
        <span>알림</span>
      </NavigationButton>
      <NavigationButton onClick={() => navigate('/example')}>
        <IconSetting />
        <span>환경설정</span>
      </NavigationButton>
    </Container>
  );
};

export default TabBar;
