'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import './Search.scss'

function Search() {
    const { query } = useParams()
    return (
        <div className='SearchPage'>Seatch = {query}</div>
    )
}

export default Search