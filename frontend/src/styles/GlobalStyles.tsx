import { css, Global } from '@emotion/react';

import base from '@/styles/base';
import mainLayout from '@/styles/mainLayout';
import reset from '@/styles/reset';

const globalStyles = css`
  ${reset}
  ${base}
`;

const mainStyles = css`
  ${mainLayout}
`;

const isArMode = window.location.pathname === '/ardemo'; // TODO: 라우트명 변경

// ar은 독립적인 레이아웃을 가짐
const GlobalStyles = () => <Global styles={isArMode ? globalStyles : [globalStyles, mainStyles]} />;

export default GlobalStyles;
