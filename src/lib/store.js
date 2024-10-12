import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import counterSlice from '../lib/features/counter/counterSlice'
// Импортируй свои слайсы, если они у тебя уже есть
// import exampleSlice from './exampleSlice';

const rootReducer = combineReducers({
    counter: counterSlice
});

export const store = configureStore({
    reducer: {
        counter: counterSlice,
    },
});

export default store;