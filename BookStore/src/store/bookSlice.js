import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    books: [],
}

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        addBook: (state, action) => {
            const book = {
                title: action.payload.title,
                subtitle: action.payload.subtitle,
                featuredImage: action.payload.featuredImage,
                description: action.payload.description,
                retail: action.payload.retail,
                price: action.payload.price,
                author: action.payload.author,
                category: action.payload.category,
                id: action.payload.id,
            }
            state.books.push(book)
        }, 
    }
})
export const {addBook} = bookSlice.actions;
export default bookSlice.reducer;