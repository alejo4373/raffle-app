import React, { Component } from 'react';
import { Header, Button, Form } from 'semantic-ui-react';

// Child Components
import RaffleCard from './RaffleCard';

const RafflesList = ({ raffles, handleNewRaffleName, raffleName, handleNewRaffleButton }) => {
  return (
    <div>
      <Header as='h2'>Raffles: </Header>
      <div>
        {
          raffles.map(r => {
            return (<RaffleCard raffle={r} />)
          })
        }
        <br />
        <Form fluid >
          <Form.Input type='text' content={raffleName} onChange={handleNewRaffleName} required />
          <Button fluid onClick={handleNewRaffleButton} >New Raffle</Button>
        </Form>
      </div>
    </div>
  );
}

export default RafflesList;
