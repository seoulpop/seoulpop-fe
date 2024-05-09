import styled from '@emotion/styled';

import Button from '@/components/Button';

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

const FoundButton = () => {
  return (
    <Button type='button' color='#735cff' size='medium'>
      <SearchIconWrapper />
      <Text>문화재 정보 보러가기</Text>
    </Button>
  );
};

export default FoundButton;
