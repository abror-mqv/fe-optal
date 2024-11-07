'use client';

import { Provider } from 'react-redux';
import { store } from '../../redux/store';

import React from 'react'
import Header from '../components/header/Header'
import Cart from '../components/cart/Cart'

function cart() {

    return (
        <Provider store={store}>
            <div>
                <Header />
                <Cart data={cart} />
                {/* <Footer /> */}
            </div>
        </Provider>
    )
}

export default cart