import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  Message
} from 'semantic-ui-react';

class RaffleForm extends Component {
  state = {
    buttonLoading: false,
    buttonDisabled: true,
  }

  handleInput = (e, { value }) => {
    let buttonDisabled = false;

    if (value === '') {
      buttonDisabled = true
    }

    this.setState({
      buttonDisabled
    })

    this.props.handleInput(value)
  }

  render() {
    const { buttonLoading, buttonDisabled, } = this.state;
    const { msg, secret } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit} error={!msg.success}>
        <Input
          fluid
          icon='key'
          iconPosition='left'
          placeholder='Secret word'
          onChange={this.handleInput}
          value={secret}
        />
        <br />
        <Button
          fluid
          positive
          disabled={buttonDisabled}
          loading={buttonLoading}
          content='Pick a Winner'
        />
        <Message
          error={!msg.success}
          header={msg.title}
          content={msg.content}
        />
      </Form >
    )
  }
}

export default RaffleForm;