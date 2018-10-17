import React, { Component } from 'react';
import './App.css';
import { Container, Form, FormGroup } from 'semantic-ui-react';
import ReactPhoneInput from 'react-phone-input-2';

class App extends Component {
  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault();
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
    const { name, lastname, phone, email } = this.state;
    return (
      <div className="App">
        <Container className='header'>
          <img src='http://www.digital.nyc/sites/all/themes/custom/ecohub_foundation_dnyc/images/nyc_bg.jpg' alt='nyc skyline' />
        </Container>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup widths='equal'>
              <Form.Input
                fluid
                label='First Name'
                type='text'
                name='name'
                value={name}
                placeholder='First Name'
                onChange={this.handleInputChange}
              />
              <Form.Input
                fluid
                label='Last Name'
                type='text'
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
                  'padding-left': '3em'
                }}
                onChange={this.handlePhoneInput}
              />
            </Form.Field>
            <Form.Button content='Submit'/>
          </Form>
        </Container>
      </div >
    );
  }
}

export default App;
