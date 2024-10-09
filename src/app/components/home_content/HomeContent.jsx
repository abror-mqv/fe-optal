import React from 'react'
import Banner from '../banner/Banner'
import Feed from '../feed/Feed'
import '../../styles/components/_home_content.scss';

function HomeContent() {
  return (
    <div className='HomeContent'>
        <Banner/>
        <Feed/>
    </div>
  )
}

export default HomeContent