import React, { Component } from 'react';
import axios from 'axios';
import RaffleForm from './RaffleForm';
import RaffleWinner from './RaffleWinner';

class DrawWinner extends Component {
  state = {
    winner: null,
    token: '',
    waiting: false,
    msg: {
      warning: true,
      title: "Secret Token",
      content: "The secret token used when creating the raffle must be provided."
    },
    numberOfParticipants: 0
  }

  drawRaffleWinner = () => {
    const { token } = this.state;
    const { raffleId } = this.props;

    this.setState({
      waiting: true
    })

    axios.put(`/api/raffles/${raffleId}/winner`, { token })
      .then(({ data }) => {
        this.setState({
          winner: data,
          waiting: false,
          msg: {}
        })
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 403) {
            return this.setState({
              msg: {
                error: true,
                title: "Wrong Secret Token",
                content: err.response.data.message
              },
              waiting: false
            })
          }
        }
        this.setState({
          msg: {
            error: true,
            title: "Unknown Error",
            content: "Something went wrong. Try to reload the page and try again."
          },
          waiting: false
        })
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
      token: value,
    })
  }

  renderRaffleForm = () => {
    const { token, msg, waiting } = this.state;
    return (
      <RaffleForm
        handleSubmit={this.drawRaffleWinner}
        handleInput={this.handleInput}
        token={token}
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

        {
          winner ? this.renderRaffleWinner()
            : this.renderRaffleForm()
        }
      </div>
    )
  }
}

export default DrawWinner;
