import React, { useEffect } from 'react'
import { PostCard } from '../components/index'
import { useParams } from 'react-router-dom'
import {groupBooksByCategory} from '../components/Categories/Categories'
import { useSelector } from 'react-redux'

function AllPost() {

    const {category} = useParams()
    const storeBooks = useSelector(state=>state.books.books)
    const groupbooks = groupBooksByCategory(storeBooks)
    
    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})
    },[])
    


return (
    <>
    <div className='flex text-center text-black font-bold justify-center p-6 text-4xl w-full h-20 bg-stone-400 mt-15'>{category}</div>
    <div className="grid grid-cols-[250px_1fr] gap-6 p-6 ">
        <div className="dropdown dropdown-hover ">
            <div tabIndex={0}  className="btn m-7 bg-stone-400 border-none ">Genre</div>
            <ul tabIndex={0} className="dropdown-content menu text-black rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
        

      {/* Content */}
        <main className="grid grid-cols-3 gap-6">
            {
                groupbooks[category].map((book)=>(
                    <div key={book.id}>
                        <PostCard book={book}/>
                    </div>
                ))
            }
        </main>
    </div>
    </>
)
}

export default AllPost
