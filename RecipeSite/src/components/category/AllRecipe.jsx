import React, { use, useEffect } from 'react'
import {Slide,MealCard,Selects} from '../index'
import { useSelector } from 'react-redux'
import { useParams ,useNavigate } from 'react-router-dom'
import {groupMealsByCategory} from '../mealData/Convert'

function AllRecipe() {
const {meals} = useSelector(state=>state.meals)
const nav = useNavigate();
const {category} = useParams();
const decodedCategory = decodeURIComponent(category);
const filteredMeals = meals.filter(meal => meal.category === String(category).trim());
const mealData = groupMealsByCategory(meals);

useEffect(() => {
    window.scrollTo({ top: 360, behavior: 'smooth' }); 
  }, [category,decodedCategory]);

  return (
    <div>
    <div className='relative mt-16'>
    <img className='w-full h-90' src="/thumbnail/banner.png" alt="" />
    <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <p className='text-sm uppercase tracking-wider mb-2 font-semibold'>DELICIOUS RECIPES AWAIT</p>
        <h1 className='text-black text-5xl font-semibold'>{category}</h1>
        <p className='text-center text-gray-700 mt-4 max-w-3xl px-4 font-semibold'>
            Discover an array of delicious recipes for every occasion. From quick snacks to gourmet meals, explore endless inspiration, expert tips, and creative ideas for your kitchen adventures!
        </p>
      </div>
    </div>
    <div className='mt-8'>
      
        <Slide cat={category}/>
    </div>
    <div className='grid sm:grid-cols-12 gap-2'>
      <div className='sm:col-span-2 mt-16 ml-4'>
        <div className='text-center sm:mr-10 mb-4 font-bold text-red-500'>Select Nation</div>
        <div className='flex justify-center'><Selects cat={decodedCategory}/></div>
      </div>
          <div className='my-16 flex flex-wrap justify-center sm:col-span-10 gap-4'>
            {
              filteredMeals.length > 0 ? (
                filteredMeals.map((meal) => (
                  <MealCard key={meal.id} meal={meal} onClick={()=>nav(`/detail/${meal.id}`)} />
                ))
              ) : (
                mealData[decodedCategory] ? (
                  mealData[decodedCategory].map((meal) => (
                    <MealCard key={meal.id} meal={meal} onClick={()=>nav(`/detail/${meal.id}`)} />
                  ))
                ) : (
                  <p className='text-gray-600'>No meals found for this category.</p>
                )
              )
            }
        </div>
      </div>
    </div>
  )
}

export default AllRecipe