import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Detail() {
  const { id } = useParams();
  
  const recipes = useSelector((state) => state.meals.meals);
  
  const recipe = recipes.find((r) => r.id === id);
  console.log(recipe);
  
 useEffect(() => {
    window.scrollTo({
      top: 800,
      behavior: 'smooth'
    });
  }, []);
  return (
    <div className='min-h-screen w-full bg-stone-200'>
      {/* Header Image Section */}
      <div className='w-full pt-15 flex justify-center items-center'>
        <img className='w-full  h-auto' src="/images/detail-header.png" alt="" />
      </div>
      
      {/* Main Content Section */}
      <div className='mt-12 relative pb-96'>
        {/* Background Bar */}
        <div className='w-full h-[240px] bg-stone-400' />
        
        {/* Content Grid */}
        <div className='sm:grid sm:grid-cols-12 gap-x-4 flex flex-col absolute top-[60px] left-0 w-full px-10'>
          {/* Image Column */}
          <div className='col-span-4'>
            <img 
              className='w-full h-[520px] object-cover rounded-2xl shadow-lg' 
              src={recipe ? recipe.thumbnail : "/thumbnail/banner.png"}
              alt="Zesty Lemon Quinoa" 
            />
          </div>
          
          {/* Content Column */}
          <div className='sm:col-span-8 sm:pl-10  '>
            <h1 className='text-2xl font-semibold text-red-500'>{recipe.category?recipe.category:"Unique"}</h1>
            <h2 className='text-4xl font-bold mt-2 text-gray-900'>{recipe.name?recipe.name:"No Name Found"}</h2>
            <h3 className='mt-30 font-semibold text-2xl text-gray-900'>Ingredients</h3>
            <ul className='list-disc gap-y-3   list-inside mt-3 space-y-1 grid grid-cols-2 font-semibold text-gray-800'>
              {
                recipe && recipe.ingredients && recipe.measures ? recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient} - {recipe.measures[index]}
                  </li>
                )) : <p>No ingredients found.</p>
              }
            </ul>
          </div>
        </div>
        {/* Instructions Section */}
        <div className='w-full px-10 sm:mt-96 mt-[800px]'>
          <h3 className='font-semibold text-2xl text-gray-900'>Instructions</h3>
          <p className='mt-3 text-gray-800 leading-relaxed whitespace-pre-line'>
            {
              recipe.instructions ? recipe.instructions : "No instructions found."
            }
          </p>
          </div>
          <div className='flex flex-wrap gap-2  px-10'>
          <h3 className='font-semibold text-2xl text-gray-900 mt-10 '>
          {
            recipe.tag&&recipe.tag.length>0 ? recipe.tag.map((tag, index) => (
              <span 
                key={index}
                className="inline-block bg-red-200 text-red-800 text-sm px-3 py-1 rounded-full mr-2 mb-2"
              >
                {tag}
              </span>
            )) : " No Tags Found"
          }
          </h3>
          </div>
        {/* YouTube Video Section */}
        <div className='w-full px-10 mt-10'>
          <h3 className='font-semibold text-2xl text-gray-900 mb-4'>Recipe Video</h3>
          <div className='w-full aspect-video'>
            <iframe 
              className='w-full h-full rounded-2xl shadow-lg'
              src={recipe.youtube ? recipe.youtube.replace("watch?v=", "embed/") : "https://www.youtube.com/embed/dQw4w9WgXcQ"} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
          </div>
          {/* More Recipe */}
          <div className='w-full px-10 mt-10 mb-20'>
          <h3 className='font-semibold text-2xl text-gray-900 mb-4 text-center'>More Recipes</h3>
          
          </div>
      </div>
    </div>
  )
}

export default Detail