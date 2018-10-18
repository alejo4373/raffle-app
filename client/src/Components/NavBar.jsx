import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <div>
      <Menu compact icon='labeled'>
        <Link to='/'>
          <Menu.Item name='form'>
            <Icon name='signup' />
            Register
        </Menu.Item>
        </Link>

        <Link to='/participants'>
          <Menu.Item name='participants'>
            <Icon name='group' />
            Participants
        </Menu.Item>

        </Link>
        <Link to='/raffle'>
          <Menu.Item name='raffle'>
            <Icon name='ticket' />
            Raffle
          </Menu.Item>
        </Link>
      </Menu>
    </div>
  )
}
export default NavBar;