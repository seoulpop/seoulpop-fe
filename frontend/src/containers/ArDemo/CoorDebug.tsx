import styled from '@emotion/styled';

const DebugUI = styled.div`
  position: fixed;
  z-index: 1;

  width: 200px;
  height: 30px;
  background: #fff;

  font-size: 2rem;
`;

const CoorDebug = ({ lat, lng }: { lat?: number; lng?: number }) => {
  return (
    <DebugUI>
      {lat} {lng}
    </DebugUI>
  );
};

export default CoorDebug;
