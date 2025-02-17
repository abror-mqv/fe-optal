'use client'

import React from 'react'
import { useParams } from 'next/navigation';

function BoxView() {
  const { box_id } = useParams();
  return (
    <div>BoxView {box_id}</div>
  )
}

export default BoxView