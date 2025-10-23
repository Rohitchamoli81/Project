import React from 'react'
import { useState ,useEffect } from 'react'
import { Heart, Bookmark } from 'lucide-react'
import { fileService } from '@/appwrite/file'

function BlogCard({ 
post,
width = 'w-96',
height = 'h-auto',
...props
}) {
    const [liked, setLiked] = useState(false)   
    const [bookmarked, setBookmarked] = useState(false)
    const [imageUrl, setImageUrl] = useState('/images/default.png')

    useEffect(() => {
        if (post.featuredImage) {
            fileService.getFilePreview(post.featuredImage)
                .then(url => setImageUrl(url))
                .catch(err => {
                    console.log("Image preview error:", err)
                    setImageUrl('/images/default.png')
                })
        }
    }, [post.featuredImage])

    return (
        <div className={`card bg-[rgb(242, 237, 228)] ${width} border-0 cursor-pointer`} {...props}> 
            <figure className="relative">
                <img className='w-80 rounded-sm h-80 '
                    src={post.featuredImage?imageUrl:'/images/default.png'}
                    loading='lazy'
                    alt={post.title} />
                
                <div className="absolute top-3 right-9 flex flex-col gap-3">
                    <button 
                        onClick={() => setLiked(!liked)}
                        className="btn btn-circle btn-sm bg-white border-0  shadow-md hover:bg-red-500 "
                    >
                        <Heart 
                            size={20} 
                            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-white  '} 
                        />
                    </button>
                    <button 
                        onClick={() => setBookmarked(!bookmarked)}
                        className="btn btn-circle btn-sm bg-white border-0 hover:bg-blue-500 shadow-md "
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
                    {post.category?post.category: 'Recipe'}
                </h2>
                <p className='font-semibold text-3xl'>{post.title}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline font-semibold">{post.area}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
