import React from 'react'
import Banner from '../banner/Banner'
import Feed from '../feed/Feed'
import '../../styles/components/_home_content.scss';

import { useEffect } from "react";
import axios from "axios";

import { get_cats_tree } from "@/lib/features/counter/counterSlice";
import { useDispatch } from "react-redux";

function HomeContent() {

  return (
    <div className='HomeContent'>
      <Banner />
      <Feed />
    </div>
  )
}

export default HomeContent