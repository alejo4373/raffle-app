import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Raffles from './Components/Raffles';
import Raffle from './Components/Raffle';

class App extends Component {

  renderRaffle = (routeProps) => {
    const { history } = this.props;
    const { raffleId } = routeProps.match.params;
    return (<Raffle history={history} raffleId={raffleId} />)
  }

  render() {
    return (
      <div className='App'>
        <Segment>
          <Header as="h1" textAlign="center">Raffle App</Header>
          <Switch>
            <Route path='/raffle/:raffleId' render={this.renderRaffle} />
            <Route path='/' component={Raffles} />
          </Switch>
        </Segment>
      </div>
    );
  }
}

export default App;
