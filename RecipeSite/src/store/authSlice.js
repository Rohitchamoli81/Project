import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    loading: true,
    error: null,
    status: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = true;
        },

        removeUser: (state) => {
            state.user = null;
            state.status = false;
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },  

        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});
export const { setUser, removeUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;