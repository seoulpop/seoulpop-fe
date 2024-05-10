import { css, Global } from '@emotion/react';

import base from '@/styles/base';
import reset from '@/styles/reset';

const globalStyles = css`
  ${reset}
  ${base}
`;

const GlobalStyles = () => <Global styles={globalStyles} />;

export default GlobalStyles;
