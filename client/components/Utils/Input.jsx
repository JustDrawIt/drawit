import styled from 'react-emotion';
import { BorderStyles } from '../../styles';

const width = '180px';
const fontSize = '20px';
const padding = '8px';

const Input = styled('input')`
  ${BorderStyles}

  display: block;
  text-align: center;
  color: #606060;
  font-size: 20px;
  margin: 0 auto;
  border-width: 3px;
  border-radius: 3px;

  ::placeholder {
    transition: opacity 400ms ease-out;
  }

  :focus, :hover {
    outline: none;

    ::placeholder {
      opacity: .5;
    }
  }

  width: ${props => props.width || width};
  font-size: ${props => props.fontSize || fontSize};
  padding: ${props => props.padding || padding};
`;

export default Input;
