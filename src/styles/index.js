import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    font-size: 16px;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
