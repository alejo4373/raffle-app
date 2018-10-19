import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

// Child Components
import RaffleCard from './RaffleCard';

const RafflesList = ({ raffles }) => {
  return (
    <div>
      <Header as='h2'>Raffles: </Header>
      <div>
        {
          raffles.map(r => {
            return (<RaffleCard raffle={r} />)
          })
        }
      </div>
    </div>
  );
}

export default RafflesList;
