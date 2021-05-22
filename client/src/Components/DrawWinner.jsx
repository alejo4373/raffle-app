import React, { Component } from 'react';
import axios from 'axios';
import { Header, Message } from 'semantic-ui-react';

import RaffleForm from './RaffleForm';
import RaffleWinner from './RaffleWinner';

class DrawWinner extends Component {
  state = {
    winner: null,
    secret: '',
    waiting: false,
    msg: {},
    numberOfParticipants: 0
  }

  drawRaffleWinner = () => {
    const { secret } = this.state;
    const { raffleId } = this.props;

    this.setState({
      waiting: true
    })

    axios.post(`/api/raffles/${raffleId}/draw`, { secret })
      .then(({ data }) => {
        if (data.type === 'FORBIDDEN') {
          this.setState({
            msg: data,
            waiting: false,
            secret: ''
          })
        } else {
          this.setState({
            winner: data,
            waiting: false,
            msg: {}
          })
        }
      })
      .catch(err => {
        console.log('Error picking winner', err);
      })
  }

  fetchNumberOfParticipants = () => {
    const { raffleId } = this.props;
    axios.get(`/api/raffles/${raffleId}/total`)
      .then(({ data }) => {
        this.setState({
          numberOfParticipants: data.count,
        })
      })
      .catch(err => {
        console.log('Error fetching # of participants', err);
      })
  }

  fetchWinner = () => {
    const { raffleId } = this.props;
    axios.get(`/api/raffles/${raffleId}/winner`)
      .then(({ data }) => {
        this.setState({
          winner: data,
        })
      })
      .catch(err => {
        console.log('Error fetching winner', err);
      })
  }

  componentDidMount = () => {
    this.fetchWinner();
    this.fetchNumberOfParticipants();
  }

  handleInput = (value) => {
    this.setState({
      secret: value,
    })
  }

  renderRaffleForm = () => {
    const { secret, msg, waiting } = this.state;
    return (
      <RaffleForm
        handleSubmit={this.drawRaffleWinner}
        handleInput={this.handleInput}
        secret={secret}
        msg={msg}
        waiting={waiting}
      />
    )
  }

  renderRaffleWinner = () => {
    const { winner } = this.state;
    return (<RaffleWinner winner={winner} />)
  }

  render() {
    const { winner } = this.state
    return (
      <div>
        <Header as='h2'>Pick a Winner</Header>
        <Message warning content="To pick a winner for this raffle you must know the secret token" />
        {
          winner ? this.renderRaffleWinner()
            : this.renderRaffleForm()
        }
      </div>
    )
  }
}

export default DrawWinner;
