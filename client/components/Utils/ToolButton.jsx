import styled, { css } from 'react-emotion';
import withProps from 'recompose/withProps';
import Button from './Button';

const activeToolButtonStyles = (activeColor = '#f8f8f8') => css`
  color: ${activeColor};
  background: #000;
`;

const ToolButton = withProps({ circle: true })(styled(Button)`
  transition: background 300ms ease-in-out, color 300ms ease-in-out;
  width: 50px;
  height: 50px;
  border: 1.5px solid #000;
  color: #000;
  background: #f8f8f8;

  :hover {
    ${props => activeToolButtonStyles(props.activeColor)}
  }

  ${props => (props.active ? activeToolButtonStyles(props.activeColor) : null)};
  color: ${props => props.color};
  background: ${props => props.background};
`);

export default ToolButton;
