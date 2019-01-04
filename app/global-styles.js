import { createGlobalStyle } from 'styled-components';
import myFont from './images/hanken_design_co._-_cerebri_sans_regular-webfont.woff';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'cerebri_sans_regular';
  }

  #app {
    background-color: #eef6ff;
    min-height: 100%;
    min-width: 100%;
  }

  @font-face {
    font-family: 'cerebri_sans_regular'; src: url(${myFont}) format('truetype');
  }

`;

export default GlobalStyle;
