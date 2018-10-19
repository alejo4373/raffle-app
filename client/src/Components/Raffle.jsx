import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

// Child Components
import BannerAndHeader from './BannerAndHeader';
import FormComponent from './Form';
import Participants from './Participants';
import DrawWinner from './DrawWinner';

class Raffle extends Component {
  render() {
    return (
      <div className='App'>
        <Segment>
          <BannerAndHeader history={this.props.history} />
          <Switch>
            <Route path='/raffle/:raffleId/participants' component={Participants} />
            <Route path='/raffle/:raffleId/draw' component={DrawWinner} />
            <Route path='/raffle/' component={FormComponent} />
          </Switch>
        </Segment>
      </div>
    );
  }
}

export default Raffle;
