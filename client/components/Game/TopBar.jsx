import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Flex from '../Utils/Flex';
import StartGame from './StartGame';
import { BorderStyles } from '../../styles';

const Container = styled(Flex)`
  ${BorderStyles}
  width: 100%;
  padding: 14px;
  margin-bottom: 12px;
`;

const JoinCode = styled('div')`
  width: fit-content;
  margin-left: auto;
  margin-top: auto;
  cursor: pointer;
  span {
    font-size: 18px;
  }
`;

const Word = styled('div')`
  font-size: 20px;
  padding: 20px;
`;

const TopBar = props => (
  <Container>
    {props.isAdmin && !props.started ? <StartGame addNotification={props.addNotification} /> : null}
    {props.drawing ? <Word>{props.word}</Word> : null}
    <JoinCode>
      <span>{props.joinCode}</span>
    </JoinCode>
  </Container>
);

TopBar.defaultProps = {
  word: null,
};

TopBar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  drawing: PropTypes.bool.isRequired,
  word: PropTypes.string,
  joinCode: PropTypes.string.isRequired,
  addNotification: PropTypes.func.isRequired,
};

export default TopBar;

