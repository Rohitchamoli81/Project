import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookReducer from './bookSlice';
import cardReducer from './cardSlice';

const   store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        cards: cardReducer
    }
});

export default store;
