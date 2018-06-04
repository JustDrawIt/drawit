import styled from 'react-emotion';

const Input = styled('input')`
  font-size: 20px;
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  width: 180px;
  border: 3px solid #bbb;
  color: #555;
  transition: border 300ms ease;

  :focus, :hover {
    outline: none;
    border-color: #555;
    transition: border 400ms ease;
  }
`;

export default Input;

