import React, { Component } from 'react';
import './App.css';
import { Container, Form } from 'semantic-ui-react';

class App extends Component {
  state = {

  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <Container className='header'>
          <img src='http://www.digital.nyc/sites/all/themes/custom/ecohub_foundation_dnyc/images/nyc_bg.jpg' alt='nyc skyline' />
        </Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>First Name:</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Last Name:</label>
            <input placeholder='Last Name' />
          </Form.Field>
          <Form.Field>
            <label>Email:</label>
            <input type='email' placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>First Name:</label>
            <input placeholder='First Name' />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default App;
