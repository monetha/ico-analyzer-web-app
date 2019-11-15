import { createGlobalStyle } from 'styled-components';
import myFont from './fonts/Roboto-Regular.woff';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Roboto';
  }

  #app {
    background-color: #eef6ff;
    min-height: 100%;
    min-width: 100%;
  }

  @font-face {
    font-family: 'Roboto'; src: url(${myFont}) format('truetype');
  }

`;

export default GlobalStyle;
