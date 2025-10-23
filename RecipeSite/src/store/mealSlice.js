import {createSlice} from '@reduxjs/toolkit';
import { set } from 'react-hook-form';

const initialState = {
    meals: [],
    loading: true,
    error: null,
    remainingloading :true
};

const mealSlice = createSlice({
    name: 'meals',
    initialState,
    reducers:{
        fetchMeals:(state,action)=>{
            const mealData={
                id: action.payload.id,
                name: action.payload.name,
                category: action.payload.category,
                area: action.payload.area,
                instructions: action.payload.instructions,
                thumbnail: action.payload.thumbnail,
                youtube: action.payload.youtube,
                ingredients: action.payload.ingredients,
                measures: action.payload.measures,
                tag:action.payload.tag
            }
            state.meals.push(mealData);
        },

        setLocalLoading:(state,action)=>{
            state.loading = action.payload;
        }
        ,setLocalError:(state,action)=>{
            state.error = action.payload;
        },
        setRemainingLoading:(state,action)=>{
            state.remainingloading = action.payload;
        }
    }
});
export const {fetchMeals,setLocalError,setLocalLoading ,setRemainingLoading} = mealSlice.actions;
export default mealSlice.reducer;