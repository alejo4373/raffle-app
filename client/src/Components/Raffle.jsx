import React, { Component } from 'react';
import axios from 'axios';
import { Header } from 'semantic-ui-react';

import RaffleForm from './RaffleForm';
import RaffleWinner from './RaffleWinner';

class Raffle extends Component {
  state = {
    winner: null,
    secret: '',
    msg: {}
  }

  selectRaffleWinner = () => {
    const { secret } = this.state
    this.setState({ buttonLoading: true })

    axios.post('/raffle', { secret })
      .then(({ data }) => {
        if (data.type === 'FORBIDDEN') {
          this.setState({
            msg: data,
            buttonLoading: false,
            secret: ''
          })
        } else {
          this.setState({
            winner: data,
            buttonLoading: false,
            msg: {}
          })
        }
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

  fetchWinner = () => {
    axios.get('/raffle/winner')
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
    this.fetchNumberOfParticipants();
  }

  handleInput = (value) => {
    this.setState({
      secret: value,
    })
  }

  renderRaffleForm = () => {
    const { secret, msg } = this.state;
    return (
      <RaffleForm
        handleSubmit={this.selectRaffleWinner}
        handleInput={this.handleInput}
        secret={secret}
        msg={msg}
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
        <Header as='h2'>Raffle: </Header>
        <div className='raffle-container'>
          {
            winner ? this.renderRaffleWinner()
              : this.renderRaffleForm()
          }
        </div>
      </div>
    )
  }
}

export default Raffle;