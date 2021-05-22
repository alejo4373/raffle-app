import React, { Component } from 'react';
import {
  Input,
  Button,
  Form,
  Message
} from 'semantic-ui-react';

class RaffleForm extends Component {
  state = {
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

  handleSubmit = (e) => {
    this.props.handleSubmit(e);
  }

  render() {
    const { buttonDisabled, } = this.state;
    const { msg, token, waiting } = this.props;
    return (
      <Form
        onSubmit={this.handleSubmit}
        error={!msg.success}
        loading={waiting}
      >
        <Input
          fluid
          icon='key'
          iconPosition='left'
          placeholder='Secret token'
          onChange={this.handleInput}
          value={token}
        />
        <br />
        <Button
          fluid
          positive
          disabled={buttonDisabled}
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
