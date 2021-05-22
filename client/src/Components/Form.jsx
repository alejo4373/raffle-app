import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Message, Button, Header } from 'semantic-ui-react';
import ReactPhoneInput from 'react-phone-input-2';

class FormComponent extends Component {
  state = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    msg: {},
    formLoading: false
  }

  timeOutMessage = () => {
    setTimeout(() => {
      this.setState({
        msg: {}
      })
    }, 10000)
  }

  resetForm = (e) => {
    e.preventDefault();
    this.setState({
      name: '',
      lastname: '',
      phone: '',
      email: '',
      msg: {},
    })
  }

  registerUser = (user) => {
    const { raffleId } = this.props;
    axios.post(`/api/raffles/${raffleId}/participants`, user)
      .then(({ data }) => {
        let newState = {
          msg: data,
          formLoading: false
        };

        if (data.success) {
          newState = {
            name: '',
            lastname: '',
            phone: '',
            email: '',
            ...newState
          }
        }

        this.setState(newState)
        this.timeOutMessage();
      })
      .catch(err => {
        this.setState({
          msg: {
            success: false,
            title: "Network Error",
            content: "There was a problem with the network connection. We apologize for the inconvenience."
          },
          formLoading: false
        })
        console.log('Network error:', err)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      formLoading: true
    })

    // Delay for a better UX
    setTimeout(() => {
      this.registerUser(this.state)
    }, 1000)
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handlePhoneInput = (val) => {
    this.setState({
      phone: val
    })
  }

  render() {
    const { firstname, lastname, phone, email, msg, formLoading } = this.state;
    return (
      <div className='form-container'>
        <Header as='h2'>Register to participate in the raffle:</Header>
        <Form
          loading={formLoading}
          success={msg.success}
          error={!msg.success}
          onSubmit={this.handleSubmit}
        >
          <FormGroup widths='equal'>
            <Form.Input
              fluid
              label='First Name'
              type='text'
              name='firstname'
              required={true}
              value={firstname}
              placeholder='First Name'
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label='Last Name'
              type='text'
              required={true}
              name='lastname'
              value={lastname}
              placeholder='Last Name'
              onChange={this.handleInputChange}
            />
          </FormGroup>
          <Form.Input
            label='Email'
            type='email'
            name='email'
            required={true}
            value={email}
            placeholder='jhondoe@example.com'
            onChange={this.handleInputChange}
          />
          <Form.Field>
            <label>Phone</label>
            <ReactPhoneInput
              defaultCountry='us'
              regions={['america']}
              placeholder='Phone'
              value={phone}
              specialLabel=""
              inputStyle={{
                paddingLeft: '3em'
              }}
              onChange={this.handlePhoneInput}
            />
          </Form.Field>
          <Message
            success={msg.success}
            error={!msg.success}
            header={msg.title}
            content={msg.content}
          />
          <br />
          <Button.Group fluid>
            <Button content='Submit' primary />
            <Button content='Reset' onClick={this.resetForm} secondary />
          </Button.Group>
        </Form>
      </div>
    );
  }
}

export default FormComponent;
