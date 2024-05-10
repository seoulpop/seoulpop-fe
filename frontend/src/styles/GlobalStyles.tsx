import { css, Global, SerializedStyles } from '@emotion/react';

import base from '@/styles/base';
import mainLayout from '@/styles/mainLayout';
import reset from '@/styles/reset';
import defaultLayout from '@/styles/defaultStyles';

const globalStyles = css`
  ${reset}
  ${base}
`;

const mainStyles = css`
  ${mainLayout}
`;

const defaultStyles = css`
  ${defaultLayout}
`;

const path = window.location.pathname;

const Layout = {
  main: [globalStyles, mainStyles],
  ar: globalStyles, // MARK: ar은 독립적인 레이아웃을 가짐
  default: [globalStyles, defaultStyles],
};

let styles: SerializedStyles | SerializedStyles[] | null = null;

switch (path) {
  case '/':
    styles = Layout.main;
    break;
  case '/ardemo':
    styles = Layout.ar; // TODO: 라우트명 변경
    break;
  default:
    styles = Layout.default;
    break;
}

const GlobalStyles = () => <Global styles={styles} />;

export default GlobalStyles;
