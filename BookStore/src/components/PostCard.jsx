import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function PostCard({book}) {

    const navigate = useNavigate()

return (
    <div onClick={()=>navigate(`/book/${book.id}`)} className='h-auto w-[250px] bg-white p-10 mt-6 mr-3 rounded-sm text-black shadow-2xl cursor-pointer '>
        <div>
            <img className='mb-2 shadow-2xl rounded-sm' src={book.featuredImage?book.featuredImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsD0ig3Z-oWHbY6klvqxUnBXtkGhcjFlNDHw&s"} alt="Book Image" />
        </div>
        <div className='flex flex-col'>
            <span className='font-bold text-2xl truncate'>{book.title}</span>
            <span className='text-orange-400 truncate'> by {book.author}</span>
            <span><span className='text-gray-500 font-semibold line-through mr-2'>{book.price===book.retail?"":book.retail} </span> {book.price}</span>
            <span className='text-gray-500 font-semibold'>{book.price===0?"ebook":"paperback"}</span>
            
        </div>
    </div>
    
)
}

export default PostCard
