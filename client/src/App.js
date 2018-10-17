import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import axios from 'axios';
import { Header, Form, FormGroup, Message, Button } from 'semantic-ui-react';
import ReactPhoneInput from 'react-phone-input-2';

import './App.css';

class App extends Component {
  state = {
    name: '',
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
    axios.post('/register', user)
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
    const { name, lastname, phone, email, msg, formLoading } = this.state;
    return (
      <div className="App">
        <div>
          <img src='/banner.png' alt='nyc skyline' className='banner' />
        </div>
        <Header as='h1'>Delicias y Punto - ColombiaFest 2018 </Header>
        <div className='form-container'>
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
                name='name'
                required={true}
                value={name}
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
      </div >
    );
  }
}

export default App;
