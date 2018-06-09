import { injectGlobal, css } from 'react-emotion';

export const injectGlobalStyles = () => injectGlobal`
  html, body, #app {
    height: 100%;
  }
  #app {
    position: relative;
  }
`;

export const BorderStyles = css`
  transition: border-color 400ms ease-out;
  border: 2px solid #ccc;

  :hover, :focus {
    border-color: #000;
  }
`;
