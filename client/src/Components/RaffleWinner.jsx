import React, { Component } from 'react';
import { Card, List, Image, Header } from 'semantic-ui-react';

class RaffleWinner extends Component {
  render() {
    const { winner } = this.props;
    const dateObj = new Date(winner.registered_at);
    const date = dateObj.toDateString();
    const time = dateObj.toLocaleTimeString();
    return (
      <div>
        <Header as="h2">Winner</Header>
        <Card centered>
          <Image src="/_blah.png" alt='yahoo' />
          <Card.Content>
            <Card.Header>{winner.firstname + ' ' + winner.lastname}</Card.Header>
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
      </div>
    )
  }
}

export default RaffleWinner;
