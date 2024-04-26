import styled from '@emotion/styled';

// TODO: style
const Button = styled.button`
  position: absolute;
  bottom: 54px;
  z-index: 1;
  left: 50%;
  transform: translate(-50%, 50%);

  width: 288px;
  padding: 8px 0;
  border-radius: 24px;
  background: #fff;

  font-size: 16px;
  color: black;
`;

const FoundButton = () => {
  return (
    <Button type='button' onClick={() => {}}>
      새로운 문화재를 발견했습니다.
    </Button>
  );
};

export default FoundButton;
