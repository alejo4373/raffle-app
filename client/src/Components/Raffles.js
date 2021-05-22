import React, { Component } from 'react';
import axios from 'axios';
import { Header, Button, Form } from 'semantic-ui-react';

// Child Components
import RafflesList from './RafflesList';

class Raffles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffles: [],
      newRaffleName: '',
      newRaffleToken: ''
    }
  }

  fetchRaffles = () => {
    axios.get('/api/raffles')
      .then(({ data }) => {
        this.setState({
          raffles: data
        })
      })
  }

  componentDidMount() {
    this.fetchRaffles();
  }

  handleInput = (e) => {
    let { value, name } = e.target
    this.setState({
      [name]: value
    })
  }

  handleNewRaffleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/raffles', {
        name: this.state.newRaffleName,
        secret_token: this.state.newRaffleToken
      })
      this.setState(prevState => {
        return {
          raffles: [...prevState.raffles, data.content],
          newRaffleName: ''
        }
      })
    } catch (err) {
      console.log('ERROR =>', err)
    }
  }

  render() {
    const { raffles, newRaffleName, newRaffleToken } = this.state
    return (
      <div className='raffles'>
        <Header as='h2'>New Raffle: </Header>
        <Form onSubmit={this.handleNewRaffleSubmit}>
          <Form.Input
            label='Raffle Name:'
            type='text'
            content={newRaffleName}
            name="newRaffleName"
            onChange={this.handleInput}
            value={newRaffleName}
            required
          />
          <Form.Input
            label='Raffle Secret Token'
            type='text'
            content={newRaffleToken}
            name="newRaffleToken"
            onChange={this.handleInput}
            value={newRaffleToken}
            required
          />
          <p>You must remember the Raffle Token because it will be asked when picking a winner</p>
          <Button primary fluid >Create New Raffle</Button>
        </Form>
        <Header as='h2'>All Raffles: </Header>
        <RafflesList raffles={raffles} />

      </div>
    );
  }
}

export default Raffles;
