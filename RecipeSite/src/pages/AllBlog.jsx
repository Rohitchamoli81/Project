import React from 'react'
import { useSelector } from 'react-redux'
import { BlogCard } from '../components/index'
import { useNavigate } from 'react-router-dom'

function AllBlog() {
    const posts = useSelector(state=>state.posts.posts)
    const loading = useSelector(state=>state.posts.loading)
    const navigat = useNavigate()
    console.log(posts);
    
return loading ?(
    <span className="loading loading-spinner loading-xl flex justify-center items-center "></span>
):(
    <div>
        <div className='relative mt-16'>
            <img className='w-full h-90' src="/thumbnail/banner.png" alt="" />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className='text-black text-5xl font-semibold'>All Blog</h1>
                <p className='text-center text-gray-700 mt-4 max-w-3xl px-4 font-semibold'>
                Discover tips, trends, and stories to enhance your culinary journey. From expert advice to creative ideas, explore everything food enthusiasts need to stay inspired!
                </p>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {
                posts.map((post)=>(
                    <BlogCard  key={post.id} post={post}
                    onClick={()=> navigat(`/post/${post.id}`)}
                    />
                ))
            }
        </div>
    </div>
)
}

export default AllBlog
