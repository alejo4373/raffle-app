import React, { Component } from 'react';
import axios from 'axios';
import { Card, Image, Header, Icon } from 'semantic-ui-react';

class Raffle extends Component {
  state = {
    winner: {},
  }

  fetchRaffleWinner = () => {
    axios.get('/users/winner')
      .then(({ data }) => {
        this.setState({
          winner: data,
        })
      })
      .catch(err => {
        console.log('Error picking winner', err);
      })
  }

  fetchNumberOfParticipants = () => {
    axios.get('/users/total')
      .then(({ data }) => {
        this.setState({
          numberOfParticipants: data,
        })
      })
      .catch(err => {
        console.log('Error fetching # of participants', err);
      })
  }

  componentDidMount = () => {
    this.fetchNumberOfParticipants();
  }

  render() {
    const { winner } = this.state;
    return (
      <div>
        <Header as='h2'>Raffle: </Header>
        <Card>
          <Image src='/avatar.svg' />
          <Card.Content>
            <Card.Header>{winner.name + ' ' + winner.lastname}</Card.Header>
            <Card.Meta>
              <span className='date'>{`Registered in ${winner.registered_at}`}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <Icon name='hashtag'>{winner.id}</Icon>
            <Icon name='mail'>{winner.email}</Icon>
            <Icon name='phone'>{winner.phone}</Icon>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default Raffle;