import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    meals: [],
    loading: true,
    error: null,
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
                tags: action.payload.tags,
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
        }
    }
});
export const {fetchMeals,setLocalError,setLocalLoading} = mealSlice.actions;
export default mealSlice.reducer;