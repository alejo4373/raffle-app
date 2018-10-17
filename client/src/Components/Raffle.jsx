import React, { Component } from 'react';
import axios from 'axios';
import { Card, Image, Header, Input, Button, List } from 'semantic-ui-react';

class Raffle extends Component {
  state = {
    winner: {},
    secret: '',
    buttonLoading: false,
    buttonDisabled: true
  }

  fetchRaffleWinner = () => {
    const { secret } = this.state
    this.setState({ buttonLoading: true })

    axios.post('/raffle', { secret })
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

  handleInput = (e, { value }) => {
    let buttonDisabled = false;

    if (value === '') {
      buttonDisabled = true
    }

    this.setState({
      secret: value,
      buttonDisabled
    })
  }

  render() {
    const { winner, buttonLoading, buttonDisabled, secret } = this.state;
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
          <Input
            fluid
            icon='key'
            iconPosition='left'
            placeholder='Secret word'
            onChange={this.handleInput}
            value={secret}
          />
          <br />
          <Button
            fluid
            positive
            disabled={buttonDisabled}
            loading={buttonLoading}
            content='Pick a Winner'
            onClick={this.fetchRaffleWinner}
          />
        </div>
      </div>
    )
  }
}

export default Raffle;