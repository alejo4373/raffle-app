import React, { Component } from 'react';
import { Card, List, Image } from 'semantic-ui-react';

class RaffleWinner extends Component {
  render() {
    const { winner } = this.props;
    const dateObj = new Date(winner.registered_at);
    const date = dateObj.toDateString();
    const time = dateObj.toLocaleTimeString();
    return (
      <Card fluid>
        <Image src="/_blah.png" alt='yahoo'/>
        <Card.Content>
          <Card.Header>{winner.name + ' ' + winner.lastname}</Card.Header>
          <Card.Meta>
            <span className='date'>{`Registered on ${date} at ${time}`}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <List>
            <List.Item icon='hashtag' content={winner.id} />
            <List.Item icon='mail' content={winner.email} />
            <List.Item icon='phone' content={winner.phone} />
          </List>
        </Card.Content>
      </Card>
    )
  }
}

export default RaffleWinner;