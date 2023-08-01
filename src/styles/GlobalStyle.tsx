import { css } from '@emotion/react';

const globalStyle = css`
  html {
    font-size: 16px;
  }
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Pretendard';
    color: #2d2d2d;
    @font-face {
      font-family: SUIT;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff2') format('woff2'), url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-Medium.ttf') format('truetype');
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
    }

    @font-face {
      font-family: SUIT;
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.eot');
      src: url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.eot?#iefix') format('embedded-opentype'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.woff2') format('woff2'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.woff') format('woff'),
        url('https://cdn.jsdelivr.net/gh/webfontworld/sunn/SUIT-SemiBold.ttf') format('truetype');
      font-weight: 600;
      font-style: normal;
      font-stretch: normal;
    }
  }
  h1,
  h2,
  h3,
  p {
    margin: 0;
    padding: 0;
  }
  button {
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
    outline: none;
  }
  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  ol {
    margin: 0;
  }
  input::-webkit-inner-spin-button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
  }
  input {
    background: none;
    border: none;
    color: inherit;
    outline: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  address {
    font-style: normal;
  }
  * {
    box-sizing: border-box;
  }
  iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 0;
  }
`;

export default globalStyle;
