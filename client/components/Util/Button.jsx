import styled, { css } from 'react-emotion';

const width = '180px';
const fontSize = '20px';
const padding = '8px';

const types = {
  default: css`
    color: #f8f8f8;
    background: #2f2f2f;

    :hover {
      background: #000;
    }
  `,
  colored: css`
    color: #f8f8f8;
    background: blue;

    :hover {
      background: #0038D3;
    }
  `,
};

const Button = styled('button')`
  ${props => types[props.type || 'default']};

  width: ${props => props.width || width};
  font-size: ${props => props.fontSize || fontSize};
  padding: ${props => props.padding || padding};

  transition: all 300ms ease-out;
  border: 0px;
  margin: 5px auto;
  display: block;
  cursor: pointer;

  :focus {
    outline: none;
  }

  a {
    color: inherit;
  }
`;

export default Button;
