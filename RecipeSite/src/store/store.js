import { configureStore } from "@reduxjs/toolkit";
import mealReducer from './mealSlice';
import authSlice from './authSlice'
import postSlice from './postSlice'

const store = configureStore({
    reducer: {
        meals: mealReducer,
        auth: authSlice,
        posts: postSlice,
    },
});

export {store};