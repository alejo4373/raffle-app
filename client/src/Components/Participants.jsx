import React, { Component } from 'react';
import axios from 'axios';
import { List, Image, Header, Input } from 'semantic-ui-react';

class Participants extends Component {
  state = {
    allParticipants: [],
    participants: []
  }

  fetchParticipants = () => {
    axios.get('/users')
      .then(({ data }) => {
        this.setState({
          allParticipants: data,
          participants: data
        })
      })
      .catch(err => {
        console.log('Error fetching users', err);
      })
  }

  filterParticipants = (pattern) => {
    this.setState(prevState => {
      const filteredParticipants = prevState.allParticipants.filter(p => {
        const fullName = p.name + ' ' + p.lastname;
        return fullName.toLowerCase().includes(pattern.toLowerCase())
      })

      return { participants: filteredParticipants }
    })
  }

  handleInput = (e, { value }) => {
    console.log(value)
    this.filterParticipants(value);
  }

  componentDidMount = () => {
    this.fetchParticipants();
  }

  render() {
    const { participants } = this.state;
    return (
      <div>
        <Header as='h2'>Participants: </Header>
        <div>
          <Input fluid icon='search' placeholder='Search..' onChange={this.handleInput} />
        </div>
        <List divided>{
          participants.map((p, i) => (
            <List.Item key={p.name + i}>
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