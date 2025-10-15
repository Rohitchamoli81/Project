import React from 'react'
import { ChefHat, Monitor, Trophy } from 'lucide-react';
import {Slide,CardBtn,MealCard,Header} from '../index'
import { useSelector } from 'react-redux';
import  {groupMealsByCategory} from '../mealData/Convert'
import { useNavigate } from 'react-router-dom';
function Home() {

    const [category , setCategory] = React.useState('East Asian');
    const navigate = useNavigate();


    const meals  =["East Asian","South Asian","Western European","Northern European","Americas","Africa & Middle East"]

    const recipes = useSelector((state)=>state.meals.meals);
    

    const mealData = groupMealsByCategory(recipes);


  return (
    <div className='mt-16'>
    <Header/>
    <div className='py-12 px-8'>
        <div className='text-black flex justify-center gap-8 px-8'>
            
            {/* Unique Meats */}
            <div className='flex items-center gap-4 max-w-sm'>
                <div className='bg-orange-100 rounded-full p-4 flex-shrink-0 border-2 border-orange-300 hover:border-orange-500 hover:shadow-lg transition-all duration-300'>
                    <ChefHat className='w-8 h-8 text-orange-600'/>
                </div>
                <div>
                    <h3 className='font-bold text-lg mb-2'>Unique Meats</h3>
                    <p className='text-gray-600 text-sm hidden sm:block'>
                        Explore unique meat recipes that bring bold flavors and 
                        creative ideas to your table!
                    </p>
                </div>
            </div>

            {/* Real Content */}
            <div className='flex items-center gap-4 max-w-sm'>
                <div className='bg-blue-100 rounded-full p-4 flex-shrink-0 border-2 border-blue-300 hover:border-blue-500 hover:shadow-lg transition-all duration-300'>
                    <Monitor className='w-8 h-8 text-blue-600'/>
                </div>
                <div>
                    <h3 className='font-bold text-lg mb-2'>Real Content</h3>
                    <p className='text-gray-600 text-sm hidden sm:block'>
                        Experience authentic recipes, tips, and stories crafted 
                        to inspire your cooking journey!
                    </p>
                </div>
            </div>

            {/* Quality Receipts */}
            <div className='flex items-center gap-4 max-w-sm'>
                <div className='bg-red-100 rounded-full p-4  flex-shrink-0 border-2 border-red-300 hover:border-red-500 hover:shadow-lg transition-all duration-300'>
                    <Trophy className='w-8 h-8 text-red-600 '/>
                </div>
                <div>
                    <h3 className='font-bold text-lg mb-2'>Quality Receipts</h3>
                    <p className='text-gray-600 text-sm hidden sm:block'>
                        Discover high-quality recipes designed to deliver 
                        delicious flavors and perfect results!
                    </p>
                </div>
            </div>
        </div>
        <hr className='border-2 my-7 ' />
            <div className='mt-10 flex flex-wrap gap-6'>
                <Slide/>
            </div>
            <h1 className='text-center font-bold text-3xl'>New Recipes</h1>
            <p className='text-center text-gray-600 mb-8 mt-2 '>Discover the latest additions to our recipe collection, featuring fresh ideas and exciting flavors!</p>
            <div className='mt-10 flex flex-wrap gap-6'>
                <CardBtn
                />
            </div>
            <div className='flex justify-center gap-7 mt-12 flex-wrap'>
                {
                meals.map((meal)=>(
                    <CardBtn
                    key={meal}
                    children={meal}
                    Submit={()=>setCategory(meal)}
                    className={`p-4  font-semibold rounded-4xl w-45 hover:bg-red-500 hover:text-white
                    ${category===meal?'bg-red-500 text-white':'text-black bg-stone-200'}`}
                    />
                ))
                }
            </div>
            <div className='mt-10 flex flex-wrap gap-6 justify-center'>
                {
                    mealData[category] ? mealData[category].slice(0,12).map((meal)=>(
                        <MealCard
                        key={meal.id}
                        meal={meal}
                        onClick={()=>navigate(`/detail/${meal.id}`)}
                        />
                    )) : <p>No meals available in this category.</p>
                }
            </div>
            <div className='= flex justify-center'>
                <CardBtn 
                children={"Explore All Recipes"}
                onClick={()=>navigate(`/recipes/${String(category).trim()}`)}
                className={'mt-6 mb-4 px-6 py-3 w-50 bg-stone-300 text-black rounded-sm hover:bg-red-600 transition-colors duration-300 block mx-auto'}
                />
            </div>
    </div>
    </div>
  )
}

export default Home