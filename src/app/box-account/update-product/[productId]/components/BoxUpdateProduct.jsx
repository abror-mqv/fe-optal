'use client'

import React, { useRef } from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';


import Header from './components/Header';
import Form from './components/Form';
import Footer from './components/Footer';


import '../../../../styles/components/_addproduct.scss'

function BoxUpdateProduct() {
    const { productId } = useParams();

    const handleSubmitRef = useRef(null);
    

    return (
        <div className='UpdateProduct'>
            <Header onSubmit={() => handleSubmitRef.current()} />
            <Form productId={productId} setSubmitFunction={handleSubmitRef} />
            <Footer onSubmit={() => handleSubmitRef.current()} />
        </div>
    )
}

export default BoxUpdateProduct