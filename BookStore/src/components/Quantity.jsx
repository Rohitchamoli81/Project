import React, { useState } from 'react';
import { InputNumber } from 'antd';
import cardService from '@/appwrite/card';
import { useDispatch } from 'react-redux';
import { addCard as addBookToCard , deleteCard as deleteBookFromCard } from '@/store/cardSlice';

const App = ({book}) => {
const [value, setValue] = useState(book.quantity);
const userId = book.userId
const id = book.bookId

const dispatch = useDispatch();

const onStep = (newValue, info) => {
setValue(newValue);

if (info.type === 'up') {
    const author = book.author?book.author:"Unknown Author"
    const price = String(book.price?book.price:0)
    
    const addBook = async()=>{
        try {
            const result = await cardService.addbook({
            bookId:id,
            userId,
            bookData:{
                title:book.title,
                author,
                price,
                featuredImage:book.featuredImage,
            }
            })
            dispatch(addBookToCard({
                title:book.title,
                featuredImage:book.featuredImage,
                price,
                bookId:id,
                userId,
                author,
                id:result.$id,
            }))
            return result
        } catch (error) {
            console.log('Error while adding book to card',error);
            throw error
        }
    }
    addBook();
} else if (info.type === 'down') {
const deleteBook = async()=>{
    try {
        await cardService.decreaseBookQuantity(book.id);
        dispatch(deleteBookFromCard({
            bookId:id,
            userId,
        }))
    } catch (error) {
        console.log('Error while deleting book from card',error);
        throw error
    }
};
deleteBook();
}
};

return (
<InputNumber 
    min={1} 
    max={10} 
    value={value}
    onStep={onStep}
/>
);
};

export default App;