import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Child Components
import NavBar from './NavBar';
import FormComponent from './Form';
import Participants from './Participants';
import DrawWinner from './DrawWinner';

class Raffle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffle: {}
    }
  }

  fetchRaffle = () => {
    const { raffleId } = this.props
    axios.get('/raffles/' + raffleId)
      .then(({ data }) => {
        this.setState({ raffle: data })
      })
      .catch(err => {
        console.log('Error fetching raffle', err);
      })
  }

  componentDidMount() {
    this.fetchRaffle();
  }

  render() {
    const { raffle } = this.state
    return (
      <div>
        <NavBar history={this.props.history} raffle={raffle} />
        <Switch>
          <Route path='/raffle/:raffleId/participants' component={Participants} />
          <Route path='/raffle/:raffleId/draw' component={DrawWinner} />
          <Route path='/raffle/' component={FormComponent} />
        </Switch>
      </div>
    );
  }
}

export default Raffle;
