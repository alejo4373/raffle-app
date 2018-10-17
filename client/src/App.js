import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// Child Components
import FormComponent from './Components/Form';
import './App.css';

const ParticipantsList = () => <div>Participants</div> 
const Raffle = () => <div>Raffle</div> 

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path='/participants' component={ParticipantsList} />
        <Route path='/raffle' component={Raffle} />
        <Route path='/' component={FormComponent} />
      </Switch>
      );
    }
  }
  
  export default App;
