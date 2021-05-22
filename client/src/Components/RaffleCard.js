import React from 'react';
import { List, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const RaffleCard = ({ raffle }) => {
  const createdAtDate = new Date(raffle.created_at);
  const raffledAtDate = new Date(raffle.raffled_at);

  const createdAt = {
    date: createdAtDate.toDateString(),
    time: createdAtDate.toLocaleTimeString()
  }

  const raffledAt = {
    date: raffledAtDate.toDateString(),
    time: raffledAtDate.toLocaleTimeString()
  }

  let raffledAt_formated = `Raffled on: ${raffledAt.date} at ${raffledAt.time}`
  if (!raffle.raffled_at) {
    raffledAt_formated = 'Not raffled yet'
  }

  return (
    <Link to={`/raffle/${raffle.id}`} >
      <Card fluid>
        <Card.Content>
          <Card.Header>{raffle.name}</Card.Header>
          <Card.Description>
            <p>
              <Icon name="calendar plus outline" /> {`Created on: ${createdAt.date} at ${createdAt.time}`}
            </p>
            <p>
              <Icon name='winner' />{`Winner Id: ${raffle.winner_id ? raffle.winner_id : "No one yet"}`}
            </p>
            <p>
              <Icon name='calendar check outline' /> {raffledAt_formated}
            </p>
          </Card.Description>

        </Card.Content>
      </Card>
    </Link>
  );
}

export default RaffleCard;
