import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';

import { Z_INDEX } from '@/styles/common';
import { IconBook, IconSetting, IconNotification, IconMap } from '#/svgs';
import { TABBAR_ICON_HEIGHT, TABBAR_PADDING } from '@/constants/components';

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: ${TABBAR_PADDING}rem 0;
  background-color: var(--white);
  z-index: ${Z_INDEX.layout};
`;

const NavigationButton = styled.button<{ isActive: boolean }>`
  width: 4.8rem;
  height: ${TABBAR_ICON_HEIGHT}rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: none;
  color: ${(props) => (props.isActive ? ' var(--darkgray)' : ' var(--gray)')};
  cursor: pointer;

  svg {
    fill: currentColor;
  }

  span {
    margin-top: 0.5rem;
    font-size: 0.8rem;
  }
`;

const TabBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Container>
      <NavigationButton isActive={isActive('/')} onClick={() => navigate('/')}>
        <IconMap />
      </NavigationButton>
      <NavigationButton isActive={isActive('/example')} onClick={() => navigate('/example')}>
        <IconBook />
      </NavigationButton>
      <NavigationButton
        isActive={isActive('/notifications')}
        onClick={() => navigate('/notifications')}
      >
        <IconNotification />
      </NavigationButton>
      <NavigationButton isActive={isActive('/setting')} onClick={() => navigate('/setting')}>
        <IconSetting />
      </NavigationButton>
    </Container>
  );
};

export default TabBar;
