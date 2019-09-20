import React from 'react';
import { List, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RaffleCard = ({ raffle }) => {
  const createdAtDate = new Date(raffle.created_at_timestamp);
  const raffledAtDate = new Date(raffle.raffle_at_timestamp);

  const createdAt = {
    date: createdAtDate.toDateString(),
    time: createdAtDate.toLocaleTimeString()
  }

  const raffledAt = {
    date: raffledAtDate.toDateString(),
    time: raffledAtDate.toLocaleTimeString()
  }

  let raffledAt_formated = `Raffled on ${raffledAt.date} at ${raffledAt.time}`
  if (raffledAtDate.toString() === 'Invalid Date') {
    raffledAt_formated = 'Not raffled yet'
  }

  return (
    <Link to={`/raffle/${raffle.id}`} >
      <Card fluid>
        <Card.Content>
          <Card.Header>{raffle.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{`Registered on ${createdAt.date} at ${createdAt.time}`}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item icon='winner' content={raffle.winner_id} />
            <List.Item icon='calendar check outline' content={raffledAt_formated} />
          </List>
        </Card.Content>
      </Card>
    </Link>
  );
}

export default RaffleCard;
