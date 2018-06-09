import { injectGlobal, css } from 'react-emotion';

export const injectGlobalStyles = () => injectGlobal`
  html, body, #app {
    height: 100%;
  }
  #app {
    position: relative;
  }

  .notification {
    height: fit-content !important;
    border: 0 !important;
    border-radius: 3px !important;
    padding: 15px !important;
    font-size: 16px !important;
    font-family: 'Lato', sans-serif !important;
  }
  .notifications-tr {
    right: 10px !important;
    top: 10px !important;
  }
  .notification-error {
    background-color: #FF7575E6 !important;
    color: #f8f8f8 !important;
  }
  .notification-message {
    margin-right: 20px !important;
  }
  .notification-dismiss {
    background-color: transparent !important;
    border-radius: 0 !important;
    top: 12px !important;
    right: 12px !important;
    font-size: 23px !important;
  }
`;

export const BorderStyles = css`
  transition: border-color 400ms ease-out;
  border: 2px solid #ccc;

  :hover, :focus {
    border-color: #000;
  }
`;
