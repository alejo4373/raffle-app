import React, { Component } from 'react';
import './App.css';
import { Container, Form, FormGroup } from 'semantic-ui-react';

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

  render() {
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
                label='First Name:'
                type='text'
                name='name'
                placeholder='First Name'
                onChange={this.handleInputChange}
              />
              <Form.Input
                fluid
                label='Last Name:'
                type='text'
                name='lastname'
                placeholder='Last Name'
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <Form.Input
              label='Email'
              type='email'
              name='email'
              placeholder='jhondoe@example.com'
              onChange={this.handleInputChange}
            />
            <Form.Input
              label='Phone'
              placeholder='Phone'
              type='text'
              name='phone'
              onChange={this.handleInputChange}
            />
          </Form>
        </Container>
      </div >
    );
  }
}

export default App;
