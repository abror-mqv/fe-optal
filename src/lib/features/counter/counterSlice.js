import { createSlice } from '@reduxjs/toolkit';

// Определяем начальное состояние
const initialState = {
    value: 0,
    loading: false,  // Пример добавления других полей
    error: null,
    cats: []
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,  // Передаём начальное состояние
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
        reset: (state) => {
            state.value = initialState.value;  // Сбрасываем к начальному состоянию
        },
        get_cats_tree: (state, action) => {
            state.cats = action.payload.data
        }
    },
});

export const { increment, decrement, incrementByAmount, reset, get_cats_tree } = counterSlice.actions;
export default counterSlice.reducer;