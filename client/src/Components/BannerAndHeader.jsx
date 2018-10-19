import React from 'react';
import { Link } from 'react-router-dom';

const BannerAndHeader = () => {
  return (
    <div>
      <Link to='/'>
        <img src='/banner.png' alt='nyc skyline' className='banner' />
      </Link>
      <div className='logo-container'>
        <a href='http://www.deliciasypunto.com'>
          <img src='/MarujitasLogos.png' className='logo' alt='marujitas logo' />
        </a>
      </div>
      <br />
    </div>
  )
}
export default BannerAndHeader;