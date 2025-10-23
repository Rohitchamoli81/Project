import React, { useState ,useEffect, use } from 'react'
import { Nav ,Footer} from './components/index'
import './App.css'
import { Outlet } from 'react-router-dom'
import { setUser ,removeUser,setLoading } from './store/authSlice'
import { authService } from './appwrite/auth'
import {Api} from './components/mealData/Api'
import { useDispatch,useSelector} from 'react-redux'
import { fetchMeals ,setLocalLoading ,setRemainingLoading} from './store/mealSlice'
import { postService } from './appwrite/post'
import {addPost,setPostError,setPostLoading} from './store/postSlice'


function App() {
  const dispatch = useDispatch()
  const meals = useSelector(state=>state.meals.meals)
  const loading = useSelector(state=>state.meals.loading)
  const remainingloading = useSelector(state=>state.meals.remainingloading)
  const authloading = useSelector(state=>state.auth.loading)
  const PostLoading = useSelector(state=>state.posts.loading)

  useEffect(()=>{
    if(loading&&remainingloading){
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
    }
  },[dispatch])

  useEffect(()=>{
    if(!loading&&remainingloading){
      setTimeout(()=>{
      const loadmeal = async()=>{
      try {
          const pagePromise = Array.from({length:20},(_,i)=>Api(i+11))
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
                youtube: meal.strYoutube,
                ingredients: ingredientList,
                measures: measureList,
                tag: meal.strTags ? meal.strTags.split(',') : []
              }) )
            }
          })
          dispatch(setRemainingLoading(false))
      } catch (error) {
        console.log("Error in loading remaining meals",error);
        throw error;
      }
    }
    loadmeal()
    },3000)
    }
  },[dispatch,loading])


useEffect(() => {
    postService.getPosts()
        .then((posts) => {
            posts.documents.forEach(post => {
                dispatch(addPost({
                    id: post.$id,
                    title: post.title,
                    content: post.content,
                    area: post.area,
                    status: post.status,
                    userId: post.userId,
                    featuredImage: post.featuredImage,
                }))
            })
        })
        .catch((error) => {
            console.log("Post fetch error", error);
        })
        .finally(() => {
            dispatch(setPostLoading(false))
        })
}, [dispatch])



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
    {loading&&authloading&&PostLoading ? <span className="loading loading-spinner loading-xl flex justify-center items-center "></span> :
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
