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
          raffles: [...prevState.raffles, data.content]
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
        <Header as='h2'>Raffles: </Header>
        <RafflesList raffles={raffles} />
        <Form onSubmit={this.handleNewRaffleSubmit}>
          <Form.Input
            type='text'
            content={newRaffleName}
            onChange={this.handleNewRaffleName}
            required
          />
          <Button fluid >New Raffle</Button>
        </Form>
      </div>
    );
  }
}

export default Raffles;
