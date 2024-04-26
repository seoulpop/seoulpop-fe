import { css } from '@emotion/react';

const base = css`
  :root {
    --primary: #735cff;
    --secondary: #b2a5ff;
    --tertiary: #e9b43a;
    --lightgray: #cdcdcd;
    --lightgray-transparent-50: rgb(205 205 205 / 50%);
    --black: #000;
    --white: #fff;
    --shadow: 0 1px 16px 0 rgb(66 66 66 / 10%);
  }

  * {
    font-weight: 400;
    box-sizing: border-box;
  }

  html {
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      sans-serif;
    font-size: 62.5%;
  }

  body {
    position: relative;
    font-size: 1.6rem;
  }

  h1 {
    font-family: Pretendard, sans-serif;
    font-size: 4rem;
  }

  h2 {
    font-family: Pretendard, sans-serif;
    font-size: 3.2rem;
  }

  h3 {
    font-family: Pretendard, sans-serif;
    font-size: 2.8rem;
  }

  h4 {
    font-family: Pretendard, sans-serif;
    font-size: 2.4rem;
  }

  h5 {
    font-family: Pretendard, sans-serif;
    font-size: 2rem;
  }

  button {
    cursor: pointer;
  }
`;

export default base;
