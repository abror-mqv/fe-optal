import React from 'react'
import Banner from '../banner/Banner'
import Feed from '../feed/Feed'
import '../../styles/components/_home_content.scss';
import DesktopCats from '../DesktopCats/DesktopCats';


function HomeContent() {

  return (
    <div className='HomeContent'>
      <DesktopCats />
      <Banner />
      <Feed />
    </div>
  )
}

export default HomeContent