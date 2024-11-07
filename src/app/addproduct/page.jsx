'use client'

import React, { useRef } from 'react'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import AddproductHeader from '../components/addproduct/AddproductHeader'
import AddProductForm from '../components/addproduct/AddProductForm'
import AddProductFooter from '../components/addproduct/AddProductFooter'

function page() {
    const handleSubmitRef = useRef(null);
    return (
        <div>
            <Provider store={store}>
                <AddproductHeader onSubmit={() => handleSubmitRef.current()} />
                <AddProductForm setSubmitFunction={handleSubmitRef} />
                <AddProductFooter onSubmit={() => handleSubmitRef.current()} />
            </Provider>
        </div>
    )
}

export default page