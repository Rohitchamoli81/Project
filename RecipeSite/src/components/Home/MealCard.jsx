import React, { useState } from 'react'
import { Heart, Bookmark } from 'lucide-react'

function MealCard({ 
meal,
width = 'w-96',
height = 'h-auto',
...props
}) {
    const [liked, setLiked] = useState(false)   
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <div className={`card bg-[rgb(242, 237, 228)] ${width} border-0 cursor-pointer`} {...props}> 
            <figure className="relative">
                <img className='w-full rounded-sm h-auto'
                    src={meal.thumbnail}
                    loading='lazy'
                    alt={meal.name} />
                
                <div className="absolute top-3 right-3 flex flex-col gap-3">
                    <button 
                        onClick={() => setLiked(!liked)}
                        className="btn btn-circle btn-sm bg-white border-0  shadow-md hover:bg-red-500"
                    >
                        <Heart 
                            size={20} 
                            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-white '} 
                        />
                    </button>
                    <button 
                        onClick={() => setBookmarked(!bookmarked)}
                        className="btn btn-circle btn-sm bg-white border-0 hover:bg-blue-500 shadow-md"
                    >
                        <Bookmark 
                            size={20} 
                            className={bookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-600 hover:text-white'} 
                        />
                    </button>
                </div>
                {/* 🆕🆕🆕 END NEW SECTION */}
            </figure>
            <div className="card-body" >
                <h2 className="card-title text-red-500 font-bold">
                    {meal.category}
                </h2>
                <p className='font-semibold text-3xl'>{meal.name}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline font-semibold">{meal.area}</div>
                </div>
            </div>
        </div>
    )
}

export default MealCard