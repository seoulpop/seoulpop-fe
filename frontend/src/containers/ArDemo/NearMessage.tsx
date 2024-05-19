import styled from '@emotion/styled';

import { BORDER_RADIUS, FONT_SIZE, Z_INDEX } from '@/styles/common';

const NearMessage = styled.div`
  position: fixed;
  z-index: ${Z_INDEX.float};
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);

  padding: 1rem 2rem;
  width: fit-content;
  border-radius: ${BORDER_RADIUS.circle};

  background: var(--black);
  opacity: 0.5;

  text-align: center;
  font-size: ${FONT_SIZE.md};
  color: var(--white);
`;

export default NearMessage;
