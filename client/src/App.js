import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import './App.css';

// Child Components
import BannerAndHeader from './Components/BannerAndHeader';
import FormComponent from './Components/Form';
import Participants from './Components/Participants';
import Raffle from './Components/Raffle';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Segment>
          <BannerAndHeader history={this.props.history} />
          <Switch>
            <Route path='/participants' component={Participants} />
            <Route path='/raffle' component={Raffle} />
            <Route path='/' component={FormComponent} />
          </Switch>
        </Segment>
      </div>
    );
  }
}

export default App;
