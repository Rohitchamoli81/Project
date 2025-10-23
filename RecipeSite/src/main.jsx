  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import {store} from './store/store'
  import { Provider } from 'react-redux'
  import { Home ,AllRecipe ,Meal ,Detail,Login,Signup,AddBlog,EditPost,DeletePost,AllBlog} from './pages/index'
  import { RouterProvider,createBrowserRouter } from 'react-router-dom'

  const router = createBrowserRouter([
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/recipes/:category',
          element:<AllRecipe/>
        },
        {
          path:'/meal/:category',
          element:<Meal/>
        },
        {
          path:'/detail/:id',
          element:<Detail/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },{
          path:'/add-blog',
          element:<AddBlog/>
        },{
          path:'/edit-post/:id',
          element:<EditPost/>
        },{
          path:'/allBlog',
          element:<AllBlog/>
        },
        {
          path:'/post/:id',
          element:<DeletePost/>
        }
      ]
    }
  ])

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
  )
