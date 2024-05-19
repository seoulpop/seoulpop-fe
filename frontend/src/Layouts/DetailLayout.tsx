import styled from '@emotion/styled';

import PC_LAYOUT, { MOBILE_MIN_WIDTH } from '@/constants/pcLayout';

const DefaultLayout = styled.div`
  position: relative;
  width: auto;
  max-width: 480px;
  min-height: 100svh;
  margin: 0 auto;
  padding: 0;
  background-color: var(--white);
  font-size: 1.6rem;
  box-shadow: var(--shadow);

  @media screen and (min-width: ${MOBILE_MIN_WIDTH}px) {
    margin: 0 0 0 calc(50vw + ${PC_LAYOUT.OFFSET}rem);
  }
`;

export default DefaultLayout;
