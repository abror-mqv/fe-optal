import { createSlice } from '@reduxjs/toolkit'

export const ShopMGR = createSlice({
    name: 'ShopMGR',
    initialState: {
        "user_data": {
            "username": "guest",
            "chips": 0,
            "gems": 0
        },
    },
    reducers: {
        setUserData: (state, action) => {
            state.user_data.username = "OPTRAL";
        },
    },
})


export const { } = ShopMGR.actions
export default ShopMGR.reducer