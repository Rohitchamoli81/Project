import React from 'react'

function AddRecipe() {
return (
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
    </div>
)
}

export default AddRecipe
