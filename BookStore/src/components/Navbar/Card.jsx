import React from 'react'
import { useNavigate } from 'react-router-dom'
import Quanity from '../Quantity'

function Card({book}) {

  const navigate = useNavigate()
  

  return (
    <div className="card card-side bg-stone-300 shadow-sm flex justify-center" onClick={()=>navigate(`/book/${book.bookId}`)}>
  
    <div className='w-auto m-5'>
        <img className='rounded-sm'
      src={book.featuredImage}
      alt="book" />
    </div>
  
  <div className="card-body text-center  justify-center flex">
    <h2 className="card-title font-bold">{book.title}</h2>
    <h3 className=''>{book.author?`by ${book.author}`:""}</h3>
    <h3 className=''>{book.price>0?`Rs ${book.price}`:'eBook'}</h3>
    <div className='justify-baseline'>
      <Quanity book={book}/>
    </div>
    <div className="card-actions justify-end">
    </div>
  </div>
</div>
  )
}

export default Card
