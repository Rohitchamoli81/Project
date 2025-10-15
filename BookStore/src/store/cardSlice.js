import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cards: [],
}

const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            const existing = state.cards.find(card => card.bookId === action.payload.bookId && card.userId===action.payload.userId);
            if(existing){
            existing.quantity += 1;
            }
            else{
                const card = {
                title: action.payload.title,
                featuredImage: action.payload.featuredImage,
                price: action.payload.price,
                bookId: action.payload.bookId,
                userId: action.payload.userId,
                author: action.payload.author,
                quantity: action.payload.quantity || 1 ,
                id:action.payload.id || null,
            }
            state.cards.push(card)
            }
        },

        deleteCard: (state, action) => {
            const existing = state.cards.find(card => card.bookId === action.payload.bookId && card.userId===action.payload.userId);
            if(existing){
                if(existing.quantity <= 1){
                    state.cards = state.cards.filter(card => !(card.bookId === action.payload.bookId && card.userId===action.payload.userId));
                }
                else{
                    existing.quantity -= 1;
                }
            }
        }
    }
})

export const { addCard , deleteCard } = cardSlice.actions;
export default cardSlice.reducer;