import React, { useState ,useEffect } from 'react'
import { Nav ,Footer} from './components/index'
import './App.css'
import { Outlet } from 'react-router-dom'
import { setUser ,removeUser,setLoading } from './store/authSlice'
import { authService } from './appwrite/auth'
import { postService } from './appwrite/post'
import {Api} from './components/mealData/Api'
import { useDispatch,useSelector} from 'react-redux'
import { fetchMeals ,setLocalLoading} from './store/mealSlice'


function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state=>state.meals.loading)
  const authloading = useSelector(state=>state.auth.loading)

  useEffect(()=>{
    const loadMeals  = async()=>{
      try {
        const pagePromise = Array.from({length:10},(_,i)=>Api(i+1))
        const pagesResults = await Promise.all(pagePromise)
        const allMeals = pagesResults.flat()
        
        allMeals.forEach(meal=>{
          if(meal){
            const ingredientList = []
            const measureList = []
            for(let i=1;i<=20;i++){
              const ingredient = meal[`strIngredient${i}`]
              const measure = meal[`strMeasure${i}`]
              if(ingredient && ingredient.trim() !==''){
                ingredientList.push(ingredient)
              }
              if(measure && measure.trim() !==''){
                measureList.push(measure)
              }
            }

            dispatch(fetchMeals({
              id: meal.idMeal,
              name: meal.strMeal,
              category: meal.strCategory,
              area: meal.strArea,
              instructions: meal.strInstructions,
              thumbnail: meal.strMealThumb,
              tags: meal.strTags,
              youtube: meal.strYoutube,
              ingredients: ingredientList,
              measures: measureList,
              tag: meal.strTags ? meal.strTags.split(',') : []
            }) )
          }
        })
      } catch (error) {
        console.log("Error in loading meals",error);
        throw error;
      }
      finally{
        dispatch(setLocalLoading(false))
      }
    }
    loadMeals()
  },[dispatch])

  useEffect(()=>{
    authService.getCurrentUser()
    .then((user)=>{
      if(user){
        dispatch(setUser(user))
      }
      else{
        dispatch(removeUser())
      }
    })
    .catch((error)=>{
      console.log("No user logged in",error);
    })
    .finally(()=>{
      dispatch(setLoading(false))
    })
  },[dispatch])

  return (
    <>
    {loading ||authloading ? <span className="loading loading-spinner loading-xl flex justify-center items-center "></span> :
    <div className="App">
      <Nav/>
      <Outlet/>
      <Footer/>
    </div>
    }
    </>
  )
}

export default App
