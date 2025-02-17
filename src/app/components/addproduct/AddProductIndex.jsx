'use client'

import React, { useRef } from 'react'
import AddproductHeader from '../../components/addproduct/AddproductHeader'
import AddProductForm from '../../components/addproduct/AddProductForm'
import AddProductFooter from '../../components/addproduct/AddProductFooter'

function AddProductIndex() {
    const handleSubmitRef = useRef(null);
    return (
        <div>        
                <AddproductHeader onSubmit={() => handleSubmitRef.current()} />
                <AddProductForm setSubmitFunction={handleSubmitRef} />
                <AddProductFooter onSubmit={() => handleSubmitRef.current()} />       
        </div>
    )
}

export default AddProductIndex