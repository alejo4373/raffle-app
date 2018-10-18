import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const BannerAndHeader = (props) => {
  return (
    <div>
      <Link to='/'>
        <img src='/banner.png' alt='nyc skyline' className='banner' />
      </Link>
      <div className='logo-container'>
        <a href='http://www.deliciasypunto.com'>
          <img src='/MarujitasLogos.png' className='logo' alt='marujitas logo' />
        </a>
        <NavBar history={props.history} />
      </div>
      <br />
    </div>
  )
}
export default BannerAndHeader;