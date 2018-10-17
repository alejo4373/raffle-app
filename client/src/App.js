import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Child Components
import BannerAndHeader from './Components/BannerAndHeader';
import FormComponent from './Components/Form';

const ParticipantsList = () => <div>Participants</div>
const Raffle = () => <div>Raffle</div>

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BannerAndHeader/>
        <Switch>
          <Route path='/participants' component={ParticipantsList} />
          <Route path='/raffle' component={Raffle} />
          <Route path='/' component={FormComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
