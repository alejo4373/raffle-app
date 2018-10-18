import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

class NavBar extends Component {
  constructor(props) {
    super();
    this.state = {
      activeItem: props.history.location.pathname
    }
  }

  handleMenuItem = (e, { name }) => {
    console.log('hanldemenuitem', name)
    const { history } = this.props
    history.push(name);
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state;
    return (
      <div>
        <Menu compact icon='labeled'>
          <Menu.Item name='/' active={activeItem === '/'} onClick={this.handleMenuItem}>
            <Icon name='signup' />
            Register
        </Menu.Item>

          <Menu.Item name='/participants' active={activeItem === '/participants'} onClick={this.handleMenuItem}>
            <Icon name='group' />
            Participants
        </Menu.Item>

          <Menu.Item name='/raffle' active={activeItem === '/raffle'} onClick={this.handleMenuItem}>
            <Icon name='ticket' />
            Raffle
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default NavBar;