import React, { PureComponent } from 'react';
import Button from '../Util/Button';
import Input from '../Util/Input';

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      error: '',
    };

    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  setMessage({ target }) {
    this.setState({ message: target.value });
  }

  sendMessage() {
    const { message } = this.state;
    const newMessage = { message };
    console.log(newMessage);
    // emit message
  }


  render() {
    return (
      <div>
        <div> Output Text Box </div>
        <Input onChange={this.setMessage} placeholder="Type a message!" type="text" />
        <Button onClick={this.sendMessage}>Send!</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
      </div>
    );
  }
}


export default ChatBox;
