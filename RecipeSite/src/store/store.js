import { configureStore } from "@reduxjs/toolkit";
import mealReducer from './mealSlice';
import authSlice from './authSlice'
import postSlice from './postSlice'
import mealSlice from "./mealSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postSlice,
        meals: mealReducer
    },
});

export {store};