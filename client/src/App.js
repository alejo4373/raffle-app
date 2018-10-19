import React, { Component } from 'react';
import axios from 'axios';
import { Segment } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// Child Components
import BannerAndHeader from './Components/BannerAndHeader';
import RafflesList from './Components/RafflesList';
import Raffle from './Components/Raffle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raffles: []
    }
  }

  fetchRaffles = () => {
    axios.get('/raffles')
      .then(({ data }) => {
        this.setState({
          raffles: data
        })
      })
  }

  componentDidMount() {
    this.fetchRaffles();
  }

  renderRafflesList = () => {
    const { raffles } = this.state;
    return (<RafflesList raffles={raffles} />)
  }

  renderRaffle = (routeProps) => {
    const { history } = this.props;
    const { raffleId } = routeProps.match.params;
    return (<Raffle history={history} raffleId={raffleId} />)
  }

  render() {
    return (
      <div className='App'>
        <Segment>
          <BannerAndHeader />
          <Switch>
            <Route path='/raffle/:raffleId' render={this.renderRaffle} />
            <Route path='/' render={this.renderRafflesList} />
          </Switch>
        </Segment>
      </div>
    );
  }
}

export default App;
