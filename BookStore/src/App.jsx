import React, { useState ,useEffect } from 'react'
import {Nav,Footer} from './components/index'
import {Api} from './components/CustomApi/Api'
import { useDispatch,useSelector} from 'react-redux'
import { addBook } from './store/bookSlice'
import authservice from './appwrite/auth'
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/authSlice'
import cardService from './appwrite/card'
import { addCard } from './store/cardSlice'


function App() {
  const dispatch = useDispatch()
  const [loading , setLoading] = useState(true)
  const userData = useSelector(state=>state.auth.userData)
  const userId = userData?userData.$id:null
  console.log(userId);
  const cardData = useSelector(state=>state.cards.cards)
  

useEffect(() => {
  const loadBooks = async () => {
    try {
      
      const pagePromises = Array.from({ length: 10 }, (_, i) => Api(i + 1));
      const pagesResults = await Promise.all(pagePromises);

      
      
      pagesResults.flat().forEach(book => {
        if (book) {
          dispatch(addBook({
            title: book.volumeInfo?.title || 'Untitled',
            subtitle: book.volumeInfo?.subtitle || '',
            featuredImage: book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.smallThumbnail || '',
            description: book.volumeInfo?.description || '',
            retail: book.saleInfo?.listPrice?.amount || 0,
            price: book.saleInfo?.retailPrice?.amount || 0,
            author: book.volumeInfo?.authors[0],
            category: book.volumeInfo?.categories || 'Uncategorized',
            id:book.id,
          }));
        }
      });
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

   authservice.getCurrentUser().then((user) => {
    if (user) {
      dispatch(login(user))
    } else {
      dispatch(logout())
    }
  })
   .catch((error) => {
    console.log('No user logged in', error);
  });

  loadBooks();

}, [dispatch]);


useEffect(()=>{
  if(userData){
  cardService.getBook(userId).then((res)=>{
  if(res&&res.documents.length>0){
    console.log(res);
    res.documents.forEach((book) => {
      dispatch(addCard({
        title: book.title,
        featuredImage: book.featuredImage,
        price: book.price,
        bookId: book.bookId,
        userId: book.userId,
        author: book.author,
        quantity: book.quantity,
        id: book.$id,
      }))
    })
  }
}).catch((err)=>{
  console.log(err);
})
}

},[userData])




  useEffect(()=>{
   if(!loading){
     const loadBooks = async()=>{
      try {
      const pagePromise = Array.from({length:11},(_,i)=>Api(i+11))
      const pageResult = await Promise.all(pagePromise)

      pageResult.flat().forEach((book)=>{
        if(book){
          dispatch(addBook({
            title: book.volumeInfo?.title || 'Untitled',
            subtitle: book.volumeInfo?.subtitle || '',
            featuredImage: book.volumeInfo?.imageLinks?.thumbnail || book.volumeInfo?.imageLinks?.smallThumbnail || '',
            description: book.volumeInfo?.description || '',
            retail: book.saleInfo?.listPrice?.amount || 0,
            price: book.saleInfo?.retailPrice?.amount || 0,
            author: book.volumeInfo?.authors?.[0]||'Unknown',
            category: book.volumeInfo?.categories || 'Uncategorized',
            id:book.id,
          }))
        }
      })
      
    } catch (error) {
      console.log('Error loading remaining api',error);
      
    }
    }
    loadBooks()
  }
  },[loading,dispatch])







  return loading?"loading...": <>
    <Nav/>
    <Outlet/>
    <Footer/>
    </>
}

export default App
