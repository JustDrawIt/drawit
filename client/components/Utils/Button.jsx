import styled, { css } from 'react-emotion';

const width = '180px';
const fontSize = '20px';
const padding = '8px';
const borderRadius = '3px';
const circleRadius = '100%';
const colors = {
  default: css`
    background: #2f2f2f;

    :hover {
      background: #000;
    }
  `,
  primary: css`
    background: #6087FF;

    :hover {
      background: #3567FF;
    }
  `,
};

const Button = styled('button')`
  ${props => (colors[props.color || 'default'])};

  width: ${props => props.width || width};
  font-size: ${props => props.fontSize || fontSize};
  padding: ${props => props.padding || padding};
  border-radius: ${props => (props.circle ? circleRadius : borderRadius)};

  transition: background 300ms ease-out;
  color: #f8f8f8;
  border: 0;
  margin: 5px;
  cursor: pointer;

  :focus {
    outline: none;
  }

  a {
    color: inherit;
  }
`;

export default Button;
