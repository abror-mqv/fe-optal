import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    product_name: "",
    product_sizes: "",
    product_description: "",
    product_price: "",
    color_variants: []
}

const addproductSlice = createSlice({
    name: "addproduct",
    initialState,
    reducers: {
        // setName(state, action) {
        //     state.product_name = action.payload
        // },
        // setSizes(state, action) {
        //     state.product_sizes = action.payload
        // },
        // setDescription(state, action) {
        //     state.product_description = action.payload
        // },
        // setPrice(state, action) {
        //     state.product_price = action.payload
        // },
        setNewVariant(state) {
            state.color_variants.push({
                id: state.color_variants.length + 1,
                color_image: "",
                color_name: "",
                color_hex: ""
            })
        },

        setVariantName: (state, action) => {
            const { id, name } = action.payload;

            if (state.color_variants && state.color_variants[id.id - 1]) {
                state.color_variants[id.id - 1].color_name = id.color_name;
            } else {
            }
        },
        setVariantHex(state, action) {
            const { id, color_hex } = action.payload
            state.color_variants[id].color_hex = color_hex
        },
        // setVariantImage(state, action) {
        //     state.color_variants[action.payload.id].color_image = action.payload.image
        // },
        // setRemoveVariant(state, action) {
        //     state.color_variants.splice(action.payload.id - 1, 1)
        // }

    }
})

export const { setNewVariant, setVariantName, setVariantHex } = addproductSlice.actions
export default addproductSlice.reducer