import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Header } from 'semantic-ui-react';
import './App.css';

// Child Components
import BannerAndHeader from './Components/BannerAndHeader';
import RaffleCard from './Components/RaffleCard';

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

  render() {
    const { raffles } = this.state;
    return (
      <div className='App'>
        <Segment>
          <BannerAndHeader history={this.props.history} />
          <Header as='h2'>Raffles</Header>
          <br />
          {
            raffles.map(r => {
              return (<RaffleCard raffle={r} />)
            })
          }
        </Segment>
      </div>
    );
  }
}

export default App;
