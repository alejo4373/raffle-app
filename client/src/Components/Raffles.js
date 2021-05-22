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
      newRaffleName: ''
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

  handleNewRaffleName = (e) => {
    let { value } = e.target
    this.setState({
      newRaffleName: value
    })
  }

  handleNewRaffleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/raffles', { name: this.state.newRaffleName })
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
    const { raffles, newRaffleName } = this.state
    return (
      <div className='raffles'>
        <Header as='h2'>New Raffle: </Header>
        <Form onSubmit={this.handleNewRaffleSubmit}>
          <Form.Input
            label='Raffle Name:'
            type='text'
            content={newRaffleName}
            onChange={this.handleNewRaffleName}
            value={newRaffleName}
            required
          />
          <Button primary fluid >Create New Raffle</Button>
        </Form>
        <Header as='h2'>All Raffles: </Header>
        <RafflesList raffles={raffles} />

      </div>
    );
  }
}

export default Raffles;
