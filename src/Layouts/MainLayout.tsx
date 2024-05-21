import styled from '@emotion/styled';

import PC_LAYOUT, { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';

const MainLayout = styled.div`
  position: relative;
  width: auto;
  max-width: 480px;
  min-height: 100svh;
  padding: 0;
  margin: 0 auto;
  background-color: var(--white);
  font-size: 1.6rem;
  box-shadow: var(--shadow);
  overflow: hidden;

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    margin: 0 0 0 calc(50vw + ${PC_LAYOUT.OFFSET}rem);
  }
`;

export default MainLayout;
