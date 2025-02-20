'use client';

import { Provider } from 'react-redux';
import { store } from '../redux/store';

import React from 'react'
import Header from '../components/header/Header'
import Cart from '../components/cart/Cart'
import BoxHeader from '../box/[box_id]/components/BoxHeader';

function cart() {

    return (
        <Provider store={store}>
            <div>
                <BoxHeader />
                <Cart data={cart} />
                {/* <Footer /> */}
            </div>
        </Provider>
    )
}

export default cart