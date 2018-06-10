import styled, { css } from 'react-emotion';
import { BorderStyles } from '../../../styles';
import Input from '../../Utils/Input';
import Button from '../../Utils/Button';

export const Container = styled('div')`
  height: 500px;
  width: 100%;
  min-width: 280px;
  margin-left: 14px;
`;

export const WindowStyles = css`
  ${BorderStyles}

  transition: border-color 400ms ease-out, border-bottom-width 400ms ease;
  height: calc(100% - 51px);
  border-bottom-width: 0px;
  padding: 14px;
  padding-bottom: 0;
  overflow: scroll;

  :hover {
    transition: border-color 400ms ease-out;
    border-bottom-width: 2px;
    margin-bottom: -1px;
    z-index: 1;
    height: calc(100% - 50px);
  }

  :hover ~ div {
    z-index: -1;
  }
`;

export const EnterMessage = styled('div')`
  height: 55px;
  position: relative;
`;

export const MessageInput = styled(Input)`
  margin: 0;
  border-radius: 0;
  border-width: 2px;
  width: 100%;
  height: inherit;
  text-align: left;
  padding-left: 14px;
  padding-right: 50px;

  ${props => (props.disabled ? css`
    background: #e9e9e9;
    border-style: dashed;
    border-color: #ccc !important;

    :hover {
      border-color: #aaa !important;
    }

    ::placeholder {
      color: #ccc;
      opacity: 1 !important;
    }
  ` : null)}
`;

export const MessageButton = styled(Button)`
  background: transparent !important;
  margin: 0;
  padding: 0;
  border-radius: 0;
  position: absolute;
  top: 0;
  right: 20px;
  height: 100%;
  width: inherit;

  i {
    transition: color 300ms ease-in;
    width: 20px;
    color: #333;
  }

  :hover {
    i {
      color: #000;
    }
  }

  ${props => (props.disabled ? css`
    i {
      color: #ccc;
    }
  ` : null)}
`;
