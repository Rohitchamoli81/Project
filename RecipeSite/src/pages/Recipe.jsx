import React from 'react'

function Recipe() {
  return (
    <div>
        <div className='relative mt-16'>
            <img className='w-full h-90' src="/thumbnail/banner.png" alt="" />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <p className='text-sm uppercase tracking-wider mb-2 font-semibold'>DELICIOUS RECIPES AWAIT</p>
                <h1 className='text-black text-5xl font-semibold'>All Recipes</h1>
                <p className='text-center text-gray-700 mt-4 max-w-3xl px-4 font-semibold'>
                    Discover an array of delicious recipes for every occasion. From quick snacks to gourmet meals, explore endless inspiration, expert tips, and creative ideas for your kitchen adventures!
                </p>
            </div>
        </div>
    </div>
  )
}

export default Recipe
