import React, { Component } from 'react';
import { Card, Image, List, } from 'semantic-ui-react';

class RaffleWinner extends Component {
  render() {
    const { winner } = this.props;
    return (
      <Card fluid>
        <Image src='https://media2.giphy.com/media/ehhuGD0nByYxO/giphy.gif?cid=3640f6095bc7959a774435562eb3e276' />
        <Card.Content>
          <Card.Header>{winner.name + ' ' + winner.lastname}</Card.Header>
          <Card.Meta>
            <span className='date'>{`Registered in ${winner.registered_at}`}</span>
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