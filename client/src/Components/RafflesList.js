import React from 'react';

// Child Components
import RaffleCard from './RaffleCard';

const RafflesList = ({ raffles }) => {
  return (
    <div>{
      raffles.map(r => {
        return (<RaffleCard key={r.id} raffle={r} />)
      })
    }</div>
  );
}

export default RafflesList;
