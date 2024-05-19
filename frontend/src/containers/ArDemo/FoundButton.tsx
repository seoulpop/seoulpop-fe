import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/Button';

import useToastStore from '@/store/toast';
import { Z_INDEX } from '@/styles/common';
import { MarkerInfo } from '@/types/ar';
import { useVisitedAtlases } from '@/hooks/useVisitedAtlases';
import { ATLASES_DATA_KEY } from '@/constants/atlases';

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

const FoundButton = ({ heritage, isOpen }: { heritage?: MarkerInfo; isOpen?: boolean }) => {
  const navigate = useNavigate();
  const { toast } = useToastStore();
  const { visitedAtlases } = useVisitedAtlases();

  let className = '';

  if (isOpen === undefined) className = '';
  else if (isOpen) className = 'is-active';
  else className = 'is-inactive';

  const handleClick = () => {
    if (!heritage) return;

    localStorage.setItem(
      ATLASES_DATA_KEY,
      JSON.stringify([
        ...visitedAtlases,
        { historyId: heritage.id, historyCategory: heritage.category },
      ]),
    );

    toast({ message: '새로운 도감이 등록되었습니다!' });

    if (heritage?.category === '문화재') {
      navigate(`/heritage/detail/${heritage.id}`);
      return;
    }
    navigate(`/site/detail/${heritage.id}`);
  };

  return (
    <ButtonBlock className={className}>
      <Button type='button' color='#735cff' size='medium' onClick={handleClick}>
        <SearchIconWrapper />
        <Text>문화재 정보 보러가기</Text>
      </Button>
    </ButtonBlock>
  );
};

export default FoundButton;
