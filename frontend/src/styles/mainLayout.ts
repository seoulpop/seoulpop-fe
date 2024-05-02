import { css } from '@emotion/react';

const mainLayout = css`
  body {
    position: relative;
    width: auto;
    max-width: 480px;
    min-height: 100svh;
    margin: 0 auto;
    padding: 0;
    background-color: var(--white);
    font-size: 1.6rem;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
`;

export default mainLayout;