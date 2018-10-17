import React, { Component } from 'react';
import axios from 'axios';
import { List, Image, Header } from 'semantic-ui-react';

class Participants extends Component {
  state = {
    participants: []
  }

  fetchParticipants = () => {
    axios.get('/users')
      .then(({ data }) => {
        this.setState({
          participants: data
        })
      })
      .catch(err => {
        console.log('Error fetching users', err);
      })
  }

  componentDidMount = () => {
    this.fetchParticipants();
  }

  render() {
    const { participants } = this.state;
    return (
      <div>
        <Header as='h2'>Participants: </Header>
        <List divided>{
          participants.map(p => (
            <List.Item>
              <Image circular className='user-avatar' src='/avatar.svg' />
              <List.Content>
                <List.Header as='h4'>{`${p.name} ${p.lastname}`}</List.Header>
                <List.Description>
                  <List>
                    <List.Item icon='hashtag' content={p.id} />
                    <List.Item icon='mail' content={p.email} />
                    <List.Item icon='phone' content={p.phone} />
                  </List>
                </List.Description>
              </List.Content>
            </List.Item>
          ))

        }</List>

      </div>
    )
  }
}

export default Participants;