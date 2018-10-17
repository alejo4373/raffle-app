import React from 'react';
import { Header } from 'semantic-ui-react';

const BannerAndHeader = () => {
  return (
    <div>
      <div>
        <img src='/banner.png' alt='nyc skyline' className='banner' />
      </div>
      <Header as='h1'>Delicias y Punto - ColombiaFest 2018 </Header>
    </div>
  )
}
export default BannerAndHeader;