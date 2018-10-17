import React, { Component } from 'react';
import axios from 'axios';
import { Card, Image, Header, Input, Button, List } from 'semantic-ui-react';

class Raffle extends Component {
  state = {
    winner: {},
  }

  fetchRaffleWinner = () => {
    axios.get('/raffle')
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
          numberOfParticipants: data.count,
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
        <div className='card-container'>
          <Card fluid>
            <Image src='/avatar.svg' />
            <Card.Content>
              <Card.Header>{winner.name + ' ' + winner.lastname}</Card.Header>
              <Card.Meta>
                <span className='date'>{`Registered in ${winner.registered_at}`}</span>
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <List>
                <List.Item icon='hashtag' content={winner.id} />
                <List.Item icon='mail' content={winner.email} />
                <List.Item icon='phone' content={winner.phone} />
              </List>
            </Card.Content>
          </Card>
          <Button
            fluid
            positive
            content='Pick a Winner'
            onClick={this.fetchRaffleWinner}
          />
        </div>
      </div>
    )
  }
}

export default Raffle;