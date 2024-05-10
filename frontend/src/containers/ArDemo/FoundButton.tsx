import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import { Z_INDEX } from '@/styles/common';

const slideIn = keyframes`
  from {
  }
  to {
    bottom: 5.4rem;
  }
`;
const slideOut = keyframes`
  from {
    bottom: 5.4rem;
  }
  to {
    bottom : -4.8x;
  }
`;

const ButtonBlock = styled.div`
  position: absolute;
  left: 50%;
  bottom: -4.8em;
  transform: translate(-50%, 0);

  z-index: ${Z_INDEX.float};

  &.is-active {
    display: block;
    animation: ${slideIn} 0.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  }
  &.is-inactive {
    animation: ${slideOut} 0.5s cubic-bezier(0.86, 0, 0.07, 1) forwards;
  }
`;

const SearchIconWrapper = styled.span`
  width: 2rem;
  height: 2rem;

  margin-right: 0.4rem;

  background: url('/icons/search-ico.png') no-repeat;
  background-size: cover;
`;

const Text = styled.span`
  letter-spacing: -0.03rem;
  color: var(--white);
  white-space: nowrap;
`;

const historyId = 1; // TODO: api 연동

const FoundButton = ({ isOpen }: { isOpen?: boolean }) => {
  const navigate = useNavigate();

  let className = '';

  if (isOpen === undefined) className = '';
  else if (isOpen) className = 'is-active';
  else className = 'is-inactive';

  return (
    <ButtonBlock className={className}>
      <Button
        type='button'
        color='#735cff'
        size='medium'
        onClick={() => {
          navigate(`/heritage/detail/${historyId}`);
        }}
      >
        <SearchIconWrapper />
        <Text>문화재 정보 보러가기</Text>
      </Button>
    </ButtonBlock>
  );
};

export default FoundButton;
