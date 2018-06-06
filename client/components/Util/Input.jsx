import styled from 'react-emotion';

const width = '180px';
const fontSize = '20px';
const padding = '8px';
const rounded = '30px';

const Input = styled('input')`
  width: ${props => props.width || width};
  font-size: ${props => props.fontSize || fontSize};
  padding: ${props => props.padding || padding};
  border-radius: ${props => (props.rounded ? rounded : '3px')};

  transition: border 300ms ease;
  border: 3px solid #ccc;
  margin: 0 auto;
  color: #606060;
  font-size: 20px;
  display: block;
  text-align: center;

  :focus, :hover {
    outline: none;
    border-color: #333;
    transition: border 400ms ease-out;

    ::placeholder {
      opacity: .5;
    }
  }
`;

export default Input;
