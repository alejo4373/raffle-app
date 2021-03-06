import React, { Component } from 'react';
import { Menu, Icon, Segment } from 'semantic-ui-react';

class NavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      activeItem: props.history.location.pathname
    }
  }

  handleMenuItem = (e, { name }) => {
    const { history } = this.props
    history.push(name);
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state;
    const { raffle } = this.props;
    return (
      <Segment basic>
        <Menu fluid widths={4} icon='labeled'>
          <Menu.Item
            name="/raffles"
            onClick={this.handleMenuItem}>
            <Icon name='ticket' />
            All Raffles
         </Menu.Item>

          <Menu.Item
            name={`/raffle/${raffle.id}`}
            active={activeItem === `/raffle/${raffle.id}`}
            onClick={this.handleMenuItem}>
            <Icon name='signup' />
            Register
        </Menu.Item>

          <Menu.Item
            name={`/raffle/${raffle.id}/participants`}
            active={activeItem === `/raffle/${raffle.id}/participants`}
            onClick={this.handleMenuItem}>
            <Icon name='group' />
            Participants
        </Menu.Item>

          <Menu.Item
            name={`/raffle/${raffle.id}/winner`}
            active={activeItem === `/raffle/${raffle.id}/winner`}
            onClick={this.handleMenuItem}>
            <Icon name='trophy' />
            Pick Winner
          </Menu.Item>
        </Menu>
      </Segment>
    )
  }
}
export default NavBar;
