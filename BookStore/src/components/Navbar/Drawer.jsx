import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import Card from './Card'
import { useSelector } from 'react-redux'
const App = () => {

  const userData = useSelector(state=>state.auth.userData)
  const cardData = useSelector(state=>state.cards.cards)

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  if (!userData) {
    return (
      <Button type="text" disabled className='p-0'>
        <img className='w-10 rounded-full' src="/logo/card.png" alt="logo" />
      </Button>
    );
  }
  

  const userId = userData.$id
  const Books = cardData.filter((book)=>(
  book.userId===userId
  ))




  

  return (
    <>
      <Button type="text" onClick={showDrawer} className='p-0' >
        <img className='w-10 rounded-full' src="/logo/card.png" alt="logo" />
      </Button>
      <Drawer className='!bg-stone-200'
        title="Basic Drawer"
        closable={{ 'aria-label': 'Close Button' }}
        onClose={onClose}
        open={open}
      >
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        {
          Books.length>0?Books.map((book)=>(
            <div className='mb-3' key={book.bookId}>
              <Card book={book}/>
            </div>
          )):"" 
        }
      </Drawer>
    </>
  );
};
export default App;