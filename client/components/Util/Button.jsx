import styled from 'react-emotion';

const Button = styled('button')`
  color: #f8f8f8;
  background-color: #222;
  font-size: 20px;
  padding: 12px;
  margin: 5px auto;
  width: 180px;
  border: 0;
  cursor: pointer;
  transition: background-color 300ms ease;

  :focus {
    outline: none;
  }

  :hover {
    transition: background-color 300ms ease;
    background-color: #000;
  }
`;

export default Button;

