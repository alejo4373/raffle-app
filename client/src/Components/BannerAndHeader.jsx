import React from 'react';

const BannerAndHeader = () => {
  return (
    <div>
      <div>
        <img src='/banner.png' alt='nyc skyline' className='banner' />
      </div>
      <div className='logo-container'>
        <img src='/MarujitasLogos.png' className='logo' alt='marujitas logo'/>
      </div>
      <br />
    </div>
  )
}
export default BannerAndHeader;