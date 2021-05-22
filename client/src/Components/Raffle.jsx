import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

// Child Components
import NavBar from './NavBar';
import FormComponent from './Form';
import Participants from './Participants';
import DrawWinner from './DrawWinner';
import { Header } from 'semantic-ui-react';

class Raffle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffle: {}
    }
  }

  fetchRaffle = () => {
    const { raffleId } = this.props
    axios.get('/api/raffles/' + raffleId)
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

  renderParticipants = ({ match }) => {
    const { raffleId } = match.params;
    return (<Participants raffleId={raffleId} />)
  }

  renderDrawWinner = ({ match }) => {
    const { raffleId } = match.params;
    return (<DrawWinner raffleId={raffleId} />)
  }
  renderFormComponent = ({ match }) => {
    const { raffleId } = match.params;
    return (<FormComponent raffleId={raffleId} />)
  }
  render() {
    const { raffle } = this.state
    return (
      <div>
        <Header as="h2" textAlign="center">{raffle.name}</Header>
        <NavBar history={this.props.history} raffle={raffle} />
        <Switch>
          <Route path='/raffle/:raffleId/participants' render={this.renderParticipants} />
          <Route path='/raffle/:raffleId/winner' render={this.renderDrawWinner} />
          <Route path='/raffle/:raffleId' render={this.renderFormComponent} />
        </Switch>
      </div>
    );
  }
}

export default Raffle;
