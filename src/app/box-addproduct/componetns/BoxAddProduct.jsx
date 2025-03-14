'use client'

import React, { useRef } from 'react'
import BoxAddProductHeader from './BoxAddProductHeader';
import BoxAddProductForm from './BoxAddProductForm';
import BoxAddProductFooter from './BoxAddProductFooter';


function BoxAddProduct() {
    const handleSubmitRef = useRef(null);

    return (
        <div>
            <BoxAddProductHeader onSubmit={() => handleSubmitRef.current()} />
            <BoxAddProductForm setSubmitFunction={handleSubmitRef} />
            <BoxAddProductFooter onSubmit={() => handleSubmitRef.current()} />
        </div>
    )
}

export default BoxAddProduct